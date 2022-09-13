var fs = require("fs");
fs.readFile("MOCK_DATA.json", function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString());
});
console.log("Program Ended");
