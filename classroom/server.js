const express = require("express");
const app = express();
const users = require("./route/user.js");
const posts = require("./route/post.js");
const session = require("express-session");

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));

app.get("/register", (req, res) => {
  // Default value for name is "anonymous" if req.query is empty
  const { name = "anonymous" } = req.query;
  req.session.name = name;
  res.redirect("/hello"); // Send the name as response
});

app.get("/hello", (req, res) => {
  res.send(`hello, ${req.session.name}`); // Send 'hello' as response
});

// app.get("/reqcount", (req, res) => {
//   // Check if the count already exists in the session
//   if (req.session.count) {
//     req.session.count++; // Increment the count
//   } else {
//     req.session.count = 1; // Initialize count if it doesn't exist
//   }

//   // Send the response with the count
//   res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful!");
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
