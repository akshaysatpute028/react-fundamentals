// About Page Component - Demonstrates useState hook for managing component state
import React, { useState } from 'react';
import '../styles/About.css';

// About component - represents the "/about" route
const About = () => {
  // useState is a React Hook that lets functional components have state
  // It returns an array: [currentValue, functionToUpdateValue]
  // 'isExpanded' is a boolean that tracks whether to show more details
  // 'setIsExpanded' is the function to update that state
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle the expanded state
  // This demonstrates event handling in React
  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle between true and false
  };

  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About This Project 🎓</h1>
        <p>A comprehensive guide to React fundamentals for beginners</p>
      </section>

      <section className="about-content">
        <h2>What is React?</h2>
        <p>
          React is a JavaScript library for building user interfaces with reusable components. It makes
          building interactive UIs painless by managing how your app looks and behaves.
        </p>

        <h2>Key Concepts Demonstrated</h2>
        <div className="concepts-list">
          <div className="concept-item">
            <strong>1. Components:</strong>
            <p>Building blocks of React apps. Each component is a JavaScript function that returns JSX.</p>
          </div>
          <div className="concept-item">
            <strong>2. JSX:</strong>
            <p>A syntax extension that lets you write HTML-like code in JavaScript. Makes code more readable.</p>
          </div>
          <div className="concept-item">
            <strong>3. Props:</strong>
            <p>Arguments passed to components. Allow parent components to pass data to child components.</p>
          </div>
          <div className="concept-item">
            <strong>4. State:</strong>
            <p>Data managed within a component. When state changes, React re-renders the component.</p>
          </div>
          <div className="concept-item">
            <strong>5. Hooks:</strong>
            <p>Functions like useState that let you add state and other features to functional components.</p>
          </div>
          <div className="concept-item">
            <strong>6. Routing:</strong>
            <p>Client-side navigation between pages using React Router. No page reloads needed.</p>
          </div>
        </div>

        {/* Interactive element demonstrating state management */}
        <div className="interactive-section">
          <h2>Try It Out! Interactive State Demo</h2>
          <p>Click the button below to see React state in action:</p>

          {/* Button that triggers toggleExpand function */}
          <button onClick={toggleExpand} className="toggle-button">
            {isExpanded ? 'Hide Details ▲' : 'Show More Details ▼'}
          </button>

          {/* Conditional rendering - this div only shows if isExpanded is true */}
          {/* This demonstrates how state changes trigger re-renders */}
          {isExpanded && (
            <div className="expanded-content">
              <h3>🎉 You Clicked It!</h3>
              <p>
                This content is conditionally rendered based on the <code>isExpanded</code> state. When you
                click the button, the state updates, and React automatically re-renders the component with the
                new content!
              </p>
              <p>
                This pattern is the core of React development: <strong>Data flows from state → Component renders → User interacts → State updates → Re-render</strong>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
