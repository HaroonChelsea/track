require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);
const mongoURI =
  "mongodb+srv://admin:rootpassword@cluster0.7ycca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongoose:", err);
});
app.get("/", requireAuth, (req, res) => {
  res.send(`Your emial: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
