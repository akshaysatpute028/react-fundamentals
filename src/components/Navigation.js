// Navigation Component - This is a simple navbar using React Router's Link component
// Navigation allows users to move between different pages without reloading the page
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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

        {/* Navigation links - NavLink is from React Router and automatically handles active class */}
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-link">
              Services
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/advanced-patterns" className="nav-link">
              Advanced Patterns
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/playground" className="nav-link">
              Playground
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
