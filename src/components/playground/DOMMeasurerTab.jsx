import React, { useState, useRef, useLayoutEffect } from 'react';
import ConsoleLog from './ConsoleLog';

function DOMMeasurerTab() {
  const [size, setSize] = useState('medium');
  const [measurements, setMeasurements] = useState({ width: 0, height: 0, left: 0, top: 0 });
  const boxRef = useRef(null);

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] DOMMeasurerTab mounted. useLayoutEffect and boxRef connected."]);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      setMeasurements({
        width: w,
        height: h,
        left: Math.round(rect.left),
        top: Math.round(rect.top)
      });

      // Log synchronous execution
      const time = new Date().toLocaleTimeString();
      setLogs(prev => [`[${time}] LAYOUT_EFFECT: useLayoutEffect fired synchronously. Measured box dimensions: ${w}px x ${h}px. Aligning overlay element.`, ...prev]);
    }
  }, [size]);

  const getBoxStyle = () => {
    switch (size) {
      case 'small': return { width: '160px', height: '110px' };
      case 'large': return { width: '360px', height: '240px' };
      case 'medium':
      default:
        return { width: '250px', height: '160px' };
    }
  };

  const handleSizeChange = (s) => {
    setSize(s);
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] EVENT: Triggered size change (useState) to: "${s.toUpperCase()}"`, ...prev]);
  };

  return (
    <div className="dom-measurer-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>📐 DOM Measurer & Layout Reflow</h2>
          <p className="demo-description">Synchronously measure layout boundaries before the browser paints.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useLayoutEffect</span>
          <span className="hook-badge">useRef</span>
          <span className="hook-badge">useState</span>
        </div>
      </div>

      <div className="measurer-container">
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          {['small', 'medium', 'large'].map((s) => (
            <button
              key={s}
              onClick={() => handleSizeChange(s)}
              className={`btn-secondary-action ${size === s ? 'btn-primary-action' : ''}`}
              style={{ 
                width: 'auto', 
                textTransform: 'capitalize', 
                background: size === s ? undefined : '#e5e7eb',
                color: size === s ? '#ffffff' : '#4b5563'
              }}
            >
              {s} Size
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', border: '1px dashed #cbd5e1', borderRadius: '12px', background: '#fafafa', padding: '1rem' }}>
          <div ref={boxRef} className="interactive-box" style={getBoxStyle()}>
            <span>Target Element</span>
          </div>

          <div
            style={{
              position: 'absolute',
              background: '#0f172a',
              color: '#38bdf8',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              padding: '0.4rem 0.6rem',
              borderRadius: '4px',
              fontWeight: 700,
              boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
              left: `calc(50% + ${measurements.width / 2}px - 45px)`,
              top: `calc(50% + ${measurements.height / 2}px + 10px)`,
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              transition: 'left 0.4s ease, top 0.4s ease'
            }}
          >
            Overlay: {measurements.width}px x {measurements.height}px
          </div>
        </div>

        <div className="measurement-display">
          <div className="measurement-card">
            <div style={{ fontSize: '0.75rem', color: '#60a5fa', textTransform: 'uppercase' }}>Offset Width</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{measurements.width} px</div>
          </div>
          <div className="measurement-card" style={{ background: '#ecfdf5', borderColor: '#a7f3d0', color: '#065f46' }}>
            <div style={{ fontSize: '0.75rem', color: '#34d399', textTransform: 'uppercase' }}>Offset Height</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{measurements.height} px</div>
          </div>
          <div className="measurement-card" style={{ background: '#fdf2f8', borderColor: '#fbcfe8', color: '#9d174d' }}>
            <div style={{ fontSize: '0.75rem', color: '#f472b6', textTransform: 'uppercase' }}>Bounding Left</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{measurements.left} px</div>
          </div>
        </div>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useLayoutEffect</code>: Reads exact bounding client rects synchronously and updates positions before the paint cycle, avoiding visual jumps.
          </li>
          <li>
            <code>useRef</code>: Stores a reference to the active <code>&lt;div&gt;</code> box (`boxRef`).
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DOMMeasurerTab;
