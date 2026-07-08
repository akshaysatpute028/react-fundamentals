import React from 'react';

function ConsoleLog({ title = "🛠️ RUNTIME CONSOLE: FUNCTION CALLS & EVENTS", logs }) {
  return (
    <div className="reducer-actions-log" style={{ marginTop: '1.5rem' }}>
      <div className="reducer-log-title">{title}</div>
      {logs.length > 0 ? (
        logs.map((log, idx) => (
          <div key={idx} style={{ marginBottom: '0.25rem', color: idx === 0 ? '#38bdf8' : '#64748b' }}>
            {log}
          </div>
        ))
      ) : (
        <div style={{ color: '#64748b', fontStyle: 'italic' }}>Console: Waiting for user interactions...</div>
      )}
    </div>
  );
}

export default ConsoleLog;
