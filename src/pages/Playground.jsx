// C:\Projects\react-fundamentals\src\pages\Playground.jsx
import React, { 
  useState, 
  useEffect, 
  useRef, 
  useMemo, 
  useCallback, 
  useReducer, 
  useLayoutEffect, 
  useImperativeHandle, 
  forwardRef, 
  useId, 
  useTransition, 
  useDeferredValue 
} from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/Playground.css';

// ──────────────────────────────────────────────────────────────
// 1. REUSABLE RUNTIME CONSOLE LOGGER
// ──────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────
// 2. CUSTOM HOOKS DEFINITIONS (Declared inline for self-containment)
// ──────────────────────────────────────────────────────────────

// Hook: useOnlineStatus
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Hook: useWindowSize
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Hook: useDebounce
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook: useToggle
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
}

// ──────────────────────────────────────────────────────────────
// 3. HELPER COMPONENTS & CONSTANTS
// ──────────────────────────────────────────────────────────────

// Quiz Questions Dataset
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which hook is used to perform side effects in functional components?",
    options: ["useState", "useContext", "useEffect", "useReducer"],
    correct: 2,
  },
  {
    id: 2,
    question: "Which hook can store a mutable value that does NOT trigger a re-render when changed?",
    options: ["useRef", "useState", "useMemo", "useCallback"],
    correct: 0,
  },
  {
    id: 3,
    question: "Where should React Hooks be called inside components?",
    options: [
      "Only at the top level of the component function",
      "Inside loops or conditional blocks",
      "Inside helper Javascript functions",
      "Anywhere inside the render method"
    ],
    correct: 0,
  },
  {
    id: 4,
    question: "Which hook is best suited for managing complex state structures or state transitions?",
    options: ["useState", "useReducer", "useLayoutEffect", "useImperativeHandle"],
    correct: 1,
  },
  {
    id: 5,
    question: "What does the dependency array of useEffect do?",
    options: [
      "Specifies the elements the effect should render",
      "Controls which variables trigger the effect to run when changed",
      "Defines the return value of the effect function",
      "Declares arguments passed to the functional component"
    ],
    correct: 1,
  }
];

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

// Alert Drawer Component (Child Component wrapped in forwardRef)
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

// ──────────────────────────────────────────────────────────────
// 4. PLAYGROUND TABS / DEMO PANELS
// ──────────────────────────────────────────────────────────────

