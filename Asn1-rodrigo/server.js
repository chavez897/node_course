/******************************************************************************
 ***
 * ITE5315 – Assignment 1
 * I declare that this assignment is my own work in accordance with Humber Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Rodrigo Chavez Mercado Student ID: N01510943 Date: 2022-10-03
 *
 *
 ******************************************************************************
 **/

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
app.use(express.urlencoded({ extended: true }));

const fs = require("fs");
let json = null;

app.get("/", (req, res) => {
  res.send("Rodrigo Chavez Mercado - N01510943");
});

const checkJson = function (req, res, next) {
  if (json === null) {
    console.log("Loading JSON!");
    let myData = fs.readFileSync("mydata.json");
    json = JSON.parse(myData);
  }
  next();
};

app.get("/data", (req, res) => {
  let myData = fs.readFileSync("mydata.json");
  json = JSON.parse(myData);
  res.send(json);
});

app.get("/status", [checkJson], (req, res) => {
  console.log(json);
  res.send("JSON data is loaded and ready!");
});

app.get("/data/isbn/:index", [checkJson], (req, res) => {
  if (req.params.index < 0 || req.params.index >= json.length) {
    res.end("Invalid index");
  } else {
    res.send(json[req.params.index].isbn);
  }
});

app.get("/data/search/isbn", (req, res) => {
  res.send(`<form method="POST" action="/data/search/isbn">
<input type="text" name="isbn" placeholder="isbn">
<button type="submit"> Search</button
</form>`);
});
/** Process POST request */
app.post("/data/search/isbn", [checkJson], function (req, res) {
  const book = json.find((element) => element.isbn === req.body.isbn);
  if (book === undefined) {
    res.send(`<h1>Error! Book not Found!</h1>`);
  } else {
    res.send(book);
  }
});

app.get("/data/search/title", (req, res) => {
  res.send(`<form method="POST" action="/data/search/title">
<input type="text" name="title" placeholder="title">
<button type="submit"> Search</button
</form>`);
});
/** Process POST request */
app.post("/data/search/title", [checkJson], function (req, res) {
  const results = json.filter((element) =>
    element.title.includes(req.body.title)
  );
  res.send(results);
});

app.get("*", function (req, res) {
  res.status(404).send(`<h1>404 Page not Found!</h1>`);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
