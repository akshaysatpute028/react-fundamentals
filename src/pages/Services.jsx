// Services Page Component - Demonstrates array rendering using map()
import React, { useState } from 'react';
import '../styles/Services.css';

// Services component - represents the "/services" route
const Services = () => {
  const [services] = useState([
    {
      id: 1,
      title: 'Component Mastery',
      description: 'Learn how to build reusable components that form the foundation of React applications.',
      icon: '⚛️',
      details: 'Components are reusable JavaScript functions that return JSX. There are two types: Functional and Class components. Modern React uses Functional components with Hooks.',
      example: `function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}`,
      keyPoints: [
        'Components are reusable UI building blocks',
        'Props allow data to flow from parent to child',
        'Components should have a single responsibility',
        'Use functional components with hooks (modern React)'
      ],
      realWorldUse: 'Netflix uses component-based architecture for their UI library. Reusable components like buttons, cards, and modals save development time.'
    },
    {
      id: 2,
      title: 'State Management',
      description: 'Master useState and other hooks for managing component state effectively.',
      icon: '🎯',
      details: 'State is data that changes over time. The useState hook lets functional components use state. State updates trigger re-renders.',
      example: `const [count, setCount] = useState(0);

function Counter() {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
      keyPoints: [
        'useState returns an array with [value, setter]',
        'State updates should be immutable',
        'Each setState call triggers a re-render',
        'Use multiple useState calls for multiple state variables'
      ],
      realWorldUse: 'Shopping carts use state to track items. Form inputs use state to track user input. Notifications use state to show/hide.'
    },
    {
      id: 3,
      title: 'Routing Mastery',
      description: 'Build single-page applications with client-side routing using React Router.',
      icon: '🛣️',
      details: 'React Router enables navigation between different views without full page reloads. Use Routes and Route components to define paths.',
      example: `<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/user/:id" element={<UserProfile />} />
  </Routes>
</Router>`,
      keyPoints: [
        'Routing enables single-page navigation',
        'Route parameters allow dynamic URLs',
        'Link component prevents page reload',
        'useNavigate hook for programmatic navigation'
      ],
      realWorldUse: 'Gmail, Google Drive, and Facebook all use routing. Users navigate sections without page refresh, providing a smooth app-like experience.'
    },
    {
      id: 4,
      title: 'Props & Communication',
      description: 'Master passing data between components using props and component composition.',
      icon: '📤',
      details: 'Props are arguments passed to React components. Data flows downward (parent to child). Use callbacks to communicate back up.',
      example: `// Parent Component
<Child name="Alice" age={25} onUpdate={handleUpdate} />

// Child Component
function Child({ name, age, onUpdate }) {
  return (
    <div>
      <h1>{name}, age {age}</h1>
      <button onClick={() => onUpdate('new-value')}>Update</button>
    </div>
  );
}`,
      keyPoints: [
        'Props flow from parent to child (unidirectional)',
        'Props are read-only in child components',
        'Pass functions as props to handle child events',
        'Destructure props for cleaner code'
      ],
      realWorldUse: 'Airbnb passes property data through components. Amazon passes product info as props to render thousands of listings.'
    },
    {
      id: 5,
      title: 'Event Handling',
      description: 'Learn how React handles user interactions: clicks, form submissions, keyboard events.',
      icon: '🖱️',
      details: 'React events are similar to DOM events but use camelCase syntax. Event handlers receive a SyntheticEvent object.',
      example: `function Form() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleClick}>
      <button type="submit">Submit</button>
    </form>
  );
}`,
      keyPoints: [
        'React event handlers use camelCase (onClick, not onclick)',
        'Pass function reference or arrow function',
        'Use e.preventDefault() to prevent default behavior',
        'SyntheticEvent is React\'s cross-browser event wrapper'
      ],
      realWorldUse: 'Form submissions, button clicks, keyboard shortcuts. YouTube uses event handling for video controls.'
    },
    {
      id: 6,
      title: 'Best Practices',
      description: 'Industry-standard patterns and conventions for writing clean, maintainable React code.',
      icon: '✨',
      details: 'Follow established patterns to write code that is easy to maintain, test, and scale. Code should be readable and follow React philosophy.',
      example: `// Good: Meaningful component name, clear logic
function UserProfileCard({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  if (!user) return <Loading />;
  return <div>{user.name}</div>;
}`,
      keyPoints: [
        'Keep components focused and single-responsibility',
        'Use meaningful names for components and variables',
        'Lift state up when needed by multiple children',
        'Memoize expensive computations with useMemo',
        'Use useCallback for event handlers in lists'
      ],
      realWorldUse: 'Google, Facebook, and Airbnb all follow React best practices. This ensures code quality, team efficiency, and reduced bugs.'
    },
  ]);

  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="services-container">
      <section className="services-header">
        <h1>Our Services 🛠️</h1>
        <p>Comprehensive React learning paths designed for beginners</p>
      </section>

      <section className="services-content">
        <p className="intro-text">
          We offer targeted learning modules covering all aspects of modern React development:
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <button
                className="service-button"
                onClick={() => setSelectedService(service)}
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="services-info">
        <h2>Why These Topics Matter?</h2>
        <div className="info-grid">
          <div className="info-box">
            <h3>Career Ready</h3>
            <p>These are skills demanded by 95% of React job postings. Master them and you're job-ready.</p>
          </div>
          <div className="info-box">
            <h3>Real-World Skills</h3>
            <p>Used in production applications at companies like Netflix, Facebook, Airbnb, and more.</p>
          </div>
          <div className="info-box">
            <h3>Progressive Learning</h3>
            <p>Start with basics and progress to advanced concepts. Each service builds on previous knowledge.</p>
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedService(null)}>✕</button>

            <div className="modal-header">
              <span className="modal-icon">{selectedService.icon}</span>
              <h2>{selectedService.title}</h2>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>Overview</h3>
                <p>{selectedService.details}</p>
              </div>

              <div className="modal-section">
                <h3>Code Example</h3>
                <pre className="code-block"><code>{selectedService.example}</code></pre>
              </div>

              <div className="modal-section">
                <h3>Key Points</h3>
                <ul className="key-points">
                  {selectedService.keyPoints.map((point, idx) => (
                    <li key={idx}>✓ {point}</li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h3>Real-World Usage</h3>
                <p className="real-world">{selectedService.realWorldUse}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;