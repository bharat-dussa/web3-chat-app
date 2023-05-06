const express = require("express");
const Message = require("../schema/messageSchema");
const Channel = require("../schema/channelSchema");

const router = express.Router();

router.get("/get-message/:channelRef", async (req, res) => {
  const { channelRef } = req.params;
  try {
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
