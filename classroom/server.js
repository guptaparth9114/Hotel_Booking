const express = require("express");
const app = express();
const users = require("./route/user.js");
const posts = require("./route/post.js");

// Root Route
app.get("/", (req, res) => {
  res.send("Hi, I am root!");
});

// Use the "users" router for all routes starting with /users
app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
