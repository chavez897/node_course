var express = require("express");
var path = require("path");
var app = express();
const exphbs = require("express-handlebars");

// Configure port
const port = process.env.port || 3000;
// Set path for static files
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the template engine
const HBS = exphbs.create({
  helpers: {
    sample: function () {
      return 102;
    },
    shapper: function (options) {
      return "<i><u><b>" + options.fn(this) + "</b></u></i>";
    },
  },
  extname: "hbs",
});
app.engine(".hbs", HBS.engine);
app.set("view engine", ".hbs");

//  Root endpoint
app.get("/", function (req, res) {
  res.render("helpers", { name: "Rodrigo" });
});

//  Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
