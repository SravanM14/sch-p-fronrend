import { useState } from "react";

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import AuthBrandPanel from "../../../components/auth/AuthBrandPanel";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      brandPanel={<AuthBrandPanel variant="login" />}
    >
      <div className="auth-form">

        <h1 className="auth-title">
          Welcome Back! 👋
        </h1>

        <p className="auth-subtitle">
          Login to your account
        </p>

        <form>
          {/* Email */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="auth-label"
            >
              Email Address
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                id="email"
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="auth-label"
            >
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock"></i>
              </span>

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-control auth-input"
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowPassword((value) => !value)
                }
              >
                <i
                  className={
                    showPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                ></i>
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                id="rememberMe"
                type="checkbox"
                className="form-check-input"
              />

              <label
                htmlFor="rememberMe"
                className="form-check-label small"
              >
                Remember me
              </label>
            </div>

            <a
              href="/forgot-password"
              className="auth-link small"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="btn btn-primary auth-button w-100 mb-4"
          >
            Login
          </button>

          {/* Divider */}
          <div className="auth-divider mb-3">
            or continue with
          </div>

          {/* Social Login */}
          <div className="row g-2 mb-4">
            <div className="col-6">
              <button
                type="button"
                className="btn auth-social-button w-100"
              >
                <i className="bi bi-google me-2"></i>
                Google
              </button>
            </div>

            <div className="col-6">
              <button
                type="button"
                className="btn auth-social-button w-100"
              >
                <i className="bi bi-microsoft me-2"></i>
                Microsoft
              </button>
            </div>
          </div>

          {/* Register */}
          <p className="text-center text-secondary small mb-0">
            Don't have an account?{" "}
            <a
              href="/register"
              className="auth-link"
            >
              Create Account
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;