const Project = require("../models/Project");
const Activity = require("../models/Activity");

const createProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const project = await Project.create({
      title,
      description,
      status,
      owner: req.user.id,
    });

    await Activity.create({
      action: "Created Project",
      user: req.user.id,
      project: project._id,
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "owner",
      "name email"
    );

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await Activity.create({
      action: "Deleted Project",
      user: req.user.id,
      project: project._id,
    });

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  deleteProject,
};
