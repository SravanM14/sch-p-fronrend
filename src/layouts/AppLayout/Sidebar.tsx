const Sidebar = () => {
  return (
    <aside
      className="d-flex flex-column bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <div
          className="bg-primary rounded-3 d-flex align-items-center justify-content-center me-2"
          style={{ width: "40px", height: "40px" }}
        >
          <i className="bi bi-mortarboard-fill fs-5"></i>
        </div>

        <div>
          <div className="fw-bold">School</div>
          <div className="small">Management</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="nav flex-column gap-1">

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-grid me-2"></i>
          Dashboard
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-people me-2"></i>
          Students
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-person-workspace me-2"></i>
          Teachers
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-people-fill me-2"></i>
          Parents
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-building me-2"></i>
          Classes
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-book me-2"></i>
          Subjects
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-calendar-check me-2"></i>
          Attendance
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-journal-text me-2"></i>
          Examinations
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-cash-stack me-2"></i>
          Fees
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-bar-chart me-2"></i>
          Reports
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-chat-dots me-2"></i>
          Messages
        </a>

        {/* Profile */}
        <a
          href="#"
          className="nav-link active bg-primary text-white rounded"
        >
          <i className="bi bi-person-circle me-2"></i>
          Profile
        </a>

        <a href="#" className="nav-link text-white rounded">
          <i className="bi bi-gear me-2"></i>
          Settings
        </a>

      </nav>

      {/* Logout */}
      <div className="mt-auto pt-3 border-top border-secondary">
        <button className="btn btn-link text-white text-decoration-none w-100 text-start">
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;