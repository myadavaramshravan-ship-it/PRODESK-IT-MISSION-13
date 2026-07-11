const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, project } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: "Title and Project are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "Todo",
      priority: priority || "Medium",
      project,
      assignedTo: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id })
      .populate("project", "title")
      .populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, project } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.title = title || task.title;
    task.description = description ?? task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.project = project || task.project;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
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
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
