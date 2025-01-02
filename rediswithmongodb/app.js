import { createClient } from "redis";
import express from "express";
import Mongo, { Collection, MongoClient } from "mongodb";

let app = express();
const mClient = new MongoClient();
const rClient = createClient({ host: "localhost", port: 6379 });

// connecting redis
rClient.on("err", err => console.log(err));

// connecting mongo
async function main() {
  await mClient.connect();
}

app.get("/data", async (req, res) => {
  await rClient.connect();

  let uInput = req.query.color.trim();
  let result = await rClient.get(uInput);

  if (result) {
    const output = JSON.parse(result);
    res.send(output);
  } else {
    // as data is not in redis get from mongo
    const output = [];
    const cursor = Collection.find({ Color: uInput });
    for await (const data of cursor) {
      output.push(data);
    }
    await rClient.set(
      uInput,
      JSON.stringify({ source: "Redis Catch", output }),
      { EX: 10, NX: true }
    );

    rClient.closed;
    res.send({ source: "MongoDB", output });
  }
});

app.listen(8000, err => {
  console.log("server is running");
});
