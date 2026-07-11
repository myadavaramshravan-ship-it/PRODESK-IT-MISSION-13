const Project = require("../models/Project");
const Task = require("../models/Task");
const Activity = require("../models/Activity");


exports.getDashboard = async (req, res) => {

    try {

        const userId = req.user.id;


        const totalProjects = await Project.countDocuments({
            owner: userId
        });


        const userTasks = await Task.find({
            assignedTo: userId
        }).sort({ createdAt: -1 });

        const totalTasks = userTasks.length;

        const completedTasks = userTasks.filter(task => {
            const normalizedStatus = (task.status || "").toLowerCase();
            return normalizedStatus === "completed" || normalizedStatus.includes("complete");
        }).length;

        const pendingTasks = totalTasks - completedTasks;


        let statusData = {
            todo: 0,
            inProgress: 0,
            completed: 0
        };

        userTasks.forEach(task => {
            const normalizedStatus = (task.status || "").toLowerCase();

            if (normalizedStatus.includes("progress")) {
                statusData.inProgress += 1;
            } else if (normalizedStatus === "completed" || normalizedStatus.includes("complete")) {
                statusData.completed += 1;
            } else {
                statusData.todo += 1;
            }
        });




        const recentActivities = await Activity.find({
            user:userId
        })
        .sort({
            timestamp:-1
        })
        .limit(5);



        res.json({

            success:true,

            dashboard:{
                totalProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                tasksByStatus:statusData,
                recentTasks: userTasks.slice(0, 5).map(task => ({
                    id: task._id,
                    title: task.title,
                    status: task.status,
                    priority: task.priority
                })),
                recentActivities
            }

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};
