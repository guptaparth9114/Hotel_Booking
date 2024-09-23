const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/expressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); // USED TO RENDER STATIC FILES LIKE CSS

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi ");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!!" } = err;
  res.status(statusCode).render("error.ejs", { statusCode, message });
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
