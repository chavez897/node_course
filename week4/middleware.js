var express = require("express");
var app = express();
var PORT = 3000;
// This middleware will not allow the
// request to go beyond it
app.use(function (req, res, next) {
  console.log("Middleware called");
  next();
});
// Requests will never reach this route
app.get("/user", function (req, res) {
  console.log("/user request called");
  res.send(req.url);
});

app.get(
  "/b",
  (req, res, next) => {
    console.log("Response is sent by the next function");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
