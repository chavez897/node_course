const express = require("express");
// Create router
const router = express.Router();

// Initialize built-in middleware for urlencoding and json
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Create your endpoints/route handlers

// Chained router route for Root Route
router
  .route("/")
  .get(function (req, res) {
    res.send("<h1>Hello World!</h1>");
  })

  .post(function (req, res) {
    console.log(req.body);
    res.send(req.body);
  });

// This path will match to /about
router.get("/about", (req, res) => {
  res.send("about");
});

// This route path will match abcd and acd
// router.get(/[/^]a/, (req, res) => {
//   res.send(req.url);
// });

router.get("/ab?cd", (req, res) => {
  res.send(req.url);
});

router.get(/a/, (req, res) => {
  res.send("/a/");
});
router.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});
router.get("/user/:userId(\\d+)", (req, res) => {
  res.send(req.params);
});

// Named parameters to get user and book ids
// Uses : followed by variable name
router.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

// Hyphen is used literally so can be used to
// separate parameters
router.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

//Add the following routes to the wp-activity. Explain how it works.

// Function that acts as middleware for request handler
const hello_1 = function (req, res, next) {
  console.log("Hello 1");
  next();
};

// Function that acts as middleware for request handler
// Code after next() is run after next function completes
const hello_2 = function (req, res, next) {
  console.log("Hello 2");
  next();
  console.log("Hello 2 after response sent");
};

// Multiple callback functions for route requires using next
router.get(
  "/c",
  [hello_1, hello_2],
  (req, res, next) => {
    console.log("Response is sent by the next function");
    next();
    console.log("Printed after response sent");
  },
  (req, res) => {
    console.log("Hello from C!");
    res.send("Hello from C!");
  }
);

// Export router
module.exports = router;
