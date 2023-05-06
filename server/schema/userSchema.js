const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
      default: "My name is Bharat",
    },
    myChannels: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    }]
  },
  { timestamps: true }
);

let Users = mongoose.models.users || mongoose.model("users", userSchema);

module.exports = Users;
