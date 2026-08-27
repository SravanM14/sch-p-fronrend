import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import AuthBrandPanel from "../../../components/auth/AuthBrandPanel";
import authService from "../../../services/auth/authService";
import { getApiError } from "../../../utils/apiError";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  role: string;
}

const Register = () => {
  const navigate = useNavigate();

  // ------------------------------------
  // Form State
  // ------------------------------------

  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    role: "",
  });

  // ------------------------------------
  // UI State
  // ------------------------------------

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ------------------------------------
  // Field Errors
  // ------------------------------------

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string>
  >({});

  // ------------------------------------
  // Handle Input Change
  // ------------------------------------

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear error for the field being edited
    setFieldErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    // Clear general error
    setError("");
  };

  // ------------------------------------
  // Handle Form Submit
  // ------------------------------------

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");
    setFieldErrors({});

    // ------------------------------------
    // Client-side validation
    // ------------------------------------

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setFieldErrors({
        confirmPassword: "Passwords do not match.",
      });

      return;
    }

    try {
      setIsLoading(true);

      // ------------------------------------
      // Register API
      // ------------------------------------

      const response =
        await authService.register(formData);

      console.log(
        "REGISTER RESPONSE:",
        response
      );

      // ------------------------------------
      // Success
      // ------------------------------------

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        role: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "REGISTER ERROR:",
        error
      );

      // ------------------------------------
      // Parse API Error
      // ------------------------------------

      const apiError = getApiError(error);

      setError(apiError.message);

      setFieldErrors(
        apiError.fieldErrors
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------------
  // JSX
  // ------------------------------------

  return (
    <AuthLayout
      brandPanel={
        <AuthBrandPanel variant="register" />
      }
    >
      <div className="auth-form">

        {/* -------------------------------- */}
        {/* Title */}
        {/* -------------------------------- */}

        <h1 className="auth-title">
          Create Account 🎓
        </h1>

        <p className="auth-subtitle">
          Fill in the details to register
        </p>

        {/* -------------------------------- */}
        {/* General Error */}
        {/* -------------------------------- */}

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* -------------------------------- */}
        {/* Success */}
        {/* -------------------------------- */}

        {success && (
          <div
            className="alert alert-success"
            role="alert"
          >
            {success}
          </div>
        )}

        {/* -------------------------------- */}
        {/* Register Form */}
        {/* -------------------------------- */}

        <form onSubmit={handleSubmit}>

          {/* ============================== */}
          {/* Name */}
          {/* ============================== */}

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
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.name
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your full name"
                disabled={isLoading}
                required
              />

            </div>

            {fieldErrors.name && (
              <div className="text-danger small mt-1">
                {fieldErrors.name}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Email */}
          {/* ============================== */}

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
                value={formData.email}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.email
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
                required
              />

            </div>

            {fieldErrors.email && (
              <div className="text-danger small mt-1">
                {fieldErrors.email}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Date of Birth */}
          {/* ============================== */}

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
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.dateOfBirth
                    ? "is-invalid"
                    : ""
                }`}
                disabled={isLoading}
                required
              />

            </div>

            {fieldErrors.dateOfBirth && (
              <div className="text-danger small mt-1">
                {fieldErrors.dateOfBirth}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Role */}
          {/* ============================== */}

          <div className="mb-3">

            <label
              htmlFor="role"
              className="auth-label"
            >
              Role
            </label>

            <div className="input-group">

              <span className="input-group-text bg-white">
                <i className="bi bi-person-badge"></i>
              </span>

              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`form-select auth-input ${
                  fieldErrors.role
                    ? "is-invalid"
                    : ""
                }`}
                disabled={isLoading}
                required
              >
                <option value="">
                  Select your role
                </option>

                <option value="ADMIN">
                  ADMIN
                </option>

                <option value="TEACHER">
                  TEACHER
                </option>

                <option value="PARENT">
                  PARENT
                </option>
              </select>

            </div>

            {fieldErrors.role && (
              <div className="text-danger small mt-1">
                {fieldErrors.role}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Password */}
          {/* ============================== */}

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
                value={formData.password}
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.password
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Create a password"
                disabled={isLoading}
                required
              />

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowPassword(
                    (value) => !value
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

            {fieldErrors.password && (
              <div className="text-danger small mt-1">
                {fieldErrors.password}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Confirm Password */}
          {/* ============================== */}

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
                name="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                value={
                  formData.confirmPassword
                }
                onChange={handleChange}
                className={`form-control auth-input ${
                  fieldErrors.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
                placeholder="Confirm your password"
                disabled={isLoading}
                required
              />

              <button
                type="button"
                className="btn btn-light border"
                onClick={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
                disabled={isLoading}
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

            {fieldErrors.confirmPassword && (
              <div className="text-danger small mt-1">
                {fieldErrors.confirmPassword}
              </div>
            )}

          </div>

          {/* ============================== */}
          {/* Submit */}
          {/* ============================== */}

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
                ></span>

                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* ============================== */}
          {/* Login Link */}
          {/* ============================== */}

          <p className="text-center text-secondary small mb-0">

            Already have an account?{" "}

            <Link
              to="/login"
              className="auth-link"
            >
              Login
            </Link>

          </p>

        </form>

      </div>
    </AuthLayout>
  );
};

export default Register;