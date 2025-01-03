const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const Mongo = require("mongodb");
const url = "mongodb://localhost:27017/s";
const client = new MongoClient(url);
async function main() {
  await client.connect();
}
const collection = client.db("internfeb").collection("dashboard");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.port || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.send("Health OK");
});

// insert user
app.post("/addUser", async (req, res) => {
  await collection.insertOne(req.body);
  res.status(201).json({
    status: "Success",
    message: "Data Added",
    data: req.body,
  });
});

// get users
app.get("/users", async (req, res) => {
  console.log(req.query);

  let output = [];
  let query = {};
  if (req.query.city && req.query.role) {
    query = {
      city: req.query.city,
      role: req.query.role,
      isActive: true,
    };
  } else if (req.query.city) {
    query = {
      city: req.query.city,
      isActive: true,
    };
  } else if (req.query.role) {
    query = {
      role: req.query.role,
      isActive: true,
    };
  } else if (req.query.isActive) {
    query = {
      isActive: req.query.isActive == "true" ? true : false,
    };
  }

  console.log(query);
  const cursor = collection.find(query);
  for await (const data of cursor) {
    output.push(data);
  }
  cursor.closed;
  res.send(output);
});

// get particular user
app.get("/users/:id", async (req, res) => {
  let output = [];
  let query = { _id: new Mongo.ObjectId(req.params.id) };
  const cursor = collection.find(query);
  for await (const data of cursor) {
    output.push(data);
  }
  cursor.closed;
  res.send(output);
});

// update user
app.put("/updateuser/:id", async (req, res) => {
  console.log(req.body);
  await collection.updateOne(
    {
      _id: new Mongo.ObjectId(req.params.id),
    },
    {
      $set: {
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role,
        isActive: req.body.isActive,
      },
    }
  );

  res.status(201).json({
    status: "Success",
    message: "Record Updated",
    newdata: req.body,
  });
});

// delete user
app.delete("/deleteuser/:id", async (req, res) => {
  await collection.deleteOne({ _id: new Mongo.ObjectId(req.params.id) });
  res.status(204).json({
    status: "success",
    message: `Data deleted - , ${req.params.id}`,
  });
});

app.listen(port, () => {
  main();
  console.log("Server has started on the port", port);
});
