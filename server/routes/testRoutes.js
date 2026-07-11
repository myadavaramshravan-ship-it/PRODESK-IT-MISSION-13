const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

router.get("/dashboard", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the protected dashboard!",
    user: req.user,
  });
});

module.exports = router;