// Home Page Component - The landing page of our application
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

// Home component - represents the "/" route
const Home = () => {
  return (
    <div className="home-container">
      {/* Hero section - the main welcome area */}
      <section className="hero">
        <h1 className="hero-title">Welcome to React! 🚀</h1>
        <p className="hero-subtitle">
          Learn React Fundamentals with a Modern Single Page Application
        </p>
        <p className="hero-description">
          This app demonstrates core React concepts: Components, Routing, JSX, and State Management
        </p>

        {/* Call-to-action button */}
        <Link to="/services" className="cta-button">
          Explore Our Services
        </Link>
      </section>

      {/* Features section - showcase key learning points */}
      <section className="features">
        <h2>What You'll Learn 📚</h2>
        <div className="features-grid">
          {/* Feature 1: Components */}
          <div className="feature-card">
            <div className="feature-icon">⚛️</div>
            <h3>React Components</h3>
            <p>
              Reusable building blocks of React applications. Each component manages its own content and
              behavior.
            </p>
          </div>

          {/* Feature 2: Routing */}
          <div className="feature-card">
            <div className="feature-icon">🛣️</div>
            <h3>Client-Side Routing</h3>
            <p>
              Navigate between pages without full page reloads using React Router. Fast and seamless user
              experience.
            </p>
          </div>

          {/* Feature 3: State */}
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>State & Props</h3>
            <p>
              Manage data within components (state) and pass data between components (props). Core to React
              development.
            </p>
          </div>

          {/* Feature 4: JSX */}
          <div className="feature-card">
            <div className="feature-icon">💻</div>
            <h3>JSX Syntax</h3>
            <p>
              Write HTML-like syntax in JavaScript. JSX makes React components intuitive and easy to read.
            </p>
          </div>
        </div>
      </section>

      {/* CTA section - encourage further exploration */}
      <section className="cta-section">
        <h2>Ready to Dive Deeper?</h2>
        <p>Check out the About page to learn more about this project, or browse our Services.</p>
        <div className="cta-links">
          <Link to="/about" className="button button-primary">
            Learn About Us
          </Link>
          <Link to="/contact" className="button button-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