// TAB 1: Quiz Tab Component
function QuizTab() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '' });
  const [formErrors, setFormErrors] = useState({});

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] QuizTab mounted. Hook States (useState) and Timer Ref (useRef) initialized."]);
  const timerRef = useRef(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errors = {};
    if (!regForm.name.trim()) errors.name = "Name is required";
    if (!regForm.email.trim() || !/\S+@\S+\.\S+/.test(regForm.email)) {
      errors.email = "Enter a valid email address";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      addLog("EVENT: Validation failed on registration submit.");
      return;
    }

    setIsRegistered(true);
    setIsPlaying(true);
    setTimeLeft(60);
    addLog(`EVENT: Player "${regForm.name}" registered. Initializing quiz countdown timer...`);
  };

  // Timer side-effect management
  useEffect(() => {
    if (isPlaying && !quizFinished) {
      addLog("EFFECT: Starting timer tick interval (useEffect hook initialized)");
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setQuizFinished(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        addLog("EFFECT: Timer tick interval cleared (useEffect cleanup executed)");
      }
    };
  }, [isPlaying, quizFinished]);

  // Log timer changes separately to avoid interval reset loops
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      addLog(`EFFECT: Timer tick -> ${timeLeft} seconds remaining.`);
    }
  }, [timeLeft, isPlaying]);

  const handleNext = () => {
    setAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));
    addLog(`EVENT: Question #${currentIdx + 1} answered. Saving state value.`);
    
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(answers[currentIdx + 1] !== undefined ? answers[currentIdx + 1] : null);
      addLog(`EVENT: Next clicked. Shifting currentIdx (useState) to ${currentIdx + 1}.`);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setQuizFinished(true);
      setIsPlaying(false);
      addLog("EVENT: Last question answered. Quiz finished. Score calculations triggered.");
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setAnswers(prev => ({ ...prev, [currentIdx]: selectedOption }));
      setCurrentIdx(currentIdx - 1);
      setSelectedOption(answers[currentIdx - 1]);
      addLog(`EVENT: Previous clicked. Shifting currentIdx to ${currentIdx - 1}.`);
    }
  };

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
    addLog(`EVENT: User selected option: "${QUIZ_QUESTIONS[currentIdx].options[idx]}"`);
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setAnswers({});
    setQuizFinished(false);
    setIsPlaying(true);
    setTimeLeft(60);
    addLog("EVENT: Restart quiz clicked. Resetting all gameState states to initial values.");
  };

  const getScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
    });
    return correctCount;
  };

  return (
    <div className="quiz-tab-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>⏱️ Interactive Hooks Quiz</h2>
          <p className="demo-description">Test your React knowledge against a ticking timer.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useState</span>
          <span className="hook-badge">useEffect</span>
          <span className="hook-badge">useRef</span>
        </div>
      </div>

      {!isRegistered && (
        <div className="quiz-register">
          <div className="playground-card">
            <h3 style={{ marginBottom: '1rem', fontWeight: 700 }}>Enter Player Details</h3>
            <form onSubmit={handleRegister} noValidate>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Player Name</label>
                <input
                  type="text"
                  placeholder="e.g. Akshay Satpute"
                  className={`input-field ${formErrors.name ? 'input-error' : ''}`}
                  value={regForm.name}
                  onChange={(e) => {
                    setRegForm({ ...regForm, name: e.target.value });
                    setFormErrors({ ...formErrors, name: null });
                    addLog(`EVENT: Form input 'name' changed to: "${e.target.value}"`);
                  }}
                />
                {formErrors.name && <small style={{ color: '#ef4444', marginTop: 4, display: 'block' }}>{formErrors.name}</small>}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className={`input-field ${formErrors.email ? 'input-error' : ''}`}
                  value={regForm.email}
                  onChange={(e) => {
                    setRegForm({ ...regForm, email: e.target.value });
                    setFormErrors({ ...formErrors, email: null });
                    addLog(`EVENT: Form input 'email' changed to: "${e.target.value}"`);
                  }}
                />
                {formErrors.email && <small style={{ color: '#ef4444', marginTop: 4, display: 'block' }}>{formErrors.email}</small>}
              </div>

              <button type="submit" className="btn-primary-action">
                Register & Start Quiz →
              </button>
            </form>
          </div>
        </div>
      )}

      {isRegistered && isPlaying && !quizFinished && (
        <div className="quiz-active">
          <div className="quiz-header">
            <div>
              <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>
                Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
              </span>
            </div>
            <div className={`quiz-timer ${timeLeft <= 10 ? 'critical' : ''}`}>
              <span>⏳ Timer: {timeLeft}s</span>
            </div>
          </div>

          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{ width: `${((currentIdx) / QUIZ_QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          <div className="playground-card" style={{ marginBottom: '1.5rem' }}>
            <h3 className="quiz-question-text">{QUIZ_QUESTIONS[currentIdx].question}</h3>
            <div className="quiz-options">
              {QUIZ_QUESTIONS[currentIdx].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`quiz-option ${selectedOption === oIdx ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              className="btn-secondary-action"
              style={{ opacity: currentIdx === 0 ? 0.5 : 1 }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="btn-primary-action"
              style={{ width: 'auto' }}
            >
              {currentIdx === QUIZ_QUESTIONS.length - 1 ? "Finish Quiz 🏁" : "Next Question →"}
            </button>
          </div>
        </div>
      )}

      {quizFinished && (
        <div className="quiz-result-success">
          <div className="playground-card">
            <div className="quiz-result-badge">🏆</div>
            <h2 style={{ fontWeight: 800, color: '#111827' }}>Quiz Completed!</h2>
            <p style={{ color: '#4b5563', marginTop: '0.5rem' }}>
              Well done, <strong>{regForm.name}</strong>! Here are your results:
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
              <div className="stat-card">
                <div className="stat-card-title">Final Score</div>
                <div className="stat-card-value">{getScore()} / {QUIZ_QUESTIONS.length}</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-title">Time Left</div>
                <div className="stat-card-value" style={{ color: timeLeft === 0 ? '#ef4444' : '#10b981' }}>
                  {timeLeft}s
                </div>
              </div>
            </div>

            <div className="quiz-options" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCorrect = answers[idx] === q.correct;
                return (
                  <div key={q.id} style={{ padding: '0.8rem', borderBottom: '1px solid #e5e7eb', fontSize: '0.95rem' }}>
                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{q.question}</div>
                    <div style={{ color: isCorrect ? '#059669' : '#dc2626', fontWeight: 600 }}>
                      {isCorrect ? "✓ Correct: " : "✗ Your Answer: "} 
                      {answers[idx] !== undefined ? q.options[answers[idx]] : "None (Timed out)"}
                    </div>
                    {!isCorrect && (
                      <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: 2 }}>
                        Correct Answer: {q.options[q.correct]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button onClick={restartQuiz} className="btn-primary-action">
              Try Again 🔄
            </button>
          </div>
        </div>
      )}

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useState</code>: Manages player names, questions navigation, selections, correct answers mapping, and game flags.
          </li>
          <li>
            <code>useEffect</code>: Triggers the ticking side effect countdown, returning an unbind interval function on cleanup.
          </li>
          <li>
            <code>useRef</code>: Stores the interval handler safely across re-renders without updating component layout.
          </li>
        </ul>
      </div>
    </div>
  );
}

// TAB 2: Text Analyzer Tab Component
function TextAnalyzerTab() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);

  // Runtime Console Logs state
  const [logs, setLogs] = useState(["[INITIAL] TextAnalyzerTab mounted. textareaRef connected to DOM."]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [`[${time}] ${msg}`, ...prev]);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      addLog("EFFECT: Textarea autofocus triggered on mount (useEffect invoked)");
    }
  }, []);

  // useMemo statistics calculations
  const stats = useMemo(() => {
    const trimmed = text.trim();
    const charCountWithSpaces = text.length;
    const charCountNoSpaces = text.replace(/\s+/g, '').length;
    const words = trimmed === '' ? [] : trimmed.split(/\s+/);
    const wordCount = words.length;
    const sentenceCount = trimmed === '' ? 0 : (trimmed.match(/[.!?]+(\s+|$)/g) || []).length || 1;
    const readingTime = Math.ceil(wordCount / 200);

    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 
      'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of', 'this', 'that', 
      'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 
      'your', 'his', 'her', 'their', 'our', 'as', 'has', 'have', 'had', 'do'
    ]);

    const frequencyMap = {};
    words.forEach(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanWord && !stopWords.has(cleanWord)) {
        frequencyMap[cleanWord] = (frequencyMap[cleanWord] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    return {
      charCountWithSpaces,
      charCountNoSpaces,
      wordCount,
      sentenceCount,
      readingTime,
      topKeywords
    };
  }, [text]);

  // Log useMemo recalculation via side-effect on text change
  useEffect(() => {
    if (text) {
      addLog(`MEMO: Recalculating stats & keyword map (useMemo hook executed because dependencies changed)`);
    }
  }, [text]);

  const handleCopy = useCallback(() => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value);
      setCopied(true);
      addLog("CALLBACK: handleCopy function executed (useCallback cached helper invoked)");
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const handleClear = useCallback(() => {
    setText('');
    addLog("CALLBACK: handleClear function executed (useCallback cached helper invoked)");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="analyzer-tab-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>📝 Smart Text Analyzer</h2>
          <p className="demo-description">Analyze text readability and word frequencies in real-time.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useMemo</span>
          <span className="hook-badge">useCallback</span>
          <span className="hook-badge">useRef</span>
          <span className="hook-badge">useState</span>
        </div>
      </div>

      <div className="analyzer-grid">
        <div>
          <textarea
            ref={textareaRef}
            className="analyzer-textarea"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              addLog(`EVENT: Textarea value updated. Length: ${e.target.value.length} chars.`);
            }}
          />
          <div className="analyzer-controls">
            <button 
              onClick={handleCopy} 
              className="btn-primary-action" 
              style={{ width: 'auto', flexGrow: 1 }}
              disabled={text.trim() === ''}
            >
              {copied ? "✓ Copied!" : "📋 Copy Text"}
            </button>
            <button 
              onClick={handleClear} 
              className="btn-secondary-action"
              disabled={text.trim() === ''}
            >
              🧹 Clear
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-card-title">Words</div>
              <div className="stat-card-value">{stats.wordCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-title">Characters</div>
              <div className="stat-card-value">{stats.charCountWithSpaces}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-title">Sentences</div>
              <div className="stat-card-value">{stats.sentenceCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-card-title">Est. Reading</div>
              <div className="stat-card-value">{stats.readingTime} min</div>
            </div>
          </div>

          <div className="playground-card" style={{ margin: 0, padding: '1rem' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontWeight: 700, color: '#374151' }}>
              🎯 TOP KEYWORDS (EXCL. STOPWORDS)
            </h4>
            {stats.topKeywords.length > 0 ? (
              <ul className="keyword-list">
                {stats.topKeywords.map((item, idx) => (
                  <li key={idx} className="keyword-item">
                    <span>#{idx + 1} <strong>{item.word}</strong></span>
                    <span className="keyword-count">{item.count} hits</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b7280', fontStyle: 'italic' }}>
                Start typing to generate key frequencies...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={logs} />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useMemo</code>: Avoids running regex searches and calculations on simple re-renders.
          </li>
          <li>
            <code>useCallback</code>: Caches references to action functions, keeping child structures optimized.
          </li>
          <li>
            <code>useRef</code>: Connects directly to the DOM <code>&lt;textarea&gt;</code> component reference.
          </li>
        </ul>
      </div>
    </div>
  );
}

// TAB 3: Kanban Tab Component
const initialKanbanState = {
  tasks: [
    { id: 1, text: "Learn React Hooks fundamentals", status: "todo" },
    { id: 2, text: "Build premium workspace sidebar", status: "in-progress" },
    { id: 3, text: "Initialize CRA application", status: "done" }
  ],
  logs: ["INITIALIZED: Board loaded with 3 starter tasks."]
};

function kanbanReducer(state, action) {
  const timestamp = new Date().toLocaleTimeString();
  switch (action.type) {
    case 'ADD_TASK': {
      const newTask = { id: Date.now(), text: action.payload, status: 'todo' };
      return {
        tasks: [...state.tasks, newTask],
        logs: [`[${timestamp}] DISPATCHED: ADD_TASK -> "${action.payload}"`, ...state.logs]
      };
    }
    case 'MOVE_TASK': {
      const { taskId, targetStatus } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      const updatedTasks = state.tasks.map(t => t.id === taskId ? { ...t, status: targetStatus } : t);
      return {
        tasks: updatedTasks,
        logs: [`[${timestamp}] DISPATCHED: MOVE_TASK -> Task "${task?.text}" to "${targetStatus.toUpperCase()}"`, ...state.logs]
      };
    }
    case 'DELETE_TASK': {
      const taskToDelete = state.tasks.find(t => t.id === action.payload);
      const remainingTasks = state.tasks.filter(t => t.id !== action.payload);
      return {
        tasks: remainingTasks,
        logs: [`[${timestamp}] DISPATCHED: DELETE_TASK -> Task "${taskToDelete?.text}"`, ...state.logs]
      };
    }
    default:
      return state;
  }
}

function KanbanTab() {
  const [state, dispatch] = useReducer(kanbanReducer, initialKanbanState);
  const [taskInput, setTaskInput] = useState('');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;
    dispatch({ type: 'ADD_TASK', payload: taskInput.trim() });
    setTaskInput('');
  };

  const handleMoveTask = (taskId, targetStatus) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, targetStatus } });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const getTasksByStatus = (status) => state.tasks.filter(t => t.status === status);

  return (
    <div className="kanban-tab-container">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>📋 Personal Kanban Board</h2>
          <p className="demo-description">Organize tasks and monitor dispatched state actions in real-time.</p>
        </div>
        <div className="hook-badges">
          <span className="hook-badge">useReducer</span>
          <span className="hook-badge">useState</span>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="kanban-input-group">
        <input
          type="text"
          placeholder="What needs to be done?"
          className="input-field"
          style={{ marginTop: 0 }}
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit" className="btn-primary-action" style={{ width: 'auto', whiteSpace: 'nowrap' }}>
          ＋ Add Task
        </button>
      </form>

      <div className="kanban-board">
        <div className="kanban-column">
          <div className="kanban-column-title">
            <span>📝 TO DO</span>
            <span className="task-count-badge">{getTasksByStatus('todo').length}</span>
          </div>
          <div className="kanban-tasks">
            {getTasksByStatus('todo').map(task => (
              <div key={task.id} className="kanban-card">
                <span className="kanban-card-text">{task.text}</span>
                <div className="kanban-card-actions">
                  <button onClick={() => handleDeleteTask(task.id)} className="btn-icon" title="Delete">🗑️</button>
                  <button onClick={() => handleMoveTask(task.id, 'in-progress')} className="btn-icon" title="Start">➔</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <div className="kanban-column-title">
            <span>⚙️ IN PROGRESS</span>
            <span className="task-count-badge" style={{ backgroundColor: '#fde68a', color: '#92400e' }}>
              {getTasksByStatus('in-progress').length}
            </span>
          </div>
          <div className="kanban-tasks">
            {getTasksByStatus('in-progress').map(task => (
              <div key={task.id} className="kanban-card">
                <span className="kanban-card-text">{task.text}</span>
                <div className="kanban-card-actions">
                  <button onClick={() => handleMoveTask(task.id, 'todo')} className="btn-icon" title="Back">↩</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="btn-icon" title="Delete">🗑️</button>
                  <button onClick={() => handleMoveTask(task.id, 'done')} className="btn-icon" title="Complete">➔</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="kanban-column">
          <div className="kanban-column-title">
            <span>✅ DONE</span>
            <span className="task-count-badge" style={{ backgroundColor: '#a7f3d0', color: '#065f46' }}>
              {getTasksByStatus('done').length}
            </span>
          </div>
          <div className="kanban-tasks">
            {getTasksByStatus('done').map(task => (
              <div key={task.id} className="kanban-card" style={{ borderLeft: '3px solid #10b981' }}>
                <span className="kanban-card-text" style={{ textDecoration: 'line-through', color: '#9ca3af' }}>
                  {task.text}
                </span>
                <div className="kanban-card-actions">
                  <button onClick={() => handleMoveTask(task.id, 'in-progress')} className="btn-icon" title="Reopen">↩</button>
                  <button onClick={() => handleDeleteTask(task.id)} className="btn-icon" title="Delete">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logger console */}
      <ConsoleLog logs={state.logs} title="🛠️ REDUCER ENGINE CONSOLE: DISPATCHED ACTIONS LOG" />

      <div className="explain-box">
        <h4>How Hooks are Used Here:</h4>
        <ul>
          <li>
            <code>useReducer</code>: Encapsulates complex state logic for columns, mapping actions under a single reducer dispatcher.
          </li>
        </ul>
      </div>
    </div>
  );
}

// TAB 4: Theme Settings Tab Component
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

// TAB 5: DOM Measurer Tab Component
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

// TAB 6: Slow List Tab Component
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

// TAB 7: Alert Drawer Tab Component
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

// TAB 8: Accessible Form Tab Component
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

// TAB 9: Custom Hooks Tab Component
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

// ─── INTRODUCTION TAB COMPONENT ────────────────────────────────
function IntroTab({ setActiveTab }) {
  const [selectedHook, setSelectedHook] = useState('useState');
  const activeDetail = HOOK_DETAILS[selectedHook];

  return (
    <div className="intro-tab-container">
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111827' }}>🧠 React Hooks Visual Guide & Analogy Hub</h2>
        <p style={{ color: '#6b7280', fontSize: '1.05rem', marginTop: '0.5rem' }}>
          Compare real-life analogies, identify project use cases, and inspect how hooks operate without code.
        </p>
      </div>

      <div className="playground-card" style={{ padding: '1.25rem', overflowX: 'auto', marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.2rem' }}>🤝 Real-Life Hook Analogies</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#4b5563', fontWeight: 700 }}>
              <th style={{ padding: '0.75rem 0.5rem' }}>Hook Name</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Real-Life Analogy</th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Core Project Usage</th>
              <th style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>Inspect</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(HOOK_DETAILS).map((hook) => (
              <tr 
                key={hook.title} 
                style={{ 
                  borderBottom: '1px solid #e5e7eb', 
                  backgroundColor: selectedHook === hook.title ? 'rgba(79, 70, 229, 0.04)' : 'transparent',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: '#4f46e5' }}>{hook.title}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#4b5563' }}>{hook.analogy}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#6b7280' }}>{hook.whereUsed}</td>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <button 
                    onClick={() => setSelectedHook(hook.title)}
                    className="btn-secondary-action"
                    style={{ 
                      padding: '0.25rem 0.75rem', 
                      fontSize: '0.8rem',
                      background: selectedHook === hook.title ? '#4f46e5' : '#e5e7eb',
                      color: selectedHook === hook.title ? '#ffffff' : '#4b5563'
                    }}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="playground-card" style={{ padding: '2rem', borderLeft: '5px solid #4f46e5', background: '#fafafa' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9ca3af', fontWeight: 700 }}>
            Active Analogy Inspector
          </span>
          <span className="hook-badge">{activeDetail.title}</span>
        </div>

        <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#111827', margin: '0 0 0.5rem 0' }}>
          💡 Real-World Concept: {activeDetail.scenario}
        </h3>
        
        <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
          {activeDetail.details}
        </p>

        {activeDetail.extra && (
          <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#1e40af' }}>
            <strong>💡 Persistence Details:</strong>
            <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>{activeDetail.extra}</pre>
          </div>
        )}

        <div style={{ background: '#e0e7ff', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', color: '#3730a3' }}>
          <strong>📋 Quick Interview Answer:</strong>
          <pre style={{ margin: '0.5rem 0 0 0', fontFamily: 'inherit', whiteSpace: 'pre-wrap', fontWeight: 500 }}>{activeDetail.interview}</pre>
        </div>
      </div>

      <h3 style={{ fontWeight: 800, marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.2rem' }}>🎮 Launch Interactive Code Demos</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('quiz')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>⏱️ Timer Quiz App</span>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px' }}>useState</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Test state variables, triggers, effects, and cleanup intervals.
          </p>
        </div>

        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('analyzer')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>📝 Text Analyzer</span>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px' }}>useMemo</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Caches heavy calculations and callbacks to optimize UI lag.
          </p>
        </div>

        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('kanban')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>📋 Kanban Board</span>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px' }}>useReducer</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Organize complex task states and log dispatch actions.
          </p>
        </div>

        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('theme')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>🎨 Theme Context</span>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px' }}>useContext</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Interact with application-wide settings values directly.
          </p>
        </div>

        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('measurer')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>📐 DOM Measurer</span>
            <span style={{ fontSize: '0.75rem', background: '#e0e7ff', color: '#4f46e5', padding: '2px 6px', borderRadius: '4px' }}>useLayoutEffect</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Synchronously measure element geometry and align overlays.
          </p>
        </div>

        <div className="playground-card" style={{ margin: 0, cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => setActiveTab('customhooks')}>
          <h4 style={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
            <span>🧩 Custom Hooks</span>
            <span style={{ fontSize: '0.75rem', background: '#f5f3ff', color: '#7c3aed', padding: '2px 6px', borderRadius: '4px' }}>Custom</span>
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '4px 0 0 0' }}>
            Track internet status, viewport widths, and debounced inputs.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── HOOK ANALOGIES & DOCUMENTATION DATA ───────────────────────
const HOOK_DETAILS = {
  useState: {
    title: "useState",
    analogy: "Keeping score in a game",
    whereUsed: "Login forms, counters, cart quantity, likes",
    scenario: "Instagram Like Button",
    details: "Likes state starts at 100. User clicks ❤️. Likes state increments to 101. The value changes and the user interface updates instantly to reflect the new state value.",
    interview: "Q: What is useState?\nA: A hook that lets you add state variables to functional components, triggering a re-render whenever the set state function is called."
  },
  useEffect: {
    title: "useEffect",
    analogy: "Setting an alarm after waking up",
    whereUsed: "API calls, fetching user data, timers, event listeners",
    scenario: "Weather App Data Sync",
    details: "When the application mounts, an API call is made asynchronously to fetch weather forecasts. Once retrieved, the state updates. The operation runs as a side-effect after component rendering completes.",
    interview: "Q: What is the purpose of useEffect?\nA: To perform asynchronous or direct DOM operations (side effects) and return cleanups (like clearing timers or unbinding events)."
  },
  useContext: {
    title: "useContext",
    analogy: "Family group sharing information",
    whereUsed: "Theme preferences, user authentication, language localization",
    scenario: "Dark Mode State sharing",
    details: "Instead of prop-drilling a theme variable down to every single header, body, sidebar, and footer item, useContext lets all descendants connect directly to a single shared Provider context source.",
    interview: "Q: When should you use useContext?\nA: When data is global and needed by many components at different nesting levels, avoiding manual prop passing."
  },
  useRef: {
    title: "useRef",
    analogy: "Bookmark in a book",
    whereUsed: "Input focusing, video playback controls, tracking previous state values",
    scenario: "Form Input Auto-Focus",
    details: "As soon as a portal page loads, you want the text cursor to flash inside the input field. useRef references the exact DOM node directly, allowing you to manipulate it without causing re-renders.",
    interview: "Q: What is the main difference between useRef and useState?\nA: useRef stores a mutable value in .current that persists across renders but does NOT trigger a component re-render when changed."
  },
  useMemo: {
    title: "useMemo",
    analogy: "Saving calculated marks instead of recalculating",
    whereUsed: "Heavy search filtering, dashboard data grouping, chart aggregations",
    scenario: "E-Commerce Filter Catalog",
    details: "Amazon has over 10,000 items. Filtering by category 'Laptops' is CPU intensive. useMemo stores the filtered result and recalculates it only when the search text or dependencies change, rather than on every minor page interaction.",
    interview: "Q: How does useMemo optimize performance?\nA: It memoizes (caches) the returned value of a function, skipping calculations on re-renders if the dependencies haven't changed."
  },
  useCallback: {
    title: "useCallback",
    analogy: "Saving a frequently used phone number",
    whereUsed: "Memoized functions passed to optimized child components",
    scenario: "Optimized List Actions",
    details: "In a list app, editing notifications in a parent shouldn't re-render list items. useCallback caches the click handler functions to avoid recreating them and triggering redundant renders of components wrapped in React.memo.",
    interview: "Q: How do useCallback and useMemo differ?\nA: useMemo caches the *result* of calling a function, whereas useCallback caches the *function definition itself*."
  },
  useReducer: {
    title: "useReducer",
    analogy: "Bank transaction system",
    whereUsed: "Shopping carts, complex forms, games state",
    scenario: "Shopping Cart Actions",
    details: "Items in a cart undergo many transformations: Add Item, Remove Item, Increase Quantity, Clear Cart. useReducer consolidates all this transition code under a single state machine and a dispatch function.",
    interview: "Q: When is useReducer preferred over useState?\nA: When managing state trees with multiple sub-values or complex logical relationships where the next state relies heavily on the previous one."
  },
  useLayoutEffect: {
    title: "useLayoutEffect",
    analogy: "Measuring a wall before painting",
    whereUsed: "Dynamic tooltip positioning, canvas dimensions reading, layout animations",
    scenario: "Tooltip Placement Alignments",
    details: "Before showing a popup alert, we measure the anchor element's coordinate boxes. useLayoutEffect runs synchronously immediately after DOM layout calculations but before paint, eliminating visual jumps.",
    interview: "Q: When should you choose useLayoutEffect over useEffect?\nA: Only when measuring layout geometry or properties that dictate layout shifts before the browser updates the paint frame."
  },
  useImperativeHandle: {
    title: "useImperativeHandle",
    analogy: "TV remote controlling TV functions",
    whereUsed: "Modals, overlay drawers, media players",
    scenario: "Controlling Child Modals from Parent",
    details: "A parent component needs to open a popup panel. Instead of passing toggle flags, the child exposes custom functions (.openAlert(), .closeAlert()) through useImperativeHandle so the parent ref triggers them.",
    interview: "Q: What does useImperativeHandle do?\nA: It customizes the instance value that is exposed to parent components when they reference a child wrapped in forwardRef."
  },
  useId: {
    title: "useId",
    analogy: "Roll number assigned to students",
    whereUsed: "Forms, lists, ARIA accessibility attributes",
    scenario: "Accessible Registration Form",
    details: "Inputs require unique ID hooks to link to screen reader labels (<label htmlFor={id}>). useId generates stable, unique strings that remain consistent across client/server loads, avoiding ID duplication.",
    interview: "Q: Why not use Math.random() for component IDs?\nA: Because Math.random() yields different IDs on client and server during hydration, breaking server-side rendered layouts."
  },
  useLocalStorage: {
    title: "useLocalStorage (Custom Hook)",
    analogy: "Notebook inside the browser",
    whereUsed: "Theme settings persistence, shopping carts data, draft recoveries",
    scenario: "Dark Theme Toggle persistence",
    details: "Without useLocalStorage, selecting Dark mode works, but refreshing the browser resets state to Light. With useLocalStorage, the preference is written to browser storage, keeping theme selections active on page load.",
    interview: "Q: What is useLocalStorage?\nA: A custom hook that wraps React state with localStorage operations. It reads saved entries on load, and updates browser storage whenever the state changes."
  }
};

// ─── MAIN PLAYGROUND PAGE ──────────────────────────────────────
const Playground = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const { isDarkMode } = useTheme();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderActiveContent = () => {
    switch (activeTab) {
      case 'quiz':
        return <QuizTab />;
      case 'analyzer':
        return <TextAnalyzerTab />;
      case 'kanban':
        return <KanbanTab />;
      case 'theme':
        return <ThemeSettingsTab />;
      case 'measurer':
        return <DOMMeasurerTab />;
      case 'slowlist':
        return <SlowListTab />;
      case 'alert':
        return <AlertDrawerTab />;
      case 'accessible':
        return <AccessibleFormTab />;
      case 'customhooks':
        return <CustomHooksTab />;
      case 'intro':
      default:
        return <IntroTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="playground-container">
      <div className="playground-header">
        <h1 className="playground-title">React Hooks Playground</h1>
        <p className="playground-subtitle">Explore interactive, real-world examples of core and advanced React Hooks.</p>
      </div>

      <div className="playground-layout">
        {/* Sidebar Navigation */}
        <aside className={`playground-sidebar ${isDarkMode ? 'dark-mode-sidebar' : ''}`}>
          <div className="sidebar-title">Categories</div>
          <nav className="playground-nav-list">
            <button
              onClick={() => handleTabClick('intro')}
              className={`playground-nav-item ${activeTab === 'intro' ? 'active' : ''}`}
            >
              <span>📖 Introduction</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('quiz')}
              className={`playground-nav-item ${activeTab === 'quiz' ? 'active' : ''}`}
            >
              <span>⏱️ State & Effects</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('analyzer')}
              className={`playground-nav-item ${activeTab === 'analyzer' ? 'active' : ''}`}
            >
              <span>📝 Memo & Callbacks</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('kanban')}
              className={`playground-nav-item ${activeTab === 'kanban' ? 'active' : ''}`}
            >
              <span>📋 Reducers</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('theme')}
              className={`playground-nav-item ${activeTab === 'theme' ? 'active' : ''}`}
            >
              <span>🎨 Context Subscription</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('measurer')}
              className={`playground-nav-item ${activeTab === 'measurer' ? 'active' : ''}`}
            >
              <span>📐 Layout Effects</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('slowlist')}
              className={`playground-nav-item ${activeTab === 'slowlist' ? 'active' : ''}`}
            >
              <span>⚡ Concurrent Lists</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('alert')}
              className={`playground-nav-item ${activeTab === 'alert' ? 'active' : ''}`}
            >
              <span>🎛️ Imperative Handles</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('accessible')}
              className={`playground-nav-item ${activeTab === 'accessible' ? 'active' : ''}`}
            >
              <span>♿ Accessibility useId</span>
              <span className="nav-arrow">➔</span>
            </button>
            <button
              onClick={() => handleTabClick('customhooks')}
              className={`playground-nav-item ${activeTab === 'customhooks' ? 'active' : ''}`}
            >
              <span>🧩 Custom Hooks</span>
              <span className="nav-arrow">➔</span>
            </button>
          </nav>
        </aside>

        {/* Content Pane */}
        <main className={`playground-content ${isDarkMode ? 'dark-mode-content' : ''}`}>
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
};

export default Playground;
