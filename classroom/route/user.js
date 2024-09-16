const express = require("express");
const router = express.Router();

// Index - Get all users
router.get("/", (req, res) => {
  res.send("GET for users");
});

// Show - Get a specific user by ID
router.get("/:id", (req, res) => {
  res.send(`GET for user id: ${req.params.id}`);
});

// Create - Post a new user
router.post("/", (req, res) => {
  res.send("POST for users");
});

// Delete - Delete a specific user by ID
router.delete("/:id", (req, res) => {
  res.send(`DELETE for user id: ${req.params.id}`);
});

module.exports = router;
