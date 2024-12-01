import React, { useState, useEffect } from "react";
import "../styles/edit-profile-page.scss";
import { API_URL, logout } from "../utils/constants";
import { useParams } from "react-router-dom";
import useAuthRedirect from "../utils/useAuthRedirect";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
}

const ProfileEditPage: React.FC = () => {
  useAuthRedirect(true);
  const [user, setUser] = useState<User | null>(null);

  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(API_URL + "/users/" + id)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch(() => setErrorMessage("User not found"))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (submitting) return;
    setErrorMessage("");

    if (user) {
      setSubmitting(true);
      fetch(API_URL + `/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setMessage("Your profile has been updated successfully!");
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage("Failed to update profile");
        })
        .finally(() => setSubmitting(false));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser!, [name]: value }));
    }
  };

  return (
    <div className="edit-profile-page">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            <ion-icon name="bed-outline"></ion-icon> HotelHub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  <ion-icon name="home-outline"></ion-icon> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  <ion-icon name="person-outline"></ion-icon> Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  <ion-icon name="log-out-outline"></ion-icon> Logout
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Language
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="languageDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="?lang=en">
                      English
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=rw">
                      Kinyarwanda
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=fr">
                      Français
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <h2>Edit Profile</h2>
          </div>

          <div className="alert alert-info" style={{ display: "none" }}>
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            Your profile has been updated successfully!
          </div>

          <form method="post" action="/users/update/{id}">
            <input type="hidden" name="id" />

            <div className="row">
              <div className="col-md-6">
                <div className="form-group icon-input">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder=" "
                  />
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <ion-icon name="person-outline"></ion-icon>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group icon-input">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder=" "
                  />
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <ion-icon name="person-outline"></ion-icon>
                </div>
              </div>
            </div>

            <div className="form-group icon-input">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                readOnly
                placeholder=" "
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <ion-icon name="mail-outline"></ion-icon>
            </div>

            <div className="form-group icon-input">
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                required
                placeholder=" "
              />
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <ion-icon name="call-outline"></ion-icon>
            </div>

            <div className="form-group icon-input">
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                required
              />
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
            </div>

            <button type="submit" className="btn-update">
              Update Profile
            </button>
            <a href="/users" className="btn-cancel">
              Cancel
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
