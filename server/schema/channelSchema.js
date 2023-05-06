const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema(
  {
    channelRef: {
      type: String,
    },
    channelRef2: {
      type: String,
    },
  },
  { timestamps: true }
);

let Channel = mongoose.model("channel", channelSchema);

module.exports = Channel

