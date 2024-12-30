// ! Express Routing:
// ? Example 1
/*
const express = require("express");
const dotenv = require("dotenv");

// configure the env file
dotenv.config();

const port = process.env.PORT || 8000;

// Create the Server
const app = express();

// routes
app.get("/", (req, res) => {
  res.send("<h1>This is Home Page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>This is About Page</h1>");
});

// Run the Server
app.listen(port, err => {
  if (err) throw err;
  console.log("Server has Started");
});
*/

// ? Example 2
// Here we are doing for category and product based routing and their details.
/*
const express = require("express");

// Create server
const app = express();

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

// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>This is Dashboard page, Please choose category / products</h1>"
  );
});

app.get("/category", (req, res) => {
  res.send("<h1>This is Category page, do you want more details</h1>");
});

app.get("/products", (req, res) => {
  res.send("<h1>This is Products page, do you want more details</h1>");
});

app.get("/category/details", (req, res) => {
  res.json([
    {
      status: "success",
      message: "These are the details of category",
      data: category,
    },
  ]);
});

app.get("/products/details", (req, res) => {
  res.json([
    {
      status: "success",
      message: "These are the details of products",
      data: products,
    },
  ]);
});

// run server
app.listen(8000, err => {
  if (err) throw err;

  console.log("Server has started");
});
*/

// ? Example 3:
// The above is correct. Let's use middleware to shorten the path address.
/*
const express = require("express");

// Create server
const app = express();

// specific routers
let categoryRouter = express.Router();
let productRouter = express.Router();

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

// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>This is Dashboard page, Please choose category / products</h1>"
  );
});

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

// middlewares
app.use("/category", categoryRouter);
app.use("/products", productRouter);

// run server
app.listen(8000, err => {
  if (err) throw err;

  console.log("Server has started");
});
*/

// ? Example 4:
// Lets store the in MVC pattern.

const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

const categoryRouter = require("./src/controllers/categoryRouter");
const productRouter = require("./src/controllers/productRouter");

// Create server
const app = express();

// default route
app.get("/", (req, res) => {
  //   res.send(
  //     "<h1>This is Dashboard page, Please choose category / products</h1>"
  //   );
  res.render("index", { title: "My EJS File", page: "Home" });
});

// static file path
app.use(express.static(__dirname + "/public"));
// html files path
app.set("views", "./src/views");
// view engine
app.set("view engine", "ejs");

// third part middleware
// app.use(morgan());
// app.use(morgan("dev"));
// app.use(morgan("common", { stream: fs.createWriteStream(".app.log") }));
// Reference: https://www.npmjs.com/package/morgan?activeTab=readme

// custom middlewares
app.use("/category", categoryRouter);
app.use("/products", productRouter);

// run server
app.listen(8000, err => {
  if (err) throw err;
  console.log("Server has started");
});
