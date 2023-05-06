const express = require("express");
const Message = require("../schema/messageSchema");
const Channel = require("../schema/channelSchema");
const Users = require("../schema/userSchema");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, address } = req.body;
  try {
    const user = await Users.findOne({ address: address });

    if (user) {
      const isAddressMatched = address === user.address;

      if (isAddressMatched) {
        res.status(200).json({
          address: address,
          user: user
        });
      }
    } else {
      const newUser = await Users({
        username: username,
        address: address,
      });

      const result = await newUser.save();

      res.status(200).json({
        result: result,
      });
    }
    if (channelDetails.length > 0) {
      const channelId = channelDetails[0]._id;

      const messages = await Message.find({
        channelId: channelId,
      });

      res.status(200).json({ messages: messages });
    } else {
      res.status(200).json({ messages: [] });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
});

module.exports = router;
