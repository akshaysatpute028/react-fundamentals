import React, { useState, useEffect } from 'react';
import ConsoleLog from './ConsoleLog';
import { useTheme } from '../../context/ThemeContext';

function ThemeSettingsTab() {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] ThemeSettingsTab mounted. useContext subscribed to ThemeContext."]);

  // Log re-renders when the context theme value updates
  useEffect(() => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] CONTEXT: Theme dark mode is now: ${isDarkMode ? 'ON (Dark)' : 'OFF (Light)'}. Entire tab re-rendered from Context.`, ...prev]);
  }, [isDarkMode]);

  const handleToggle = () => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] CONTEXT CALL: toggleTheme() function invoked.`, ...prev]);
    toggleTheme();
  };

  return (
    <div className="theme-settings-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>🎨 Theme & Context Controls</h2>
          <p className="demo-description">Interact with the application's global context state.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useContext</span>
          <span className="hook-badge">createContext</span>
        </div>
      </div>

      <div className="playground-card" style={{ backgroundColor: theme.colors.card, color: theme.colors.text, borderColor: theme.colors.border }}>
        <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Global Theme Configuration</h3>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This playground is linked directly to the application-wide <code>ThemeContext</code>. 
          Toggling the theme here updates the state in the root component, propagating changes immediately.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
          <button 
            onClick={handleToggle} 
            className="btn-primary-action"
            style={{ width: 'auto', background: theme.isDark ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
          >
            {isDarkMode ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
          </button>
          <span style={{ fontWeight: 700 }}>
            Current State: <span style={{ color: '#4f46e5' }}>{isDarkMode ? 'DARK MODE 🌙' : 'LIGHT MODE ☀️'}</span>
          </span>
        </div>

        <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', marginBottom: '0.75rem', fontWeight: 700 }}>
          Active Theme Scheme:
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
          {Object.entries(theme.colors).map(([key, val]) => (
            <div 
              key={key} 
              style={{ 
                padding: '0.75rem', 
                background: isDarkMode ? '#232323' : '#ffffff', 
                borderRadius: '8px', 
                border: `1px solid ${theme.colors.border}`, 
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', fontWeight: 600 }}>{key}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', margin: '4px 0' }}>{val}</div>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', margin: '0 auto', background: val, border: '1px solid #cbd5e1' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useContext</code>: Allows nested layout segments to immediately read preferences context without prop drilling.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ThemeSettingsTab;
