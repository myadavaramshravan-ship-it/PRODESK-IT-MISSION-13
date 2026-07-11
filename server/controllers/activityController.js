const Activity = require("../models/Activity");

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email")
      .populate("project", "title")
      .populate("task", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      activities,
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
  getActivities,
};
