// ? === without mongodb ===
// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// let productRouter = express.Router();

// // Resolve the correct file path
// let productPath = path.resolve(__dirname, "../data/products.json");
// let products = JSON.parse(fs.readFileSync(productPath, "utf-8"));

// productRouter.route("/").get((req, res) => {
//   res.send("<h1>This is Products page, do you want more details</h1>");
// });

// productRouter.route("/details").get((req, res) => {
//   res.render("pages/product", {
//     title: "Fake Shop Products",
//     products: products,
//   });

//   res.json([
//     {
//       status: "success",
//       message: "These are the details of products",
//       data: products,
//     },
//   ]);
// });

// module.exports = productRouter;

// ? === with mongodb ===
const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv").config();

const mongodb = require("mongodb").MongoClient;
const url = process.env.MONGO_URL || "mongodb://localhost:27017";

let productRouter = express.Router();

productRouter.route("/").get((req, res) => {
  res.send("<h1>This is Products page, do you want more details</h1>");
});

productRouter.route("/details").get((req, res) => {
  mongodb.connect(url, (err, dc) => {
    if (err) {
      res.status(500).send("Error while Connecting");
    } else {
      let dbObj = dc.db("fakestoreapi");
      dbObj
        .collection("products")
        .find()
        .toArray((err, results) => {
          if (err) {
            err.status(203).send("Error While fetching");
          } else {
            res.render("pages/product", {
              title: "Fake Shop Products",
              products: products,
            });
          }
        });
    }
  });
});

module.exports = productRouter;
