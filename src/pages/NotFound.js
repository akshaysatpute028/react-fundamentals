// NotFound (404) Page Component - Shows when user visits an undefined route
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

// NotFound component - represents routes that don't exist (catch-all route)
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        {/* Large 404 error code */}
        <h1 className="not-found-code">404</h1>

        {/* Error message */}
        <h2 className="not-found-title">Page Not Found 😕</h2>
        <p className="not-found-message">
          Oops! The page you're looking for doesn't exist. This happens when you try to visit a route that
          isn't defined in our routing configuration.
        </p>

        {/* Educational note for beginners */}
        <div className="learning-note">
          <h3>Learning Moment 🎓</h3>
          <p>
            In React Router, we use a catch-all route (<code>path="*"</code>) to handle undefined routes. This
            component shows that React can display different content based on the current URL, even when that
            URL doesn't explicitly exist as a page.
          </p>
        </div>

        {/* Navigation links to get back */}
        <div className="not-found-links">
          <p>Let's get you back on track:</p>
          <Link to="/" className="link-button">
            🏠 Go to Home Page
          </Link>
          <Link to="/services" className="link-button">
            🛠️ Browse Services
          </Link>
          <Link to="/contact" className="link-button">
            📧 Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
