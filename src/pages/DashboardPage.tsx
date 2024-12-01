import { useState } from "react";
import "../styles/dashboard-page.scss";
import { API_URL, logout } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const DashboardPage = () => {
  const { user } = useAuthRedirect(true);

  const [uploading, setUploading] = useState(false);

  if (!user) return null;
  // const user = {
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "john.doe@example.com",
  //   phoneNumber: "1234567890",
  //   dateOfBirth: "1990-01-01",
  // };
  return (
    <div className="dashboard-page">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <i className="fas fa-hotel me-2"></i>Luxe Stays
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item dropdown language-selector">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fas fa-globe me-2"></i>
                  <span>Language</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="languageDropdown">
                  <li>
                    <a className="dropdown-item" href="?lang=en">
                      <i className="fas fa-globe me-2"></i>
                      English
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=fr">
                      <i className="fas fa-globe me-2"></i>
                      Français
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=rw">
                      <i className="fas fa-globe me-2"></i>
                      Kinyarwanda
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                </a>
              </li>





              {user?.roles?.some(role => role.name === 'ROLE_ADMIN') && (
                <li className="nav-item">
                  {/* <Link to="/users" className="nav-link"> */}
                  <a href="/users" className="nav-link">
                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                    User Management
                  </a>
                  {/* </Link> */}
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="/bookings">
                  <i className="fas fa-calendar-alt me-2"></i>My Bookings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/settings">
                  <i className="fas fa-cog me-2"></i>Settings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login" onClick={logout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="hero">
        <h1>Welcome to Your Luxe Experience</h1>
      </div>

      <div className="container dashboard-container">
        <div className="alert alert-success">
          <p>Message Success</p>
        </div>
        <div className="alert alert-danger">
          <p>Message Error</p>
        </div>

        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-user me-2"></i>Profile
                </h3>
              </div>
              <div className="card-body">
                <form 
                id="profile-picture-form"
                method="post"
                encType="multipart/form-data"
                onSubmit={(e: any) => {
                  e.preventDefault();
                  if (uploading) return;
                  const formData: any = new FormData();
                  const profilePicture = e.target.profilePicture.files[0];
                  if (!profilePicture) return;
                  formData.append("profilePicture", profilePicture);
                  formData.append("userId", user.id);
                  setUploading(true);
                  fetch(API_URL + "/uploadProfilePicture", {
                    method: "POST",
                    body: formData,
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        const localUser = localStorage.getItem("user");
                        if (!localUser) {
                          window.location.reload();
                          return;
                        }
                        const updatedUser = JSON.parse(localUser);
                        updatedUser.profilePicture = data.profilePicture;
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        alert("Profile picture uploaded successfully");
                        window.location.reload();
                      } else {
                        alert("Failed to upload profile picture");
                      }
                    })
                    .catch((err) => {
                      console.error(err);
                      alert("Failed to upload profile picture");
                    })
                    .finally(() => {
                      setUploading(false);
                    });
                }}
              >
                <div className="profile-picture-container">
                  <img
             src={
              API_URL +
              "/download-profile?fileName=" +
              user.profilePicture?.replace(/\\/g, '/')
            }
                    alt="Default Profile Picture"
                    className="profile-picture"
                    id="profile-picture-preview"
                  />
                  <label htmlFor="profile-picture-input" className="profile-picture-upload">
                    <i className="fas fa-camera"></i>
                  </label>
                  <input
                    type="file"
                    id="profile-picture-input"
                    name="profilePicture"
                    accept="image/*"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Picture"}
                </button>
                </form>

                <p>
                  <strong>Name:</strong> {user.firstName} {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.roles[0].name}
                </p>

                <div className="mt-3">
                  <a href={
              API_URL +
              "/download-profile?fileName=" +
              user.profilePicture?.replace(/\\/g, '/')
            } className="btn btn-primary">
                    <i className="fas fa-download me-2"></i>Download Profile Picture
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-header">
                <h3>
                  <i className="fas fa-calendar-check me-2"></i>Quick Booking
                </h3>
              </div>
              <div className="card-body">
                <form id="room-booking-form" method="post">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="checkIn" className="form-label">
                        Check-in Date
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-calendar-alt"></i>
                        </span>
                        <input type="date" className="form-control" id="checkIn" name="checkIn" required />
                      </div>
                      <small className="text-muted">Select your arrival date</small>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="checkOut" className="form-label">
                        Check-out Date
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-calendar-alt"></i>
                        </span>
                        <input type="date" className="form-control" id="checkOut" name="checkOut" required />
                      </div>
                      <small className="text-muted">Select your departure date</small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <select className="form-control" name="roomType" required>
                        <option value="">Select Room Type</option>
                        <option value="standard">Standard Room</option>
                        <option value="deluxe">Deluxe Room</option>
                        <option value="suite">Suite</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <input type="number" className="form-control" placeholder="Guests" name="guestCount" required />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-custom w-100">
                    <i className="fas fa-bed me-2"></i>Book Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-4 text-center">
            <i className="fas fa-concierge-bell feature-icon"></i>
            <h4>24/7 Concierge</h4>
            <p>Our staff is always ready to assist you with any request.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-spa feature-icon"></i>
            <h4>Luxurious Amenities</h4>
            <p>Enjoy our world-class spa, fitness center, and restaurants.</p>
          </div>
          <div className="col-md-4 text-center">
            <i className="fas fa-medal feature-icon"></i>
            <h4>Award-Winning Service</h4>
            <p>Experience hospitality that has won numerous accolades.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
