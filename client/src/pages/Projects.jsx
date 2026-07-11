import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planning");

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data.projects);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch projects");
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/projects", {
        title,
        description,
        status,
      });

      alert(res.data.message);

      setTitle("");
      setDescription("");
      setStatus("Planning");

      fetchProjects();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
    }
  };

  const deleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/projects/${id}`);

      alert(res.data.message);

      fetchProjects();
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to delete project");
      }
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="main-content">
        <Navbar onToggle={toggleSidebar} />

        <div className="page">
          <h1>Projects</h1>

          <form className="project-form" onSubmit={createProject}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>

            <button type="submit">Create Project</button>
          </form>

          <div className="project-list">
            {projects.length === 0 ? (
              <h3>No Projects Found</h3>
            ) : (
              projects.map((project) => (
                <div className="project-card" key={project._id}>
                  <h2>{project.title}</h2>

                  <p>{project.description}</p>

                  <p>
                    <strong>Status:</strong> {project.status}
                  </p>

                  <button
                    onClick={() => deleteProject(project._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
