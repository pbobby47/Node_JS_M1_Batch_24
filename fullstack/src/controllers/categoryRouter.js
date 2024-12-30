const express = require("express");

let categoryRouter = express.Router();

let category = [
  {
    product_name: "Rev",
    product_price: 282.81,
    product_category: "home goods",
    product_brand: "Yozio",
    product_stock_quantity: 144,
    product_rating: 4,
  },
  {
    product_name: "Ms",
    product_price: 63.0,
    product_category: "clothing",
    product_brand: "Centimia",
    product_stock_quantity: 715,
    product_rating: 2,
  },
  {
    product_name: "Ms",
    product_price: 475.34,
    product_category: "beauty",
    product_brand: "Zooxo",
    product_stock_quantity: 323,
    product_rating: 2,
  },
  {
    product_name: "Dr",
    product_price: 271.43,
    product_category: "electronics",
    product_brand: "Flashdog",
    product_stock_quantity: 944,
    product_rating: 5,
  },
  {
    product_name: "Mrs",
    product_price: 47.63,
    product_category: "home goods",
    product_brand: "Quatz",
    product_stock_quantity: 140,
    product_rating: 2,
  },
];

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
