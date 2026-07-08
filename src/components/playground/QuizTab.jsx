import React, { useState, useEffect, useRef } from 'react';
import ConsoleLog from './ConsoleLog';
import QuizRegister from './QuizRegister';

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

function QuizTab() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [regForm, setRegForm] = useState({ name: '', email: '' });

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

  const handleRegisterSuccess = ({ name, email }) => {
    setRegForm({ name, email });
    setIsRegistered(true);
    setIsPlaying(true);
    setTimeLeft(60);
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

  // Helper to determine the status of each step in the workflow
  const getStepClass = (stepIndex) => {
    if (quizFinished) {
      return 'completed';
    }
    if (isPlaying) {
      if (stepIndex === 1) return 'completed';
      if (stepIndex === 2) return 'active';
      return 'pending';
    }
    // Not registered yet
    if (stepIndex === 1) return 'active';
    return 'pending';
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

      {/* Workflow Step Wizard */}
      <div className="quiz-workflow-steps">
        <div className={`quiz-workflow-step ${getStepClass(1)}`}>
          <span className="step-num">{getStepClass(1) === 'completed' ? '✓' : '1'}</span>
          <span>Authentication</span>
        </div>
        <div className={`step-divider ${isPlaying || quizFinished ? 'completed' : ''}`} />
        <div className={`quiz-workflow-step ${getStepClass(2)}`}>
          <span className="step-num">{getStepClass(2) === 'completed' ? '✓' : '2'}</span>
          <span>Interactive Testing</span>
        </div>
        <div className={`step-divider ${quizFinished ? 'completed' : ''}`} />
        <div className={`quiz-workflow-step ${getStepClass(3)}`}>
          <span className="step-num">3</span>
          <span>Performance Review</span>
        </div>
      </div>

      {!isRegistered && (
        <QuizRegister onRegister={handleRegisterSuccess} addLog={addLog} />
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
            <code>useState</code>: Manages state variables (active question index, selected options, correct answers mapping, and completion state).
          </li>
          <li>
            <code>useEffect</code>: Triggers the ticking side effect countdown, returning an unbind interval function on cleanup.
          </li>
          <li>
            <code>useRef</code>: Stores the interval handler safely across re-renders without updating component layout.
          </li>
          <li>
            <strong>Modular Subcomponents & Props Flow:</strong> The login/registration view is extracted into the <code>&lt;QuizRegister /&gt;</code> subcomponent, communicating with the parent via callback functions (passing state and logs).
          </li>
        </ul>
      </div>
    </div>
  );
}

export default QuizTab;
