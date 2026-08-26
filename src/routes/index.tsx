import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/Register/Register";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;