const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");

const HTTP_PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "./public/photos/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static("./public/"));

app.get("/", (req, res) => {
    // send the html view with our form to the client
    res.sendFile(path.join(__dirname, "/views/registerUser.html"));
  });

app.post("/register-user", upload.single("photo"), (req, res) => {
    const formData = req.body;
    const formFile = req.file;
  
    const dataReceived =
      "Your submission was received:<br/><br/>" +
      "Your form data was:<br/>" +
      JSON.stringify(formData) +
      "<br/><br/>" +
      "Your File data was:<br/>" +
      JSON.stringify(formFile) +
      "<br/><p>This is the image you sent:<br/><img src='/photos/" +
      formFile.filename +
      "'/>";
    res.send(dataReceived);
  });

app.listen(HTTP_PORT);