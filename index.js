const express = require("express");
const parser = require("body-parser");
const users = require("./controller/user");
const posts = require("./controller/posts");
const comments = require("./controller/comments");
const connect = require("./controller/db");
const { tokenGenerate, checkToken } = require("./auth/jwt");
const port = 1011;

const app = express(); //server
app.use(parser.json()); //converts to string
app.use(parser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "server is running" });
});

connect();

//converts everything back to object
// users Router
app.use("/users", users);
// Posts Router
app.use("/posts", posts);

app.use("/comments", comments);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(port, () => {
  `Server running at http://localhost:${port}`;
});
