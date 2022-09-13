const http = require("http");

const hostname = "127.0.0.1";

const port = 3000;

const fs = require("fs");
let myData = fs.readFileSync("MOCK_DATA.json");

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");
  res.end(myData.toString());
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
