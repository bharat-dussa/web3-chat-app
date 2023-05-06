const express = require("express");
const Message = require("../schema/messageSchema");
const Channel = require("../schema/channelSchema");
const Users = require("../schema/userSchema");

const router = express.Router();

router.post("/send-message", async (req, res) => {
  const { userId, senderAddress, receiverAddress, message } = req.body;
  try {
    let channelRef = `${senderAddress}-${receiverAddress}-channel`;
    let channelRef2 = `${receiverAddress}-${senderAddress}-channel`;

    let channelDetails = await Channel.aggregate([
      {
        $match: {
          $or: [
            {
              channelRef: channelRef,
            },
            {
              channelRef2: channelRef,
            },
          ],
        },
      },
    ]);

    if (channelDetails.length > 0) {
      await Message.create({
        userId,
        message,
        channelId: channelDetails[0]._id,
      });
    } else {
      const newChannel = await Channel.create({
        channelRef: channelRef,
        channelRef2: channelRef2,
      });

      const users = await Users.findOne({
        _id: userId,
      });

      if (!users.myChannels.includes(newChannel._id)) {
        users.myChannels.push(newChannel._id);

        await users.save();
      }

      await Message.create({
        userId,
        message,
        channelId: newChannel._id,
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error });
    console.error(error);
  }
});

router.get("/get-users/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const myChannels = await Users.findOne({
      _id: userId,
    }).populate("myChannels");

    res.status(200).json({ myChannels: myChannels });
  } catch (error) {
    console.log("error:", error);
    res.status(400).json({ error });
  }
});

module.exports = router;
