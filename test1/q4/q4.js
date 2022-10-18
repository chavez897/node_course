const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

const fs = require("fs");
let json = null;

const checkJson = function (req, res, next) {
  if (json === null) {
    console.log("Loading JSON!");
    let myData = fs.readFileSync("T1_dataset.json");
    json = JSON.parse(myData);
  }
  next();
};

app.get("/data", (req, res) => {
  let myData = fs.readFileSync("T1_dataset.json");
  json = JSON.parse(myData);
  res.send(json);
});

app.get("/data/index/:index", [checkJson], (req, res) => {
  if (req.params.index < 0 || req.params.index >= json.length) {
    res.end("Invalid index");
  } else {
    res.send(json[req.params.index]);
  }
});

app.get("/data/search/[c|j]-:name", [checkJson], (req, res) => {
  console.log(req.url);
  console.log(req.params.name);
  let results = []
  if (req.url.includes("j-")) {
    results = json.filter((element) =>
      element.job.includes(req.params.name)
    );
  } else {
    results = json.filter((element) =>
      element.company.includes(req.params.name)
    );
  }
  res.send(results);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
