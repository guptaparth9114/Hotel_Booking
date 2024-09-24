const express = require("express");
const app = express();
const users = require("./route/user.js");
const posts = require("./route/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser("secretcode"));

app.get("/getsignedcookie", (req, res) => {
  res.cookie("made-in", "India", { signed: true }); // Moved inside the callback
  res.send("signed cookie sent");
});

app.get("/verify", (req, res) => {
  console.log(req.signedCookies); // Fixed syntax and correct property name
  res.send("verified");
});

app.get("/getcookies", (req, res) => {
  res.cookie("greet", "namaste");
  res.cookie("madeIn", "India");
  res.send("sent you some cookies!");
});

app.get("/", (req, res) => {
  console.dir(req.cookies); // Logs the cookies in the console
  res.send("Hi, I am root!");
});

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
