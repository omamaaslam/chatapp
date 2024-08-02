const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerLoad = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

exports.register = async (req, res) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
      image: "images" + req.file.filename,
    });

    await user.save;

    
  } catch (error) {
    console.log(error);
  }
};
