import React, { useState, useEffect } from 'react';
import ConsoleLog from './ConsoleLog';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useToggle } from '../../hooks/useToggle';
import { useDebounce } from '../../hooks/useDebounce';

function CustomHooksTab() {
  const isOnline = useOnlineStatus();
  const { width, height } = useWindowSize();
  const [toggleVal, toggleState] = useToggle(false);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 600);

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] CustomHooksTab mounted. Custom hooks instances linked."]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  // Log connectivity shifts
  useEffect(() => {
    addLog(`CUSTOM_HOOK: useOnlineStatus state changed. Net online status: ${isOnline ? 'TRUE' : 'FALSE'}`);
  }, [isOnline]);

  // Log resize events
  useEffect(() => {
    addLog(`CUSTOM_HOOK: useWindowSize resize. Dimensions: ${width}px x ${height}px`);
  }, [width, height]);

  // Log toggle state changes
  useEffect(() => {
    addLog(`CUSTOM_HOOK: useToggle toggled value -> ${toggleVal}`);
  }, [toggleVal]);

  // Log typing inputs
  useEffect(() => {
    if (searchQuery) {
      addLog(`EVENT: User typed raw input query: "${searchQuery}"`);
    }
  }, [searchQuery]);

  // Log debouncing operations
  useEffect(() => {
    if (debouncedSearch) {
      addLog(`CUSTOM_HOOK: useDebounce settled (600ms timeout complete). Value: "${debouncedSearch}". Fetch query dispatched.`);
    }
  }, [debouncedSearch]);

  const getDeviceIcon = () => {
    if (width >= 1024) return { label: 'Desktop 🖥️', color: '#3b82f6' };
    if (width >= 768) return { label: 'Tablet 📱', color: '#10b981' };
    return { label: 'Mobile 📲', color: '#ef4444' };
  };

  const device = getDeviceIcon();

  return (
    <div className="custom-hooks-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>🧩 Custom Hooks Catalog</h2>
          <p className="demo-description">Encapsulate and reuse stateful UI logic across multiple layout containers.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useOnlineStatus</span>
          <span className="hook-badge">useWindowSize</span>
          <span className="hook-badge">useDebounce</span>
          <span className="hook-badge">useToggle</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="playground-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>📶 useOnlineStatus</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Tracks whether the browser window has active internet access.
            </p>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            borderRadius: '8px', 
            textAlign: 'center',
            fontWeight: 800,
            fontSize: '1.05rem',
            background: isOnline ? '#ecfdf5' : '#fee2e2',
            color: isOnline ? '#065f46' : '#991b1b',
            border: `1.5px solid ${isOnline ? '#a7f3d0' : '#fca5a5'}`,
            transition: 'var(--transition-smooth)'
          }}>
            {isOnline ? "🟢 Online: Connected" : "🔴 Offline: Internet Disconnected"}
          </div>
          <small style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center', display: 'block' }}>
            Try disabling your internet connection to inspect the badge shift in real-time.
          </small>
        </div>

        <div className="playground-card">
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>📏 useWindowSize</h3>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>
            Tracks responsive browser window viewport dimensions on resizing.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.8rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Device Category:</span>
              <span style={{ fontWeight: 800, color: device.color }}>{device.label}</span>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 700 }}>Width</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a' }}>{width} px</div>
              </div>
              <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 700 }}>Height</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e3a8a' }}>{height} px</div>
              </div>
            </div>
          </div>
        </div>

        <div className="playground-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>🔀 useToggle</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Reusable toggle handler hook to track simple open/close visibility flags.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={toggleState} className="btn-primary-action" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
              {toggleVal ? "Hide Drawer Overlay ✖" : "Show Drawer Overlay ➔"}
            </button>

            {toggleVal && (
              <div style={{ background: '#f5f3ff', border: '1px solid #c084fc', padding: '1rem', borderRadius: '8px', color: '#6b21a8', fontSize: '0.9rem', fontWeight: 600 }}>
                👋 Hello! This popup modal block was toggled using the custom <code>useToggle</code> state array.
              </div>
            )}
          </div>
        </div>

        <div className="playground-card" style={{ gridColumn: 'span 2' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>⏱️ useDebounce API Optimizer</h3>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.25rem' }}>
            Delays search state update triggers to prevent flooding API endpoints on every keystroke.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700 }}>Search Input</label>
              <input
                type="text"
                placeholder="Type query to trigger API..."
                className="input-field"
                style={{ marginTop: 4 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem' }}>
                <div style={{ background: '#f8fafc', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>Immediate Val:</div>
                  <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>{searchQuery || '—'}</div>
                </div>
                <div style={{ background: '#f0fdf4', padding: '0.6rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                  <div style={{ color: '#16a34a', fontWeight: 600 }}>Debounced Val (600ms):</div>
                  <div style={{ fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>{debouncedSearch || '—'}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: 4 }}>Simulated Search Actions</span>
              <div style={{ 
                flexGrow: 1, 
                background: '#1e293b', 
                color: '#34d399', 
                borderRadius: '8px', 
                padding: '0.75rem', 
                fontFamily: 'monospace', 
                fontSize: '0.75rem',
                maxHeight: '140px',
                overflowY: 'auto'
              }}>
                {debouncedSearch ? (
                  <div style={{ color: '#38bdf8' }}>[API CALL] Fetched search results for query: "{debouncedSearch}"</div>
                ) : (
                  <div style={{ color: '#64748b', fontStyle: 'italic' }}>Console: Waiting for settled typing term...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="playground-card" style={{ background: 'rgba(79, 70, 229, 0.02)', borderLeft: '5px solid #6366f1', padding: '2rem' }}>
        <h3 style={{ fontWeight: 800, fontSize: '1.3rem', color: '#111827', marginBottom: '1rem' }}>
          🍵 What is a Custom Hook? (Real-Life Analogy)
        </h3>
        
        <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: '#4b5563', marginBottom: '1.5rem' }}>
          A **Custom Hook** is a reusable piece of logic built using React's core hooks.
          Think of it like a **template recipe** that can be utilized across multiple components instead of writing the same logic repeatedly.
        </p>

        <div style={{ background: '#f5f3ff', border: '1px solid #e9d5ff', padding: '1.25rem', borderRadius: '8px', color: '#581c87', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          <strong>🍵 Tea Analogy:</strong>
          <p style={{ margin: '0.5rem 0' }}>
            Imagine making tea every day. You boil water, add tea leaves, add milk, and add sugar. 
            Instead of manually setting up these steps every single time, you write down a single recipe named <strong>"Make Tea"</strong>. 
            A custom hook behaves exactly like that recipe: you write the complex logic once, package it inside a hook, and call it anywhere.
          </p>
        </div>

        <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827', marginBottom: '0.5rem' }}>
          ⚠️ How to Identify a Need for a Custom Hook:
        </h4>
        <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: '#4b5563', margin: 0 }}>
          Ask yourself: <em>"Am I writing the same state and side-effect logic in multiple components?"</em> <br />
          If the answer is **Yes**, extract it into a custom hook. For instance, instead of duplicating authentication checks on the login page, profile portal, and navbar, bundle it inside a single <code>useAuth</code> hook.
        </p>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />
    </div>
  );
}

export default CustomHooksTab;
