const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.put("/", (req, res) => {
  res.send("You called PUT!");
});

app.post("/", (req, res) => {
  res.send("You called POST!");
});

app.delete("/", (req, res) => {
  res.send("You called DELETE!");
});

app.get("/api/emps", (req, res) => {
  res.send([1, 2, 3]);
});
app.get("/api/emps/:id", (req, res) => {
  res.send(req.params.id);
});

app.get("/api/posts/:month/:day", (req, res) => {
  res.send(req.params.month + req.params.day);
});

app.get("*", function (req, res) {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
