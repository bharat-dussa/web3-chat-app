const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const sendMessage = require("./routes/message");
const getMessage = require("./routes/getMessage");
const auth = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json())
const uri = "mongodb://localhost:27017/meta-chat";

app.use("/", (req,res, next) => {
    console.log('req:', req.body);

    next();

})
app.use("/v1", sendMessage);
app.use("/v1", getMessage);
app.use("/v1", auth);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to mongodb.");

    app.listen(3002, () => {
      console.log("server started");
    });
  })
  .catch(() => {
    console.log("Error while connect mongodb.");
  });
