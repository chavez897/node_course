const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
// app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
// app.set("view engine", ".hbs");
const HBS = exphbs.create({
  //Create custom HELPER
  helpers: {
    sample: function () {
      return 100;
    },
    calculation: function (num) {
      return num + 10;
    },
    strong: function (options) {
      return "<strong>" + options.fn(this) + "</strong>";
    },
  },
});
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");

app.get("/getData", function (req, res) {
  var someData = {
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank",
  };
  res.json(someData);
});

app.get("/viewhbs", (req, res) => {
  var someData = [
    {
      manager: true,
      name: "John",
      age: 23,
      occupation: "developer",
      company: "Scotiabank",
    },
    {
      manager: false,
      name: "Sara",
      age: 19,
      occupation: "developer",
      company: "CIBCbank",
    },
    {
      manager: false,
      name: "Rodrigo",
      age: 25,
      occupation: "developer",
      company: "TD",
    },
    {
      manager: true,
      name: "Maria",
      age: 23,
      occupation: "developer",
      company: "CIBCbank",
    },
  ];
  res.render("viewData", {
    data: someData,
    layout: false, // do not use the default Layout (main.hbs)
  });
});

app.get("/viewData", function (req, res) {
  var someData = {
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank",
  };

  var htmlString =
    "<!doctype html>" +
    "<html>" +
    "<head>" +
    "<title>" +
    "View Data" +
    "</title>" +
    "</head>" +
    "<body>" +
    "<table border='1'>" +
    "<tr>" +
    "<th>" +
    "Name" +
    "</th>" +
    "<th>" +
    "Age" +
    "</th>" +
    "<th>" +
    "Occupation" +
    "</th>" +
    "<th>" +
    "Company" +
    "</th>" +
    "</tr>" +
    "<tr>" +
    "<td>" +
    someData.name +
    "</td>" +
    "<td>" +
    someData.age +
    "</td>" +
    "<td>" +
    someData.occupation +
    "</td>" +
    "<td>" +
    someData.company +
    "</td>" +
    "</tr>" +
    "</table>" +
    "</body>" +
    "</html>";
  res.send(htmlString);
});

app.listen(3000);
