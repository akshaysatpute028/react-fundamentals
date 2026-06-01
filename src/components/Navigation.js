// Navigation Component - This is a simple navbar using React Router's Link component
// Navigation allows users to move between different pages without reloading the page
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';
import { FaReact } from 'react-icons/fa';

// The Navigation component displays a navigation bar at the top of the page
const Navigation = () => {
  return (
    // <nav> is a semantic HTML element for navigation sections
    <nav className="navbar">
      {/* Container for logo/title */}
      <div className="nav-container">
        {/* Logo/Brand name */}
        <Link to="/" className="nav-logo">
          <FaReact className="react-logo-icon" />
          <span className="logo-text">Fundamentals</span>
        </Link>

        {/* Navigation links - Link is from React Router and prevents page reload */}
        <ul className="nav-menu">
          {/* Each Link component has a 'to' prop that specifies the route */}
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/advanced-patterns" className="nav-link">
              Advanced Patterns
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
