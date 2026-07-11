import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={handleClose} />}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div>
            <h2 className="logo">TaskMatrix</h2>
            <p>Agile work management</p>
          </div>
          <button className="sidebar-close" onClick={handleClose} aria-label="Close navigation">
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" onClick={handleClose}>Dashboard</Link>
          <Link to="/projects" onClick={handleClose}>Projects</Link>
          <Link to="/tasks" onClick={handleClose}>Tasks</Link>
          <Link to="/activity" onClick={handleClose}>Activity</Link>
          <Link to="/" onClick={handleClose}>Logout</Link>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
