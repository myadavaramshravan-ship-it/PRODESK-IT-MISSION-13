import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import API from "../api/axios";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboardData(response.data.dashboard);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page">
            <h2>Loading dashboard...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page">
            <h2>{error}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="cards">
          <DashboardCard title="Projects" value={dashboardData?.totalProjects ?? 0} />
          <DashboardCard title="Tasks" value={dashboardData?.totalTasks ?? 0} />
          <DashboardCard title="Completed" value={dashboardData?.completedTasks ?? 0} />
          <DashboardCard title="Pending" value={dashboardData?.pendingTasks ?? 0} />
        </div>

        <div className="page dashboard-content">
          <h2>Task Status</h2>
          <div className="status-list">
            <div>
              <strong>To Do:</strong> {dashboardData?.tasksByStatus?.todo ?? 0}
            </div>
            <div>
              <strong>In Progress:</strong> {dashboardData?.tasksByStatus?.inProgress ?? 0}
            </div>
            <div>
              <strong>Completed:</strong> {dashboardData?.tasksByStatus?.completed ?? 0}
            </div>
          </div>

          <h3 style={{ marginTop: "20px" }}>Recent Tasks</h3>
          {dashboardData?.recentTasks?.length ? (
            <ul className="task-list">
              {dashboardData.recentTasks.map((task) => (
                <li key={task.id}>
                  <span>{task.title}</span>
                  <span>{task.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;