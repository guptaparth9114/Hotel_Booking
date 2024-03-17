const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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

// Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
  // try {
  //   const allListings = await Listing.find({});

  //   // Set default image URL for listings without an image property
  //   allListings.forEach((listing) => {
  //     if (!listing.image) {
  //       listing.image =
  //         "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Replace 'default_image_url.jpg' with your actual default image URL
  //     }
  //   });

  //   res.render("listings/index.ejs", { allListings });
  // } catch (err) {
  //   console.error("Error fetching listings:", err);
  //   res.status(500).send("Error fetching listings");
  // }
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  // try {
  //   let { image, ...listingData } = req.body.listing;
  //   if (!image) {
  //     image =
  //       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Replace DEFAULT_IMAGE_URL with your default image URL
  //   }
  //   const newListing = new Listing({ ...listingData, image });
  //   await newListing.save();
  //   res.redirect("/listings");
  // } catch (error) {
  //   console.error("Error creating listing:", error);
  //   res.status(500).send("Error creating listing");
  // }
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
  // try {
  //   let { id } = req.params;
  //   let { image, ...listingData } = req.body.listing;
  //   if (!image) {
  //     image =
  //       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"; // Replace DEFAULT_IMAGE_URL with your default image URL
  //   }
  //   await Listing.findByIdAndUpdate(id, { ...listingData, image });
  //   res.redirect(`/listings/${id}`);
  // } catch (error) {
  //   console.error("Error updating listing:", error);
  //   res.status(500).send("Error updating listing");
  // }
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("Server is listening to port 8080");
});
