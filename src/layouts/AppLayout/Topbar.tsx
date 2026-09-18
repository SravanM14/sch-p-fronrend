//import { useAppSelector } from "../../store/hooks";

import { Link, useNavigate } from "react-router-dom";
import {useAppSelector } from "../../store/hook";
import authService from "../../services/auth/authService";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/auth/authSlice";

interface TopbarProps {
    isSidebarVisible: boolean;
    onToggleSidebar: () => void;
}

const Topbar = ({ isSidebarVisible, onToggleSidebar }: TopbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useAppSelector((state) => state.auth.user);

    const refreshToken = useAppSelector((state) => state.auth.refreshToken);

    const logOutHandler = async() => {
        try {
           // const refreshToken = localStorage.getItem("refreshToken");
            await authService.logout(refreshToken || "" );
             dispatch(logOut());
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }

    return (
        <header className="bg-white border-bottom px-4 py-3">
            <div className="d-flex align-items-center justify-content-between">

                {/* Left */}
                <div className="d-flex align-items-center gap-3">
                    <button
                        className="btn btn-light"
                        type="button"
                        aria-label={isSidebarVisible ? "Hide sidebar" : "Show sidebar"}
                        aria-pressed={isSidebarVisible}
                        onClick={onToggleSidebar}
                    >
                        <i className="bi bi-list fs-5"></i>
                    </button>

                    <h5 className="mb-0 fw-semibold">
                        {user?.name}
                    </h5>
                </div>

                {/* Right */}
                <div className="d-flex align-items-center gap-3">

                    {/* Notification */}
                    <button className="btn btn-light position-relative">
                        <i className="bi bi-bell fs-5"></i>

                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            3
                        </span>
                    </button>

                    {/* User */}
                    <div className="d-flex align-items-center gap-2">

                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                               {user?.name} ({user?.role})
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><Link to="/profile" className="dropdown-item">
                                    Profile
                                </Link></li>
                                <li onClick={logOutHandler}>Logout</li>    
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
    </header >
  );
};

export default Topbar;