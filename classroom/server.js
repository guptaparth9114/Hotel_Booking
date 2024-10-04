const express = require("express");
const app = express();
const users = require("./route/user.js");
const posts = require("./route/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

// Set up view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session configuration
const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

// Middleware setup
app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
});

// Register route
app.get("/register", (req, res) => {
  const { name = "anonymous" } = req.query;
  req.session.name = name;
  if (name === "anonymous") {
    req.flash("error", "User not registered");
  } else {
    req.session.name = name;
    req.flash("success", "User registered successfully!");
  }
  res.redirect("/hello");
});

app.get("/hello", (req, res) => {
  res.render("page.ejs", {
    name: req.session.name,
    msg: req.flash("success"),
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
