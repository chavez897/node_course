// Define dependencies
const express = require("express");
const { body, check, validationResult } = require("express-validator");
// Init the server
const app = express();
// Allow request to be send as json
app.use(express.json());
//Allow request to be send as urlencoded
// app.use(express.urlencoded());

// POSR /checkuser endpoint
app.post(
  "/checkuser",
  // validate that the email is valid format
  body("email").isEmail(),
  // validate userID is at least 5 characters long
  body("userID").isLength({ min: 5 }),
  (req, res) => {
    // Get validation result
    const errors = validationResult(req);
    //Check if there is any errors
    if (!errors.isEmpty()) {
        // Return a response with status code 400 and the errors message
      return res.status(400).send({ errors: errors.array() });
    }
    // Return the body because validation was correct
    res.send(req.body);
  }
);

// start server on port
app.listen(3000);
