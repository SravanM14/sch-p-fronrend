import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import AuthBrandPanel from "../../../components/auth/AuthBrandPanel";
import authService from "../../../services/auth/authService";
import { getApiError } from "../../../utils/apiError";
import useAuthStore from "../../../store/auth/authStore";

// --------------------------------------------------
// Types
// --------------------------------------------------

export interface LoginForm {
  email: string;
  password: string;
}

// --------------------------------------------------
// Login Component
// --------------------------------------------------

const Login = () => {
  // ------------------------------------------------
  // Form State
  // ------------------------------------------------

  const [loginFormData, setLoginFormData] =
    useState<LoginForm>({
      email: "",
      password: "",
    });

  // ------------------------------------------------
  // UI State
  // ------------------------------------------------

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  // ------------------------------------------------
  // Error / Success State
  // ------------------------------------------------

  // General API error
  const [error, setError] = useState("");

  // Field-level validation errors
  const [fieldErrors, setFieldErrors] =
    useState<Record<string, string>>({});

  // Success message
  const [success, setSuccess] = useState("");

  // ------------------------------------------------
  // Client-side Validation
  // ------------------------------------------------

  const validateLoginForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate email
    if (!loginFormData.email.trim()) {
      errors.email = "Email is required.";
    }

    // Validate password
    if (!loginFormData.password.trim()) {
      errors.password = "Password is required.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // ------------------------------------------------
  // Handle Input Change
  // ------------------------------------------------

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    // Update form state
    setLoginFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear field error when user starts typing
    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    // Clear general error
    setError("");
  };

  // ------------------------------------------------
  // Handle Login Submit
  // ------------------------------------------------

   const setAuth = useAuthStore((state)=> state.setAuth)

  const user = useAuthStore((state)=> state.user)
  const isAuthenticated = useAuthStore((state)=> state.isAuthenticated)
      console.log("isUser :",user)
      console.log("isAuthenticated :",isAuthenticated)
    

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");
    setFieldErrors({});

    // ----------------------------------------------
    // Client-side validation
    // ----------------------------------------------

    if (!validateLoginForm()) {
      return;
    }

    try {
      setIsLoading(true);
      // --------------------------------------------
      // Call Login API
      // --------------------------------------------

      const response = await authService.login(loginFormData);
       console.log(response,"res")
      // --------------------------------------------
      // Login Success
      // --------------------------------------------
     setAuth(response.data.user, response.data.accessToken, response.data.refreshToken)
      setSuccess("Login successful.");
       console.log("isUser :",user)
      console.log("isAuthenticated :",isAuthenticated)
    } catch (err) {
      // --------------------------------------------
      // Handle API Error
      // --------------------------------------------

      const apiError = getApiError(err);

      setError(apiError.message);

      setFieldErrors(apiError.fieldErrors);
    } finally {
      // --------------------------------------------
      // Stop Loading
      // --------------------------------------------

      setIsLoading(false);
    }
  };

  // ------------------------------------------------
  // JSX
  // ------------------------------------------------

  return (
    <AuthLayout
      brandPanel={
        <AuthBrandPanel variant="login" />
      }
    >
      <div className="auth-form">

        {/* ========================================== */}
        {/* Page Title */}
        {/* ========================================== */}

        <h1 className="auth-title">
          Welcome Back! 👋
        </h1>

        <p className="auth-subtitle">
          Login to your account
        </p>

        {/* ========================================== */}
        {/* General Error */}
        {/* ========================================== */}

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* ========================================== */}
        {/* Success Message */}
        {/* ========================================== */}

        {success && (
          <div
            className="alert alert-success"
            role="alert"
          >
            {success}
          </div>
        )}

        {/* ========================================== */}
        {/* Login Form */}
        {/* ========================================== */}

        <form onSubmit={handleSubmit}>

          {/* ---------------------------------------- */}
          {/* Email */}
          {/* ---------------------------------------- */}

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
                name="email"
                type="email"
                value={loginFormData.email}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />

            </div>

            {/* Email Error */}

            {fieldErrors.email && (
              <div className="text-danger small mt-1">
                {fieldErrors.email}
              </div>
            )}

          </div>

          {/* ---------------------------------------- */}
          {/* Password */}
          {/* ---------------------------------------- */}

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
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={loginFormData.password}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your password"
                disabled={isLoading}
              />

              {/* Show / Hide Password */}

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                disabled={isLoading}
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

            {/* Password Error */}

            {fieldErrors.password && (
              <div className="text-danger small mt-1">
                {fieldErrors.password}
              </div>
            )}

          </div>

          {/* ---------------------------------------- */}
          {/* Remember Me / Forgot Password */}
          {/* ---------------------------------------- */}

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

            <Link
              to="/forgot-password"
              className="auth-link small"
            >
              Forgot Password?
            </Link>

          </div>

          {/* ---------------------------------------- */}
          {/* Login Button */}
          {/* ---------------------------------------- */}

          <button
            type="submit"
            className="btn btn-primary auth-button w-100 mb-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />

                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* ---------------------------------------- */}
          {/* Social Login Divider */}
          {/* ---------------------------------------- */}

          <div className="auth-divider mb-3">
            or continue with
          </div>

          {/* ---------------------------------------- */}
          {/* Social Login */}
          {/* ---------------------------------------- */}

          {/*
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
          */}

          {/* ---------------------------------------- */}
          {/* Register Link */}
          {/* ---------------------------------------- */}

          <p className="text-center text-secondary small mb-0">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="auth-link"
            >
              Create Account
            </Link>

          </p>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;