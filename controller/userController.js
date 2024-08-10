const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerLoad = (req, res) => {
  try {
    res.render("register");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const alreadyExist = await User.findOne({ email: req.body.email });
    if (alreadyExist) {
      return res
        .status(501)
        .json({ message: "user already exist try different" });
    }

    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      image: "img-" + req.file.filename,
    });

    await newuser.save();
    console.log("User registered successfully");
    res.render("login", { message: "Registration Complete" });
  } catch (error) {
    console.log(error);
  }
};

exports.loadLogin = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Login attempt body:", req.body); // Log the entire body
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    const userData = await User.findOne({ email: email });
    console.log("userData:", userData);
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        console.log("Password match, logging in");
        req.session.user = userData;
        res.redirect("/dashboard");
      } else {
        console.log("Password mismatch");
        res.render("login", { message: "Email and Password is Incorrect." });
      }
    } else {
      console.log("User not found");
      res.render("login", { message: "Email and Password is Incorrect." });
    }
  } catch (error) {
    console.log("Error during login:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loadDashboard = async (req, res) => {
  try {
    var users = await User.find({ _id: { $nin: [req.session.user._id] } });
    res.render("dashboard", { user: req.session.user, users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
