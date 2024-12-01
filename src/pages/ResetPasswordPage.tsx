import React, { useState } from "react";
import "../styles/reset-password-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const ResetPassword: React.FC = () => {
  useAuthRedirect();
  // State for alerts
  const [messageError, setMessageError] = useState<string | null>(null);
  const [messageSuccess, setMessageSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const confirmPassword = (
      form.elements.namedItem("confirmPassword") as HTMLInputElement
    ).value;

    if (password !== confirmPassword) {
      setMessageError("Passwords do not match!");
      setMessageSuccess(null);
    } else {
      setMessageError(null);
      setMessageSuccess("Your password has been reset successfully!");
    }
  };

  return (
    <div className="reset-password-page">
      <div className="particles">
        {/* Generated particles will be inserted here */}
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            {/* Error and Logout Alerts */}
            {messageError && (
              <div className="alert alert-danger animate__animated animate__shake">
                {messageError}
              </div>
            )}
            {messageSuccess && (
              <div className="alert alert-success animate__animated animate__bounceIn">
                {messageSuccess}
              </div>
            )}

            {/* Reset Password Form Card */}
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
                <div className="header-title">Reset Your Password</div>
              </div>
              <div className="card-body">
                <form method="post" onSubmit={handleSubmit}>
                  {/* Password Field */}
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter your new password"
                      required
                    />
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm your new password"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-group mb-4">
                    <button type="submit" className="btn btn-primary">
                      Reset Password
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <a href="/login">Return to Login</a>
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

export default ResetPassword;
