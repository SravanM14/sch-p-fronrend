import { useState } from "react";

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import AuthBrandPanel from "../../../components/auth/AuthBrandPanel";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <AuthLayout
      brandPanel={<AuthBrandPanel variant="register" />}
    >
      <div className="auth-form">

        <h1 className="auth-title">
          Create Account 🎓
        </h1>

        <p className="auth-subtitle">
          Fill in the details to register
        </p>

        <form>

          {/* Full Name */}
          <div className="mb-3">
            <label
              htmlFor="name"
              className="auth-label"
            >
              Full Name
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-person"></i>
              </span>

              <input
                id="name"
                type="text"
                className="form-control auth-input"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label
              htmlFor="registerEmail"
              className="auth-label"
            >
              Email Address
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                id="registerEmail"
                type="email"
                className="form-control auth-input"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="mb-3">
            <label
              htmlFor="dateOfBirth"
              className="auth-label"
            >
              Date of Birth
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-calendar3"></i>
              </span>

              <input
                id="dateOfBirth"
                type="date"
                className="form-control auth-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="registerPassword"
              className="auth-label"
            >
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock"></i>
              </span>

              <input
                id="registerPassword"
                type={showPassword ? "text" : "password"}
                className="form-control auth-input"
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="auth-label"
            >
              Confirm Password
            </label>

            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-lock"></i>
              </span>

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                className="form-control auth-input"
                placeholder="Confirm your password"
              />

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
              >
                <i
                  className={
                    showConfirmPassword
                      ? "bi bi-eye-slash"
                      : "bi bi-eye"
                  }
                ></i>
              </button>
            </div>
          </div>

          {/* Register */}
          <button
            type="submit"
            className="btn btn-primary auth-button w-100 mb-4"
          >
            Register
          </button>

          {/* Login */}
          <p className="text-center text-secondary small mb-0">
            Already have an account?{" "}
            <a
              href="/login"
              className="auth-link"
            >
              Login
            </a>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;