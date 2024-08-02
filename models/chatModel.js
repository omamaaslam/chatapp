const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
  {
    sender_id: {
      user: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
      user: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.export = mongoose.model("Chat", chatSchema);
