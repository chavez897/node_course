const express = require("express");
const app = express();
/** Decode Form URL Encoded data */
app.use(express.urlencoded({ extended: true }));

app.all("/", function (req, res, next) {
  console.log("Accessing the site ...");
  next(); // pass control to the next handler–
});
/** Show page with a form */
app.get("/", (req, res, next) => {
  res.send(`<form method="POST" action="/">
<input type="text" name="username" placeholder="username">
<input type="submit">
</form>`);
});
/** Process POST request */
app.post("/", function (req, res, next) {
  res.send(JSON.stringify(req.body));
});
/** Run the app */
app.listen(3000);
