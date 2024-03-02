const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  res.send("Hi baby!!");
});

app.get("/testlisting", async (req, res) => {
  let sampleListing = new Listing({
    title: "Snowy Cottage",
    description: "Near Mall Road ",
    price: 650,
    location: "Lansdowne, Uttarakhand",
    country: "India",
  });

  await sampleListing.save();
  console.log("sample was saved");
  res.send("successful");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
