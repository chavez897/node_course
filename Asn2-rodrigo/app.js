/******************************************************************************
***
* ITE5315 – Assignment 2
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Rodrigo Chavez Mercado Student ID: N01510943 Date: 2022-10-31
*
*
******************************************************************************
**/

var express = require("express");
var path = require("path");
const fs = require("fs");
var app = express();
const exphbs = require("express-handlebars");
app.use(express.urlencoded({ extended: true }));

// Configure port
const port = process.env.port || 3000;
// Set path for static files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the template engine
const HBS = exphbs.create({
  //Create custom HELPER
  helpers: {
    zero: function (num) {
      if (num === 0) {
        return "zero"
      }
      return num
    },
  },
  extname: 'hbs'
});
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");


let json = null;

// Middleware check JSON is loaded
const checkJson = function (req, res, next) {
  if (json === null) {
    console.log("Loading JSON!");
    let myData = fs.readFileSync("mydata.json");
    json = JSON.parse(myData);
  }
  next();
};

//  Root endpoint
app.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

//  Users endpoint
app.get("/users", function (req, res) {
  res.send("respond with a resource");
});

// Load JSON
app.get("/data", (req, res) => {
  let myData = fs.readFileSync("mydata.json");
  json = JSON.parse(myData);
  res.render("booksTable", {
    books: json,
    title: "Data"
  });
});

// Validate JSON is loaded
app.get("/status", [checkJson], (req, res) => {
  console.log(json);
  res.render("success", {
    title: "Status",
    message: "Data was load successfully!",
  });
});

// Get ISBN by index
app.get("/data/isbn/:index", [checkJson], (req, res) => {
  if (req.params.index < 0 || req.params.index >= json.length) {
    res.render("error", { title: "Error", message: "Invalid Index!" });
  } else {
    res.render("ISBNindex", {
      title: "ISBN",
      isbn: json[req.params.index].isbn,
    });
  }
});

// Search ISBN form
app.get("/data/search/isbn", (req, res) => {
  res.render("searchISBN", {
    title: "Search By ISBN"
  });
});

// ISBN search reponse
app.post("/data/search/isbn", [checkJson], function (req, res) {
  const book = json.find((element) => element.isbn === req.body.isbn);
  if (book === undefined) {
    res.render("error", { title: "Error", message: "Book not Found!" });
  } else {
    res.render("ISBNresult", {
      title: book.title,
      id: book.title,
      tittle: book.title,
      isbn: book.isbn,
      page: book.pageCount,
      date: book.publishedDate.$date,
      url: book.thumbnailUrl,
      short: book.shortDescription,
      long: book.longDescription,
      status: book.status,
      authors: book.authors,
      categories: book.categories,
    });
  }
});

// Search title form
app.get("/data/search/title", (req, res) => {
  res.render("searchTitle", {
    title: "Search By Title"
  });
});

// Title search reponse
app.post("/data/search/title", [checkJson], function (req, res) {
  const results = json.filter((element) =>
    element.title.includes(req.body.title)
  );
  res.render("booksTable", {
    title: "Title Results",
    books: results
  });
});

//  Error endpoint
app.get("*", function (req, res) {
  res.render("error", { title: "Error", message: "Wrong Route" });
});

//  Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
