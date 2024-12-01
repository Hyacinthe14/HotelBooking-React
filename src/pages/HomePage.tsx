import "../styles/home-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const HomePage = () => {
  useAuthRedirect();
  const language = "en";
  return (
    <div className="home-page">
      <nav className="nav-container">
        <div className="nav-links">
          <a href="/"><ion-icon name="home-outline"></ion-icon> <span>Home</span></a>
          <a href="/search"><ion-icon name="search-outline"></ion-icon> <span>Search</span></a>
          <a href="/rooms"><ion-icon name="bed-outline"></ion-icon> <span>Rooms</span></a>
          <a href="/contact"><ion-icon name="chatbubbles-outline"></ion-icon> <span>Contact</span></a>
        </div>

        <div className="dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="languageDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span>English</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
            <li><a className="dropdown-item" href="?lang=en">English</a></li>
            <li><a className="dropdown-item" href="?lang=rw">Kinyarwanda</a></li>
            <li><a className="dropdown-item" href="?lang=fr">Français</a></li>
          </ul>
        </div>

        <div>
          <a href="/login" className="logout-btn">
            <ion-icon name="log-in-outline"></ion-icon> <span>Login</span>
          </a>
          <a href="/register" className="logout-btn" style={{ marginLeft: "10px" }}>
            <ion-icon name="person-add-outline"></ion-icon> <span>Register</span>
          </a>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-content">
          <h1>Welcome to LuxeStay</h1>
          <p>Discover comfort, luxury, and unforgettable experiences</p>
          <a href="/booking" className="cta-btn">Book Your Dream Stay</a>
        </div>
      </section>

      {/* <div className="animated-text" id="animatedText">{animatedText}</div> */}

      <section className="features">
        <div className="feature">
          <ion-icon name="wifi-outline"></ion-icon>
          <h3>Free Wi-Fi</h3>
          <p>Stay connected with high-speed internet throughout your stay.</p>
        </div>
        <div className="feature">
          <ion-icon name="restaurant-outline"></ion-icon>
          <h3>Gourmet Dining</h3>
          <p>Indulge in exquisite cuisine prepared by world-class chefs.</p>
        </div>
        <div className="feature">
          <ion-icon name="fitness-outline"></ion-icon>
          <h3>Fitness Center</h3>
          <p>Maintain your workout routine in our state-of-the-art gym.</p>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/rooms">Our Rooms</a></li>
              <li><a href="/offers">Special Offers</a></li>
              <li><a href="/location">Location</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: <a href="mailto:info@luxestay.com">info@luxestay.com</a></li>
              <li>Phone: <a href="tel:+123456789">+123 456 789</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
              <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
              <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 LuxeStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
