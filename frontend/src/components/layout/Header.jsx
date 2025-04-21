import React from 'react';
import { Link } from 'react-router-dom';
// import { useUser } from '../../context/UserContext'; // Import when auth is needed
import './Header.css'; // We'll create this CSS file next

function Header() {
  // const { user, logout } = useUser(); // Get user state later

  return (
    <header className="app-header">
      <div className="container header-container">
        <Link to="/" className="logo">
          Video Funnel
        </Link>
        <nav className="main-nav">
          {/* Desktop Navigation Placeholder */}
          <ul className="nav-links-desktop">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/training-videos">Training</Link></li>
            {/* Add more links as needed */}
            {/* Example Auth Links:
            {user ? (
              <li><button onClick={logout}>Logout</button></li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
            */}
          </ul>
          {/* Mobile Navigation Placeholder (Hamburger Menu) */}
          <button className="nav-toggle-mobile" aria-label="Toggle navigation">
            {/* Hamburger icon */}
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
      {/* Mobile Menu Overlay (Hidden by default) */}
      {/* <div className="mobile-menu-overlay"> ... </div> */}
    </header>
  );
}

export default Header;