import React, { useState, useEffect, useId } from 'react';
import ConsoleLog from './ConsoleLog';

function AccessibleFormTab() {
  const [formData, setFormData] = useState({ username: '', email: '', agree: false });
  const [submitted, setSubmitted] = useState(false);

  const usernameId = useId();
  const usernameHelpId = useId();
  const emailId = useId();
  const emailHelpId = useId();
  const newsletterId = useId();

  // Runtime Console Logs state
  const [logs, setLogs] = useState([]);

  // Initialize unique ARIA IDs logs on mount
  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setLogs([
      `[${time}] INITIAL: useId generated unique stable string tokens: usernameId (${usernameId}), emailId (${emailId}), newsletterId (${newsletterId}). HTML elements linked successfully.`
    ]);
  }, [usernameId, emailId, newsletterId]);

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] EVENT: Field "${field}" updated to: "${val}" (useState triggered)`, ...prev]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    if (formData.username.trim() && formData.email.trim()) {
      setSubmitted(true);
      setLogs(prev => [`[${time}] EVENT: Accessible signup form validated successfully. Submitting payload.`, ...prev]);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setLogs(prev => [`[${time}] EVENT: Validation error. Required accessibility fields are empty.`, ...prev]);
    }
  };

  return (
    <div className="accessible-form-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>♿ Accessible Forms & ARIA Linking</h2>
          <p className="demo-description">Generate unique HTML elements linking IDs automatically for accessibility compliance.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useId</span>
          <span className="hook-badge">useState</span>
        </div>
      </div>

      <div className="playground-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontWeight: 800, marginBottom: '1.25rem' }}>Secure Accessible Signup</h3>
        
        {submitted && (
          <div style={{ background: '#ecfdf5', color: '#065f46', border: '1px solid #a7f3d0', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: 700, marginBottom: '1.5rem' }}>
            🎉 Form submitted successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor={usernameId} style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block' }}>
              Username
            </label>
            <input
              id={usernameId}
              type="text"
              className="input-field"
              placeholder="Enter username"
              aria-describedby={usernameHelpId}
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
            />
            <small id={usernameHelpId} style={{ display: 'block', color: '#6b7280', marginTop: 4, fontSize: '0.8rem' }}>
              This must be unique. Let other users identify you.
            </small>
            
            <div style={{ marginTop: 6, fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: '#f5f3ff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
              ℹ️ Generated usernameId: <strong>{usernameId}</strong> | helpId: <strong>{usernameHelpId}</strong>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor={emailId} style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block' }}>
              Email Address
            </label>
            <input
              id={emailId}
              type="email"
              className="input-field"
              placeholder="user@example.com"
              aria-describedby={emailHelpId}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <small id={emailHelpId} style={{ display: 'block', color: '#6b7280', marginTop: 4, fontSize: '0.8rem' }}>
              We'll never share your email address.
            </small>

            <div style={{ marginTop: 6, fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: '#f5f3ff', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
              ℹ️ Generated emailId: <strong>{emailId}</strong> | helpId: <strong>{emailHelpId}</strong>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                id={newsletterId}
                type="checkbox"
                checked={formData.agree}
                style={{ width: '16px', height: '16px', accentColor: '#4f46e5', cursor: 'pointer' }}
                onChange={(e) => handleInputChange('agree', e.target.checked)}
              />
              <label htmlFor={newsletterId} style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', userSelect: 'none' }}>
                Subscribe to weekly engineering tips
              </label>
            </div>
            
            <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#6366f1', background: '#f5f3ff', padding: '4px 8px', borderRadius: '4px', alignSelf: 'flex-start' }}>
              ℹ️ Generated newsletterId: <strong>{newsletterId}</strong>
            </div>
          </div>

          <button type="submit" className="btn-primary-action">
            Sign Up
          </button>
        </form>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useId</code>: Generates client/server stable HTML identity IDs mapping forms safely, eliminating DOM collisions.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AccessibleFormTab;
