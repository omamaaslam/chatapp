const express = require("express");
const userRoute = express();

const bodyparser = require("body-parser");
userRoute.use(bodyparser.json());
userRoute.use(bodyparser.urlencoded({ extended: true }));
userRoute.set("view engine", "ejs");
userRoute.set("views", "./views");
userRoute.use(express.static("public"));

const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imagePath = path.join(__dirname, "../public/images");
    if (!fs.existsSync(imagePath)) {
      fs.mkdirSync(imagePath, { recursive: true });
    }
    cb(null, imagePath);
  },

  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
const userController = require("../controller/userController");

userRoute.get("/register", userController.registerLoad);
userRoute.post("/register", upload.single("image"), userController.register);

module.exports = userRoute;
