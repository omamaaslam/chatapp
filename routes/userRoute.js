const dotenv = require("dotenv");
dotenv.config();

const { SESSION_SECRET } = process.env;
const session = require("express-session");

const express = require("express");
const userRoute = express();

const bodyparser = require("body-parser");
userRoute.use(session({ secret: SESSION_SECRET }));
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
const auth = require("../middleware/auth");

userRoute.get("/register", auth.isLogout, userController.registerLoad);
userRoute.post("/register", upload.single("image"), userController.register);
userRoute.get("/", auth.isLogout, userController.loadLogin);
userRoute.post("/", userController.login);
userRoute.get("/logout", auth.isLogin, userController.logout);
userRoute.get("/dashboard", auth.isLogin, userController.loadDashboard);
// if no route match default set to login
userRoute.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = userRoute;
