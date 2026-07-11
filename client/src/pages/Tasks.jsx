import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Tasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Medium");
  const [project, setProject] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      setError(err.response?.data?.message || "We could not load your tasks right now.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.projects || []);
      if (res.data.projects?.length) {
        setProject(res.data.projects[0]._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Todo");
    setPriority("Medium");
    setEditingTaskId(null);
    if (projects.length) {
      setProject(projects[0]._id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !project) {
      alert("Please enter a task title and choose a project.");
      return;
    }

    try {
      if (editingTaskId) {
        await API.put(`/tasks/${editingTaskId}`, {
          title,
          description,
          status,
          priority,
          project,
        });
        alert("Your task was updated successfully.");
      } else {
        await API.post("/tasks", {
          title,
          description,
          status,
          priority,
          project,
        });
        alert("Your new task was created successfully.");
      }

      resetForm();
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong while saving your task.");
    }
  };

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setTitle(task.title);
    setDescription(task.description || "");
    setStatus(task.status || "Todo");
    setPriority(task.priority || "Medium");
    setProject(task.project?._id || task.project || "");
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${id}`);
      alert("The task was deleted successfully.");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "We could not delete the task.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="main-content">
        <Navbar onToggle={toggleSidebar} />

        <div className="page">
          <h1>My Tasks</h1>

          <form className="project-form" onSubmit={handleSubmit}>
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="task-description">Task Description</label>
            <textarea
              id="task-description"
              placeholder="Add task details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label htmlFor="task-status">Status</label>
            <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <label htmlFor="task-priority">Priority</label>
            <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <label htmlFor="task-project">Project</label>
            <select id="task-project" value={project} onChange={(e) => setProject(e.target.value)}>
              {projects.map((proj) => (
                <option key={proj._id} value={proj._id}>{proj.title}</option>
              ))}
            </select>

            <div className="button-row">
              <button type="submit">{editingTaskId ? "Save Changes" : "Create Task"}</button>
              {editingTaskId ? (
                <button type="button" onClick={resetForm}>Cancel</button>
              ) : null}
            </div>
          </form>

          {loading ? (
            <p>Loading your tasks...</p>
          ) : error ? (
            <p>{error}</p>
          ) : tasks.length === 0 ? (
            <p>You do not have any tasks yet.</p>
          ) : (
            <div className="project-list">
              {tasks.map((task) => (
                <div className="project-card" key={task._id}>
                  <h2>{task.title}</h2>
                  {task.description ? <p>{task.description}</p> : null}
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p>
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p>
                    <strong>Project:</strong> {task.project?.title || "N/A"}
                  </p>

                  <div className="button-row">
                    <button onClick={() => startEdit(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
