const express = require("express");
const request = require("request");

let app = express();

app.use(express.static(__dirname + "/public"));
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.get("/weather", (req, res) => {
  let city = req.query.city ? req.query.city : "Delhi";
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=44be59727524bb0c620da922401fe88a`;
  // calling api
  request(url, (err, response, body) => {
    if (err) throw err;
    //res.send(response.body)
    // const output = JSON.parse(response.body);
    // res.render("index", { title: "Weather App", result: output });
    res.send(response.body);
  });
});

app.listen(8000, err => {
  if (err) throw err;
  console.log(`Running on port ${8000}`);
});
