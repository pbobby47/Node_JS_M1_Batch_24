let express = require("express");
let app = express();
let mongo = require("mongodb");
let dotenv = require("dotenv");
dotenv.config();
let bodyParser = require("body-parser");
let cors = require("cors");
let port = process.env.PORT;
let db;
let authKey = process.env.AuthKey;
let {
  getData,
  getDatawithsortlimit,
  postData,
  dbconnect,
  updateData,
  deleteData,
} = require("./contoller/dbController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function auth(key) {
  if (key == authKey) {
    return true;
  } else {
    return false;
  }
}

// get heart beat
app.get("/", (req, res) => {
  res.status(200).send("Health ok");
});

//List of city
app.get("/location", (req, res) => {
  let key = req.header("x-basic-token");
  if (auth(key)) {
    db.collection("location")
      .find()
      .toArray((err, data) => {
        if (err) throw err;
        res.status(200).send(data);
      });
  } else {
    res.status(401).send("Not Authenticated call");
  }
});

//List of restaurants
app.get("/restaurants", async (req, res) => {
  let query = {};
  let stateId = Number(req.query.stateId);
  let mealId = Number(req.query.mealId);
  if (stateId && mealId) {
    query = {
      state_id: stateId,
      "mealTypes.mealtype_id": mealId,
    };
  } else if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  } else {
    query = {};
  }
  let collection = "restaurants";
  let output = await getData(db, collection, query);
  res.send(output);
  // db.collection('restaurants').find(query).toArray((err,data) => {
  //     res.status(200).send(data)
  // })
});

//list of meals
app.get("/meals", async (req, res) => {
  let query = {};
  let collection = "mealType";
  let output = await getData(collection, query);
  res.send(output);
});

//filters
app.get("/filter/:mealId", async (req, res) => {
  let query = {};
  let sort = { cost: 1 };
  let skip = 0;
  let limit = 100000000;
  let collection = "restaurants";
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let hcost = Number(req.query.hcost);
  let lcost = Number(req.query.lcost);

  if (req.query.skip && req.query.limit) {
    skip = Number(req.query.skip);
    limit = Number(req.query.limit);
  }

  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }

  if (cuisineId && hcost && lcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  } else if (hcost && lcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }

  let output = await getDatawithsortlimit(
    db,
    collection,
    query,
    sort,
    skip,
    limit
  );
  res.send(output);
});

//details
app.get("/details/:id", async (req, res) => {
  let _id = mongo.ObjectId(req.params.id);
  let query = { _id: _id };
  let collection = "restaurants";
  let output = await getData(collection, query);
  res.send(output);
});

//menu wrt to restaurants
app.get("/menu/:id", async (req, res) => {
  let id = Number(req.params.id);
  let query = { restaurant_id: id };
  let collection = "menu";
  let output = await getData(collection, query);
  res.send(output);
});

//placeOrder
app.post("/placeOrder", async (req, res) => {
  let data = req.body;
  let collection = "orders";
  let response = await postData(collection, data);
  res.send(response);
});

//menu details {"id":[4,6,12]}
app.post("/menuDetails", async (req, res) => {
  if (Array.isArray(req.body.id)) {
    let query = { menu_id: { $in: req.body.id } };
    let collection = "menu";
    let output = await getData(collection, query);
    res.send(output);
  } else {
    res.send('Plese pass data as array like {"id":[4,6,12]}');
  }
});

//updateOrder
app.put("/updateOrder", async (req, res) => {
  let collection = "orders";
  let condition = { _id: mongo.ObjectId(req.body._id) };
  let data = {
    $set: {
      status: req.body.status,
    },
  };
  let response = await updateData(collection, condition, data);
  res.send(response);
});

//order
app.get("/orders", async (req, res) => {
  let query = {};
  if (req.query.email) {
    query = { email: req.query.email };
  }
  let collection = "orders";
  let output = await getData(collection, query);
  res.send(output);
});

//delete order
app.delete("/deleteOrder", async (req, res) => {
  let collection = "orders";
  let query = { _id: mongo.ObjectId(req.body._id) };
  let rowCount = await getData(collection, query);
  console.log(">>>rowCount", rowCount);
  if (rowCount.length > 0) {
    let response = await deleteData(collection, query);
    res.send(response);
  } else {
    res.send("No Order Found");
  }
});

app.listen(port, () => {
  dbconnect();
  console.log(`Running on port ${port}`);
});
