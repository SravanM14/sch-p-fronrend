import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/Register/Register";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import AppLayout from "../layouts/AppLayout/AppLayout";
import Profile from "../pages/profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import EditProfile from "../pages/profile/EditProfile";
import ChangePassword from "../pages/profile/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/login" replace />} />

 {/* Application */}
      <Route element={<ProtectedRoute />}>
      <Route element={<AppLayout />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/change-password" element={<ChangePassword />} />
      </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;