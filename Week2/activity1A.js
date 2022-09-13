const fs = require("fs");
let myData = fs.readFileSync("MOCK_DATA.json");
let contacts = JSON.parse(myData);
console.log(contacts);
