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
      res.status(501).json({ message: "user already exist try different" });
    }

    const newuser = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      image: "image/" + req.file.filename,
    });

    await newuser.save();
    res.status(201).json({ message: "Registeration Complete" });

    // res.render("register", { message: "Registration Complete" });
  } catch (error) {
    console.log(error);
  }
};
