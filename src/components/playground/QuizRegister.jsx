import React, { useState } from 'react';

/**
 * QuizRegister Subcomponent
 * Manages user registration/login flow for the Hooks Quiz tab.
 * Uses local useState to manage input states, validations, and log events.
 */
function QuizRegister({ onRegister, addLog }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Enter a valid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addLog("EVENT: Validation failed on registration submit.");
      return;
    }

    addLog(`EVENT: Player "${name}" registered. Initializing quiz countdown timer...`);
    onRegister({ name, email });
  };

  return (
    <div className="quiz-register">
      <div className="playground-card">
        <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Enter Player Details</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Player Name</label>
            <input
              type="text"
              placeholder="e.g. Akshay Satpute"
              className={`input-field ${errors.name ? 'input-error' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: null }));
                addLog(`EVENT: Form input 'name' changed to: "${e.target.value}"`);
              }}
            />
            {errors.name && (
              <small style={{ color: '#ef4444', marginTop: 4, display: 'block' }}>
                {errors.name}
              </small>
            )}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: null }));
                addLog(`EVENT: Form input 'email' changed to: "${e.target.value}"`);
              }}
            />
            {errors.email && (
              <small style={{ color: '#ef4444', marginTop: 4, display: 'block' }}>
                {errors.email}
              </small>
            )}
          </div>

          <button type="submit" className="btn-primary-action">
            Register & Start Quiz →
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizRegister;
