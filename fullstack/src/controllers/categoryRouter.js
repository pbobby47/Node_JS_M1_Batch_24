const express = require("express");
const fs = require("fs");
const path = require("path");

let categoryRouter = express.Router();

// Resolve the correct file path
let categoryPath = path.resolve(__dirname, "../data/category.json");
let category = JSON.parse(fs.readFileSync(categoryPath, "utf-8"));

categoryRouter.route("/").get((req, res) => {
  res.send("<h1>This is Category page, do you want more details</h1>");
});

categoryRouter.route("/details").get((req, res) => {
  res.json([
    {
      status: "success",
      message: "These are the details of category",
      data: category,
    },
  ]);
});

module.exports = categoryRouter;
