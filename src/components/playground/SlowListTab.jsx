import React, { useState, useEffect, useTransition, useDeferredValue } from 'react';
import ConsoleLog from './ConsoleLog';

// Slow List Dataset
const ITEMS_COUNT = 5000;
const SLOW_DATASET = Array.from({ length: ITEMS_COUNT }, (_, index) => ({
  id: index,
  name: `Item #${index + 1} - Product Detail Category ID ${Math.round((index * 13) % 97)}`,
  serialCode: `SRL-${(index * 997 + 100000).toString(16).toUpperCase()}`
}));

// Slow List Heavy Item Renderer (Child Component)
function HeavyListItem({ name, serialCode }) {
  // Artificial slowdown: Perform a short loop to simulate heavy rendering/painting calculations
  const start = performance.now();
  while (performance.now() - start < 0.25) {
    // Artificial blocking CPU cycle
  }

  return (
    <div className="slow-list-item">
      <div style={{ fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontFamily: 'monospace' }}>{serialCode}</div>
    </div>
  );
}

function SlowListTab() {
  const [query, setQuery] = useState('');
  const [optMode, setOptMode] = useState('transition'); 
  const [isPending, startTransition] = useTransition();
  const [transitionedQuery, setTransitionedQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] SlowListTab mounted. Simulated 5,000 latency entries mapped."]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const getFilterQuery = () => {
    if (optMode === 'none') return query;
    if (optMode === 'deferred') return deferredQuery;
    return transitionedQuery;
  };

  const activeQuery = getFilterQuery();

  const filteredList = SLOW_DATASET.filter(item =>
    item.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
    item.serialCode.toLowerCase().includes(activeQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    addLog(`EVENT: Immediate state query updated to: "${val}"`);

    if (optMode === 'transition') {
      addLog("TRANSITION: startTransition executed. Deferring heavy list rendering...");
      startTransition(() => {
        setTransitionedQuery(val);
      });
    } else {
      setTransitionedQuery(val);
    }
  };

  // Log transition completions
  useEffect(() => {
    if (optMode === 'transition' && transitionedQuery) {
      addLog(`TRANSITION: Deferred state transitionedQuery settled to: "${transitionedQuery}"`);
    }
  }, [transitionedQuery, optMode]);

  // Log useDeferredValue settlements
  useEffect(() => {
    if (optMode === 'deferred' && deferredQuery) {
      addLog(`DEFERRED_VALUE: useDeferredValue resolved to: "${deferredQuery}"`);
    }
  }, [deferredQuery, optMode]);

  const handleModeChange = (mode) => {
    setOptMode(mode);
    setTransitionedQuery(query);
    addLog(`EVENT: Optimization mode toggled to: "${mode.toUpperCase()}"`);
  };

  const isDeferredUpdating = optMode === 'deferred' && deferredQuery !== query;

  return (
    <div className="slow-list-tab-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>⚡ Concurrent Rendering & Lag Prevention</h2>
          <p className="demo-description">Maintain a high input response rate even when rendering huge datasets.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useTransition</span>
          <span className="hook-badge">useDeferredValue</span>
          <span className="hook-badge">useState</span>
        </div>
      </div>

      <div className="lag-explanation">
        <strong>💡 Performance Test:</strong> We generated <strong>{ITEMS_COUNT} mock items</strong>, artificial latency is injected per render. 
        Toggle the optimization mode and type in the input. Notice the lag difference!
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          onClick={() => handleModeChange('transition')}
          className={`btn-secondary-action ${optMode === 'transition' ? 'btn-primary-action' : ''}`}
          style={{ width: 'auto', background: optMode === 'transition' ? '#10b981' : undefined }}
        >
          🚀 useTransition
        </button>
        <button
          onClick={() => handleModeChange('deferred')}
          className={`btn-secondary-action ${optMode === 'deferred' ? 'btn-primary-action' : ''}`}
          style={{ width: 'auto', background: optMode === 'deferred' ? '#6366f1' : undefined }}
        >
          ⏱️ useDeferredValue
        </button>
        <button
          onClick={() => handleModeChange('none')}
          className={`btn-secondary-action ${optMode === 'none' ? 'btn-primary-action' : ''}`}
          style={{ width: 'auto', background: optMode === 'none' ? '#ef4444' : undefined }}
        >
          ⚠️ Unoptimized
        </button>
        
        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>
          Mode: {optMode === 'transition' ? (
            <span style={{ color: '#10b981' }}>useTransition Active</span>
          ) : optMode === 'deferred' ? (
            <span style={{ color: '#6366f1' }}>useDeferredValue Active</span>
          ) : (
            <span style={{ color: '#ef4444' }}>No Optimization (Keystrokes will lag!)</span>
          )}
        </span>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search product list (e.g. type '12', 'SRL', or 'Item')..."
          className="list-filter-input"
        />
        {(isPending || isDeferredUpdating) && (
          <div className="transition-pending-alert" style={{ position: 'absolute', right: '15px', top: '15px' }}>
            <div className="spinner" style={{ borderColor: isDeferredUpdating ? 'rgba(99, 102, 241, 0.25)' : undefined, borderTopColor: isDeferredUpdating ? '#6366f1' : undefined }}></div>
            <span style={{ color: isDeferredUpdating ? '#6366f1' : undefined }}>Filtering...</span>
          </div>
        )}
      </div>

      <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
        <span>Showing {filteredList.length} of {ITEMS_COUNT} entries</span>
        {optMode === 'transition' && transitionedQuery !== query && (
          <span style={{ color: '#10b981' }}>UI is typing ahead, list is updating asynchronously...</span>
        )}
        {optMode === 'deferred' && isDeferredUpdating && (
          <span style={{ color: '#6366f1' }}>List is updating lazily in background...</span>
        )}
      </div>

      <div className="slow-list-container">
        {filteredList.length > 0 ? (
          filteredList.map(item => (
            <HeavyListItem key={item.id} name={item.name} serialCode={item.serialCode} />
          ))
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
            No matching items found.
          </div>
        )}
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box" style={{ borderLeftColor: '#10b981' }}>
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useTransition</code>: Splits state priorities into high (input text box) and low (filtering the large list) updates, keeping typing fluid.
          </li>
          <li>
            <code>useDeferredValue</code>: Defers heavy sub-tree renders, running updates asynchronously off the main thread.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SlowListTab;
export { HeavyListItem, SLOW_DATASET };
