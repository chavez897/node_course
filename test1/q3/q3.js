const express = require("express");

const app = express();

app.use(function (req, res, next) {
  console.log("LOGGED");
  next();
});

const middleware = function (req, res, next) {
  console.log("Middleware after route-matching!");
};

app.get(
  "/user",
  (req, res, next) => {
    console.log("route-matching");
    res.send("Hello World!");
    next();
  },
  [middleware]
);

app.get("*", function (req, res) {
  res.status(404).send(`<h1>404 Page not Found!</h1>`);
});

app.listen(3000);
