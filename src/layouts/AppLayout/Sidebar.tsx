import { useDispatch } from "react-redux";
import authService from "../../services/auth/authService";
import { logOut } from "../../store/auth/authSlice";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/hook";

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

const Sidebar = () => {
  const dispatch = useDispatch();

  const refreshToken = useAppSelector(
    (state) => state.auth.refreshToken
  );

  const role = useAppSelector(
    (state) => state.auth.user?.role
  );

  const logOutHandler = async () => {
    try {
      await authService.logout(refreshToken || "");
      dispatch(logOut());
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems: Record<string, MenuItem[]> = {
    ADMIN: [
      {
        label: "Dashboard",
        icon: "bi-grid",
        path: "/dashboard",
      },
      {
        label: "Users",
        icon: "bi-people",
        path: "/users",
      },
      {
        label: "Students",
        icon: "bi-mortarboard",
        path: "/students",
      },
      {
        label: "Teachers",
        icon: "bi-person-workspace",
        path: "/teachers",
      },
      {
        label: "Parents",
        icon: "bi-people-fill",
        path: "/parents",
      },
      {
        label: "Classes",
        icon: "bi-building",
        path: "/classes",
      },
      {
        label: "Subjects",
        icon: "bi-book",
        path: "/subjects",
      },
      {
        label: "Attendance",
        icon: "bi-calendar-check",
        path: "/attendance",
      },
      {
        label: "Examinations",
        icon: "bi-journal-text",
        path: "/examinations",
      },
      {
        label: "Fees",
        icon: "bi-cash-stack",
        path: "/fees",
      },
      {
        label: "Reports",
        icon: "bi-bar-chart",
        path: "/reports",
      },
      {
        label: "Messages",
        icon: "bi-chat-dots",
        path: "/messages",
      },
      {
        label: "Profile",
        icon: "bi-person-circle",
        path: "/profile",
      },
      {
        label: "Settings",
        icon: "bi-gear",
        path: "/settings",
      },
    ],

    TEACHER: [
      {
        label: "Dashboard",
        icon: "bi-grid",
        path: "/dashboard",
      },
      {
        label: "My Classes",
        icon: "bi-building",
        path: "/classes",
      },
      {
        label: "Students",
        icon: "bi-mortarboard",
        path: "/students",
      },
      {
        label: "Attendance",
        icon: "bi-calendar-check",
        path: "/attendance",
      },
      {
        label: "Subjects",
        icon: "bi-book",
        path: "/subjects",
      },
      {
        label: "Examinations",
        icon: "bi-journal-text",
        path: "/examinations",
      },
      {
        label: "Messages",
        icon: "bi-chat-dots",
        path: "/messages",
      },
      {
        label: "Profile",
        icon: "bi-person-circle",
        path: "/profile",
      },
      {
        label: "Settings",
        icon: "bi-gear",
        path: "/settings",
      },
    ],

    PARENT: [
      {
        label: "Dashboard",
        icon: "bi-grid",
        path: "/dashboard",
      },
      {
        label: "My Children",
        icon: "bi-people",
        path: "/children",
      },
      {
        label: "Attendance",
        icon: "bi-calendar-check",
        path: "/attendance",
      },
      {
        label: "Subjects",
        icon: "bi-book",
        path: "/subjects",
      },
      {
        label: "Examinations",
        icon: "bi-journal-text",
        path: "/examinations",
      },
      {
        label: "Fees",
        icon: "bi-cash-stack",
        path: "/fees",
      },
      {
        label: "Messages",
        icon: "bi-chat-dots",
        path: "/messages",
      },
      {
        label: "Profile",
        icon: "bi-person-circle",
        path: "/profile",
      },
      {
        label: "Settings",
        icon: "bi-gear",
        path: "/settings",
      },
    ],
  };

  const currentMenuItems = role
    ? menuItems[role] || []
    : [];
  const roleClass = `profile-role-${(role ?? "student").toLowerCase()}`;

  return (
    <aside
      className={`app-sidebar d-flex flex-column bg-dark text-white p-3 ${roleClass}`}
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center mb-4">
        <div
          className="sidebar-logo rounded-3 d-flex align-items-center justify-content-center me-2"
          style={{
            width: "40px",
            height: "40px",
          }}
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
        {currentMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link text-white rounded ${isActive ? "active" : ""}`
            }
          >
            <i className={`bi ${item.icon} me-2`}></i>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-3 border-top border-secondary">
        <button
          className="btn btn-link text-white text-decoration-none w-100 text-start"
          onClick={logOutHandler}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;