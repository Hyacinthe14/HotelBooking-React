import React, { useState } from "react";
import "../styles/login-page.scss";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

// Declare all variables explicitly to avoid potential runtime errors
const LoginPage = () => {
  useAuthRedirect();

  // State for user credentials
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // State for error display and loading state
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use search parameters for logout or error messages
  const [params] = useSearchParams();
  const logout = params.get("logout") || ""; // Default to an empty string if null

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Handle input change for email and password
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    // Validate input
    if (!user.email || !user.password) {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      } else {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <section>
          <form id="loginform" onSubmit={handleSubmit}>
            <h1>Luxe Stays Access</h1>

            {/* Error and Success Messages */}
            {new URLSearchParams(window.location.search).get("error") && (
              <div className="alert alert-danger">Invalid Email or Password</div>
            )}
            {logout && (
              <div className="alert alert-success">You have been logged out.</div>
            )}

            <div className="inputbox">
              <ion-icon name="person-outline"></ion-icon>
              <input
                type="text"
                id="username"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                placeholder=""
              />
              <label htmlFor="username">Email</label>
            </div>
            <div className="inputbox">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                placeholder=""
              />
              <ion-icon
                id="toggle-password-icon"
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                onClick={togglePasswordVisibility}
              ></ion-icon>
              <label htmlFor="password">Password</label>
            </div>

            <div className="register">
              <p>
                <a href="/forgot-password">Forgot Password?</a>
              </p>
            </div>
            <button id="login-button" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </button>
            <div className="register">
              <p>
                Don't have an account? <a href="/register">Register!!</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
