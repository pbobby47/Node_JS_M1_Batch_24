const express = require("express");
const app = express();

const mongo = require("mongo");
const MongoClient = mongo.MongoClient;

const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.mongoUrl;
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;

let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// get heart beat
app.get("/", (req, res) => {
  res.status(200).send("Health OK");
});

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) console.log("Error While Connecting to DB");

  db = client.db("Intern Feb");
  app.listen(port, () => {
    console.log(`Running on Port ${port}`);
  });
});
