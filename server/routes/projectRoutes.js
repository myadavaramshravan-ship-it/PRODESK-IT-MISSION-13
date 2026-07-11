const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controllers/projectController");

router.get("/", verifyToken, getProjects);

router.post("/", verifyToken, createProject);

router.delete("/:id", verifyToken, deleteProject);

module.exports = router;