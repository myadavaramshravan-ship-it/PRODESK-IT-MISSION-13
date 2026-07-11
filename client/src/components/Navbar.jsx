function Navbar({ onToggle }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="navbar">
      <button type="button" className="sidebar-toggle" onClick={onToggle} aria-label="Open navigation">
        <span />
        <span />
        <span />
      </button>

      <div className="navbar-brand">
        <h2>TaskMatrix</h2>
        <p>Agile project hub</p>
      </div>
      <div className="navbar-user">
        Welcome, <strong>{user?.name || "Guest"}</strong>
      </div>
    </header>
  );
}

export default Navbar;
