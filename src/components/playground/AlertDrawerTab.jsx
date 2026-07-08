import React, { useState, useRef } from 'react';
import AlertDrawer from './AlertDrawer';
import ConsoleLog from './ConsoleLog';

function AlertDrawerTab() {
  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] AlertDrawerTab mounted. forwardRef configured on child AlertDrawer."]);
  const drawerRef = useRef(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const triggerDrawer = (msg, type) => {
    addLog(`PARENT: Button clicked. Calling ref.current.openAlert() imperatively.`);
    if (drawerRef.current) {
      drawerRef.current.openAlert(msg, type);
    }
  };

  const handleChildAction = (msg) => {
    addLog(msg);
  };

  return (
    <div className="alert-drawer-tab-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>🎛️ Imperative Handles & Portals</h2>
          <p className="demo-description">Communicate imperatively with child components using custom Ref interfaces.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useImperativeHandle</span>
          <span className="hook-badge">forwardRef</span>
          <span className="hook-badge">useRef</span>
        </div>
      </div>

      <div className="playground-card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h3 style={{ fontWeight: 800, marginBottom: '1rem' }}>Exposing Imperative API Control</h3>
        <p style={{ color: '#6b7280', maxWidth: '600px', margin: '0 auto 2rem auto', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Normally, data flows down via props. Click the buttons below to drive the child drawer ref.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <button 
            onClick={() => triggerDrawer("Action completed successfully! Records updated in data center.", "success")} 
            className="btn-primary-action"
            style={{ width: 'auto', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}
          >
            ✅ Success Alert
          </button>
          
          <button 
            onClick={() => triggerDrawer("Connection latency detected. Retrying handshake protocol.", "warning")} 
            className="btn-primary-action"
            style={{ width: 'auto', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}
          >
            ⚠️ Warning Alert
          </button>

          <button 
            onClick={() => triggerDrawer("System diagnostics loaded. Node version v19.2.6 online.", "info")} 
            className="btn-primary-action"
            style={{ width: 'auto', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' }}
          >
            ℹ️ Information Alert
          </button>
        </div>
      </div>

      {/* Exposes callback to log events back to the parent */}
      <AlertDrawer ref={drawerRef} onLog={handleChildAction} />

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>forwardRef</code>: Passes refs from parents to custom child elements.
          </li>
          <li>
            <code>useImperativeHandle</code>: Controls and maps custom controller methods on parent ref calls, shielding children states.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AlertDrawerTab;
