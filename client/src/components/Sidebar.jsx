import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">TaskMatrix</h2>
        <p>Agile work management</p>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/activity">Activity</Link>
        <Link to="/">Logout</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
