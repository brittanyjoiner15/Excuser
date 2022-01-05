const express = require("express");
var excuses = require('./Excuses');
const path = require("path");
const excusesRepository = require("./excuseRepository");
const app = express();
const port = process.env.PORT || 3000;

// const mongo = require("mongodb").MongoClient;
// const url = "mongodb+srv://onlykingKD:NHW9D6MV@cluster0.gbs2o.mongodb.net/test?authSource=admin&replicaSet=atlas-l4bvx5-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
// const dbName = "myNewDB";

// mongo.connect(url, (err, client) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);

//   const collection = db.collection("myNewCollection");
//   excuses.map(excuse => {
//     collection.insertOne(excuse);
//   });
// });

app.all("*", function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/v1", function (req, res) {
  res.send("<h1>This is ithe initial verison...</h1>");
});

// returns the excuse having the specific id
app.get("/v1/excuse/id/:num(\\d+)?", function (req, res) {
  res.send(excusesRepository.getByID(req.params.num));
});

// returns n random excuses
app.get("/v1/excuse/:num(\\d+)?", function (req, res, next) {
  res.send(excusesRepository.getRandom(req.params.num || 1));
});

// returns excuse based on specific category
app.get("/v1/excuse/:category", function (req, res, next) {
  res.send(excusesRepository.getByCategory(req.params.category, 1));
});

// returns n excuse based on specific category
app.get("/v1/excuse/:category/:num(\\d+)?", function (req, res, next) {
  res.send(
    excusesRepository.getByCategory(req.params.category, req.params.num || 1)
  );
});

app.listen(port, function () {
  console.log("Server running on port", port);
});
