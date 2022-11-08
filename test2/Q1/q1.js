var express = require("express");
var path = require("path");
const fs = require("fs");
var app = express();
const exphbs = require("express-handlebars");

// Configure port
const port = process.env.port || 3000;
// Set path for static files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the template engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

let json = null;

//  Root endpoint
app.get("/", function (req, res) {
  let myData = fs.readFileSync("students.json");
  json = JSON.parse(myData);
  res.render("q1Table", {
    students: json,
  });
});

//  Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
