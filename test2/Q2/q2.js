var express = require("express");
var path = require("path");
const fs = require("fs");
var app = express();
const exphbs = require("express-handlebars");
const { body, check, validationResult } = require("express-validator");
app.use(express.urlencoded({ extended: true }));

// Configure port
const port = process.env.port || 3000;
// Set path for static files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the template engine
app.engine(".hbs", exphbs.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");

app.get("/", function (req, res) {
  res.render("form");
});

app.post(
  "/",
  body("radius").custom((value, { req }) => value > 200 || value < 50),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("error", { message: "Radius is Invalid" });
    } else {
      const area = req.body.radius * req.body.radius * 3.1415;
      res.render("result", { radius: req.body.radius, area: area });
    }
  }
);

//  Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
