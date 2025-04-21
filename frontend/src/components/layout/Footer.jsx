import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // We'll create this CSS file next

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container footer-container">
        <div className="footer-section links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/training-videos">Training Videos</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li> {/* Example link */}
            <li><Link to="/terms-of-service">Terms of Service</Link></li> {/* Example link */}
          </ul>
        </div>
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:support@example.com">support@example.com</a></p>
          {/* Add more contact info if needed */}
        </div>
        <div className="footer-section social-section">
          <h4>Follow Us</h4>
          {/* Add social media icons/links here */}
          <a href="#" aria-label="Facebook">FB</a> |
          <a href="#" aria-label="Twitter">TW</a> |
          <a href="#" aria-label="LinkedIn">LI</a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} Video Funnel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;