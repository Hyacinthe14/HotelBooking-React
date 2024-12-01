import React, { useState } from "react";
import "../styles/forgot-password-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const ForgotPasswordPage: React.FC = () => {
  useAuthRedirect();
  // State for alerts
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate a backend call
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    )?.value;

    if (email === "test@example.com") {
      setMessageSuccess("Password reset link sent to your email.");
      setMessageError(null);
    } else {
      setMessageError("Email not found. Please try again.");
      setMessageSuccess(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", `${x}%`);
    card.style.setProperty("--y", `${y}%`);
  };

  return (
    <div className="forgot-password-page">
      <div className="particles"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            {/* Error and Logout Alerts */}
            {false && (
              <div className="alert alert-danger animate__animated animate__shake">
                Error message here
              </div>
            )}
            {false && (
              <div className="alert alert-success animate__animated animate__bounceIn">
                Success message here
              </div>
            )}

            {/* Forgot Password Form Card */}
            <div className="card">
              <div className="card-header">
                <div className="logo-container">
                  <i className="fas fa-hotel hotel-logo"></i>
                  <div className="hotel-stars">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <div className="header-title">Forgot Password?</div>
              </div>
              <div className="card-body">
                <div className="forgot-description">
                  Enter your email address below and we'll send you instructions
                  to reset your password.
                </div>
                <form method="post" action="/forgot-password">
                  {/* Email Field */}
                  <div className="form-group mb-4">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-group mb-4">
                    <button type="submit" className="btn btn-primary">
                      Send Reset Link
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <a href="/login">
                      <i className="fas fa-arrow-left me-2"></i>Return to Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
