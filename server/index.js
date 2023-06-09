const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendMessage = require("./routes/message");
const getMessage = require("./routes/getMessage");
const auth = require("./routes/auth");

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://chat-app:chat-app@cluster0.asdufxv.mongodb.net/?retryWrites=true&w=majority";

app.use("/", (req, res, next) => {
  console.log("req:", req.body);

  next();
});
app.use("/v1", sendMessage);
app.use("/v1", getMessage);
app.use("/v1", auth);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongodb.");

    app.listen(port, "0.0.0.0", () => {
      console.log(`server started at ${port}`);
    });
  })
  .catch(() => {
    console.log("Error while connect mongodb.");
  });
