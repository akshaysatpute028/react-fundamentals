import React, { useState, useImperativeHandle, forwardRef } from 'react';

const AlertDrawer = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('info'); // success, info, warning

  useImperativeHandle(ref, () => ({
    openAlert(msg, type = 'info') {
      setMessage(msg);
      setAlertType(type);
      setIsOpen(true);
      if (props.onLog) {
        props.onLog(`CHILD_REF: openAlert() executed. Exposed imperative handle triggered. Payload: "${msg}"`);
      }
    },
    closeAlert() {
      setIsOpen(false);
      if (props.onLog) {
        props.onLog("CHILD_REF: closeAlert() executed via exposed Ref handle.");
      }
    }
  }));

  const getAlertEmoji = () => {
    switch (alertType) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`drawer-backdrop ${isOpen ? 'open' : ''}`} onClick={() => {
      setIsOpen(false);
      if (props.onLog) props.onLog("CHILD_EVENT: Backdrop clicked. Closing drawer state.");
    }}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <div className="drawer-header">
            <h3 className="drawer-title">
              <span>{getAlertEmoji()} System Notification</span>
            </h3>
          </div>
          
          <div className="drawer-body">
            <p style={{ margin: 0, fontWeight: 500 }}>Message Payload:</p>
            <div className={`drawer-alert-status ${alertType}`}>
              {message || "No warning code loaded."}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '1.5rem', lineHeight: 1.5 }}>
              This slide-out drawer was opened by the parent calling <code>ref.current.openAlert()</code> imperatively.
            </p>
          </div>
        </div>

        <button onClick={() => {
          setIsOpen(false);
          if (props.onLog) props.onLog("CHILD_EVENT: Close button clicked in drawer.");
        }} className="btn-primary-action" style={{ background: '#ef4444' }}>
          Close Drawer ✖
        </button>
      </div>
    </div>
  );
});

export default AlertDrawer;
