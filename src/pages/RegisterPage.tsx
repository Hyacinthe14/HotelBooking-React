import { useState } from "react";
import "../styles/register-page.scss";
import { API_URL } from "../utils/constants";
import useAuthRedirect from "../utils/useAuthRedirect";

const RegisterPage = () => {
  useAuthRedirect();
  // State for form fields and alerts
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    dateOfBirth: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: any) => {
    // useAuthRedirect();
    e.preventDefault();

    // Validate form fields
    const errors: any = {};
    if (!user.firstName) errors.firstName = "First name is required";
    if (!user.lastName) errors.lastName = "Last name is required";
    if (!user.email) errors.email = "Email is required";
    if (!user.password) errors.password = "Password is required";
    if (!user.phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!user.dateOfBirth) errors.dateOfBirth = "Date of birth is required";
    setErrors(errors);

    // If there are errors, stop processing
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    setError("");

    // If no errors, submit the form
    fetch(API_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        window.scrollTo({top:0,behavior:"smooth"});
        if (data.success) {
          setSuccess(true);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to register");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="register-page">
    <section>
    <form method="post" onSubmit={handleSubmit}>
      <h1>Book Your Dream Stay</h1>

      {/* First Name */}
      <div className="inputbox">
        <ion-icon name="person-outline"></ion-icon>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName">First Name</label>
        {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
      </div>

      {/* Last Name */}
      <div className="inputbox">
        <ion-icon name="person-outline"></ion-icon>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
      </div>

      {/* Email */}
      <div className="inputbox">
        <ion-icon name="mail-outline"></ion-icon>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email</label>
        {errors.email && <p className="text-danger">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="inputbox">
        <ion-icon name="lock-closed-outline"></ion-icon>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        {errors.password && <p className="text-danger">{errors.password}</p>}
      </div>

      {/* Phone Number */}
      <div className="inputbox">
        <ion-icon name="call-outline"></ion-icon>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          required
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber}</p>}
      </div>

      {/* Date of Birth */}
      <div className="inputbox">
        <ion-icon name="calendar-outline"></ion-icon>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={user.dateOfBirth}
          onChange={handleChange}
          required
        />
        <label htmlFor="dateOfBirth">Date of Birth</label>
        {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth}</p>}
      </div>

      <button id="submit" type="submit">
        Start Your Journey
      </button>

      {/* Social Signup Buttons */}
      <div className="social-signup">
        <button type="button" className="social-btn google-btn" title="Continue with Google">
          <ion-icon name="logo-google"></ion-icon>
        </button>
        <button type="button" className="social-btn facebook-btn" title="Continue with Facebook">
          <ion-icon name="logo-facebook"></ion-icon>
        </button>
        <button type="button" className="social-btn apple-btn" title="Continue with Apple">
          <ion-icon name="logo-apple"></ion-icon>
        </button>
      </div>

      <div className="register">
        <p>
          Already a member? <a href="/login">Sign In</a>
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="alert alert-info">
          Welcome aboard! Your account is ready for amazing stays!
        </div>
      )}
    </form>
  </section>
  </div>
  );
};

export default RegisterPage;
