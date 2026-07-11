import { useEffect, useState } from "react";
import API from "../api/axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Activity() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  const fetchActivities = async () => {
    try {
      const res = await API.get("/activities");
      setActivities(res.data.activities || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="main-content">
        <Navbar onToggle={toggleSidebar} />

        <div className="page">
          <h1>Activity Feed</h1>

          {loading ? (
            <p>Loading activity...</p>
          ) : error ? (
            <p>{error}</p>
          ) : activities.length === 0 ? (
            <div className="project-card">
              <h3>No activity found</h3>
              <p>Nothing to display yet.</p>
            </div>
          ) : (
            <div className="project-list">
              {activities.map((item) => (
                <div className="project-card" key={item._id}>
                  <h2>{item.action}</h2>
                  <p>
                    <strong>User:</strong> {item.user?.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Project:</strong> {item.project?.title || "N/A"}
                  </p>
                  <p>
                    <strong>Task:</strong> {item.task?.title || "N/A"}
                  </p>
                  <p>
                    <strong>Time:</strong> {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activity;
