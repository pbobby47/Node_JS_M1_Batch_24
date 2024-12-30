const express = require("express");

let productRouter = express.Router();

let products = [
  {
    product_name: "Rev",
    product_price: 282.81,
  },
  {
    product_name: "Ms",
    product_price: 63.0,
  },
  {
    product_name: "Ms",
    product_price: 475.34,
  },
  {
    product_name: "Dr",
    product_price: 271.43,
  },
  {
    product_name: "Mrs",
    product_price: 47.63,
  },
];

productRouter.route("/").get((req, res) => {
  res.send("<h1>This is Products page, do you want more details</h1>");
});

productRouter.route("/details").get((req, res) => {
  res.json([
    {
      status: "success",
      message: "These are the details of products",
      data: products,
    },
  ]);
});

module.exports = productRouter;
