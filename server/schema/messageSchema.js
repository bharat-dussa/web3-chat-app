const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    message: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

let Message = mongoose.model("message", messageSchema);

module.exports = Message
