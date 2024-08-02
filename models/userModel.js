const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    image: { type: String, require: true },
    password: { type: String, require: true },
    isOnline: { type: String, default: "0" },
  },
  {
    timestamps: true,
  }
);

module.export = mongoose.model("User", userSchema);
