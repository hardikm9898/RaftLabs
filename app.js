const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(` chat server is runnig on ${port} port `);
});
const connectionCount = new Set();
const htmlFile = path.join(__dirname, "public", "chat.html");
app.use(express.static(path.join(__dirname, "public")));

const bodyParser = require("body-parser");
require("./data/connect");

const isAuth = require("./middleware/isAuth");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

app.use("/auth", authRoutes);
app.use("/", isAuth, (req, res, next) => {
  const { userName } = req.user;
  res.render("chat", { userName });
});
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  connectionCount.add(socket.id);
  io.emit("countconnection", connectionCount.size);
  socket.on("disconnect", () => {
    connectionCount.delete(socket.id);
    io.emit("countconnection", connectionCount.size);
  });
  socket.on("message", (data) => {
    socket.broadcast.emit("brodcastmessage", data);
  });
  socket.on("feedback", (data) => {
    socket.broadcast.emit("brodcastfeedback", data);
  });
});
