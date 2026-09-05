import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import AuthBrandPanel from "../../../components/auth/AuthBrandPanel";
import authService from "../../../services/auth/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSucess("")

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    console.log("Forgot password email:", email);
    try{
        const response = await authService.forgotPassword(email);
        console.log(response)
        setSucess(response.message);
    }catch(error){
        console.log(error)
    }

  };

  return (
   
    <AuthLayout
      brandPanel={
        <AuthBrandPanel variant="forgot-password" />
      }
    >
      <div className="auth-form">
        {/* Icon */}
        <div className="text-center mb-4">
          <div className="forgot-password-icon">
            <i className="bi bi-lock-fill"></i>
          </div>
        </div>

        {/* Heading */}
        <h1 className="auth-title text-center">
          Forgot Password?
        </h1>

        <p className="auth-subtitle text-center">
          Enter your registered email address
          <br />
          and we will send you a reset link.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="auth-label">
              Email Address
            </label>

            <div className="position-relative">
              <i className="bi bi-envelope auth-input-icon"></i>

              <input
                type="email"
                id="email"
                name="email"
                className={`form-control auth-input ${
                  error ? "is-invalid" : ""
                }`}
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>

            {error && (
              <div className="invalid-feedback d-block">
                {error}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn auth-button w-100"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-4">
          <Link to="/login" className="auth-link">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;