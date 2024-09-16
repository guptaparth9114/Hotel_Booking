const express = require("express");
const router = express.Router();

// Posts Routes
// Index - Get all posts
router.get("/", (req, res) => {
  res.send("GET for posts");
});

// Show - Get a specific post by ID
router.get("/:id", (req, res) => {
  res.send(`GET for post id: ${req.params.id}`);
});

// Create - Post a new post
router.post("/", (req, res) => {
  res.send("POST for posts");
});

//DELETE
router.delete("/:id", (req, res) => {
  res.send("Delete for posts");
});

module.exports = router;
