const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: String,

  //SETTING DEFAULT VALUE OF LINK IF THERE IS NO LINK.
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Focean-beach&psig=AOvVaw2l9FCn_92XS1xbyg0VQsGK&ust=1709402440811000&source=images&cd=vfe&opi=89978449&ved=0CBMQjhxqFwoTCJDI9czS04QDFQAAAAAdAAAAABAD",
    set: (v) =>
      v === ""
        ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Focean-beach&psig=AOvVaw2l9FCn_92XS1xbyg0VQsGK&ust=1709402440811000&source=images&cd=vfe&opi=89978449&ved=0CBMQjhxqFwoTCJDI9czS04QDFQAAAAAdAAAAABAD"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
