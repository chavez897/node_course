const express = require("express");
const app = express();
/** Require multer */ const multer = require("multer");
/** Show page with a form with a specific enctype */ app.get(
  "/",
  (req, res, next) => {
    res.send(
      `<form method="POST" action="/" enctype="multipart/form-data"><input type="text" name="username" placeholder="username"><input type="submit"></form>`
    );
  }
);
/** Process POST request with a mutter's middleware */ app.post(
  "/",
  multer().none(),
  function (req, res, next) {
    res.send(JSON.stringify(req.body));
  }
);
/** Run the app */ app.listen(3000);
