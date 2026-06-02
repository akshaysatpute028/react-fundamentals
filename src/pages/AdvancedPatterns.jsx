import React, { useState, useMemo, useRef, useCallback, useEffect, useId } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useTimer } from '../hooks/useTimer';
import { useTodoReducer } from '../hooks/useTodoReducer';
import '../styles/AdvancedPatterns.css';

const AdvancedPatterns = () => {

    /* Global theme from Context API */
    const { theme, toggleTheme, isDarkMode } = useTheme();

    /*
      useLocalStorage works like useState
      but automatically saves data to localStorage
    */
    const [notes, setNotes] = useLocalStorage('app-notes', []);

    /* Basic state management using useState */
    const [searchTerm, setSearchTerm] = useState('');
    const [newNote, setNewNote] = useState('');
    const [todoInput, setTodoInput] = useState('');

    /*
      useRef stores values without causing re-render.
      Here it is used to focus input field.
    */
    const inputRef = useRef(null);

    /*
      useReducer is useful for complex state management.
      Todo logic is extracted into custom reducer hook.
    */
    const { todos, addTodo, deleteTodo, toggleTodo, clearCompleted } = useTodoReducer();

    /*
      Custom timer hook
      1500 sec = 25 mins Pomodoro
    */
    const { time, isActive, toggle, reset, formatTime } = useTimer(1500);

    /*
      useId generates unique IDs
      useful for accessibility
    */
    const noteId = useId();

    /*
      useMemo prevents recalculating filtered notes
      on every render
    */
    const filteredNotes = useMemo(() => {
        return notes.filter(note =>
            note.text.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [notes, searchTerm]);

    /*
      Calculate stats only when todos change
    */
    const stats = useMemo(() => ({
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        pending: todos.filter(t => !t.completed).length,
        completion:
            todos.length > 0
                ? Math.round(
                    (todos.filter(t => t.completed).length / todos.length) * 100
                )
                : 0
    }), [todos]);

    /*
      useCallback memoizes functions
      prevents recreating them every render
    */
    const addNote = useCallback(() => {
        if (!newNote.trim()) return;

        setNotes([
            ...notes,
            {
                id: Date.now(),
                text: newNote,
                timestamp: new Date().toLocaleTimeString()
            }
        ]);

        setNewNote('');

        /* focus input again */
        inputRef.current?.focus();

    }, [newNote, notes, setNotes]);

    const deleteNote = useCallback((id) => {
        setNotes(notes.filter(note => note.id !== id));
    }, [notes, setNotes]);

    const handleAddTodo = useCallback(() => {
        addTodo(todoInput);
        setTodoInput('');
    }, [todoInput, addTodo]);

    /*
      useEffect handles side effects.

      Here:
      - Add keyboard listener
      - Remove listener on cleanup
    */
    useEffect(() => {

        const handleKeyPress = (e) => {
            if (
                e.key === 'Enter' &&
                e.ctrlKey &&
                document.activeElement === inputRef.current
            ) {
                addNote();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };

    }, [addNote]);

    /* Dynamic theme styles */
    const cardStyle = {
        backgroundColor: theme.colors.card,
        color: theme.colors.text,
        borderColor: theme.colors.border
    };

    return (
        <div className="advanced-patterns" style={{ backgroundColor: theme.colors.bg, color: theme.colors.text }}>
            <div className="patterns-header">
                <h1>🚀 Advanced React Patterns Showcase</h1>
                <p>Interactive demonstration of all React Hooks in real-world scenarios</p>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
            </div>

            <div className="hooks-grid">
                {/* SECTION 1: useState, useRef - Pomodoro Timer */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>⏱️ Pomodoro Timer</h2>
                        <span className="hook-badge">useState, useRef, useEffect, useCallback</span>
                    </div>
                    <div className="hook-content">
                        <div className="timer-display">{formatTime(time)}</div>
                        <div className="timer-buttons">
                            <button className="btn btn-primary" onClick={toggle}>
                                {isActive ? '⏸ Pause' : '▶ Start'}
                            </button>
                            <button className="btn btn-secondary" onClick={reset}>🔄 Reset</button>
                        </div>
                        <div className="hook-explanation">
                            <strong>Hooks Used:</strong>
                            <ul>
                                <li><code>useState</code> - Track timer state (active, time)</li>
                                <li><code>useRef</code> - Reference to interval without re-renders</li>
                                <li><code>useEffect</code> - Handle side effects (interval cleanup)</li>
                                <li><code>useCallback</code> - Memoize toggle/reset functions</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* SECTION 2: useReducer, useCallback - Todo Manager */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>✅ Smart Todo Manager</h2>
                        <span className="hook-badge">useReducer, useCallback, useMemo</span>
                    </div>
                    <div className="hook-content">
                        <div className="stats-box">
                            <div className="stat">
                                <span className="stat-label">Total</span>
                                <span className="stat-value">{stats.total}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Done</span>
                                <span className="stat-value" style={{ color: '#10b981' }}>{stats.completed}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Pending</span>
                                <span className="stat-value" style={{ color: '#f59e0b' }}>{stats.pending}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Progress</span>
                                <span className="stat-value" style={{ color: '#667eea' }}>{stats.completion}%</span>
                            </div>
                        </div>

                        <div className="todo-input-group">
                            <input
                                type="text"
                                value={todoInput}
                                onChange={(e) => setTodoInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                                placeholder="Add a new task..."
                                className="input"
                            />
                            <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
                        </div>

                        <div className="todo-list">
                            {todos.map(todo => (
                                <div key={todo.id} className="todo-item">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                        className="todo-checkbox"
                                    />
                                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                        {todo.text}
                                    </span>
                                    <button className="btn-delete" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                                </div>
                            ))}
                        </div>

                        {todos.length > 0 && (
                            <button className="btn btn-secondary" onClick={clearCompleted}>
                                Clear Completed ({stats.completed})
                            </button>
                        )}

                        <div className="hook-explanation">
                            <strong>Hooks Used:</strong>
                            <ul>
                                <li><code>useReducer</code> - Complex state management (add, delete, toggle)</li>
                                <li><code>useCallback</code> - Memoize handlers to prevent child re-renders</li>
                                <li><code>useMemo</code> - Calculate stats efficiently</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: useMemo, useCallback - Notes Search */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>📝 Smart Notes (Searchable)</h2>
                        <span className="hook-badge">useState, useLocalStorage, useMemo, useCallback</span>
                    </div>
                    <div className="hook-content">
                        <input
                            ref={inputRef}
                            type="text"
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Write a note... (Ctrl+Enter to save)"
                            className="input"
                        />
                        <button className="btn btn-primary" onClick={addNote}>Save Note</button>

                        <div className="search-box">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search notes..."
                                className="input"
                            />
                            <span className="search-count">{filteredNotes.length} found</span>
                        </div>

                        <div className="notes-list">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map(note => (
                                    <div key={note.id} className="note-item">
                                        <div className="note-content">
                                            <p>{note.text}</p>
                                            <small>{note.timestamp}</small>
                                        </div>
                                        <button className="btn-delete" onClick={() => deleteNote(note.id)}>🗑️</button>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-state">No notes yet. Start writing! ✨</p>
                            )}
                        </div>

                        <div className="hook-explanation">
                            <strong>Hooks Used:</strong>
                            <ul>
                                <li><code>useLocalStorage</code> - Custom hook for persistent storage</li>
                                <li><code>useMemo</code> - Optimize filtering (runs only when dependencies change)</li>
                                <li><code>useCallback</code> - Memoize add/delete functions</li>
                                <li><code>useRef</code> - Direct DOM access for auto-focus</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* SECTION 4: useContext - Theme Toggle */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>🎨 Global Theme Settings</h2>
                        <span className="hook-badge">useContext, useState</span>
                    </div>
                    <div className="hook-content">
                        <div className="theme-preview">
                            <div className="preview-box" style={{
                                backgroundColor: theme.colors.card,
                                border: `2px solid ${theme.colors.accent}`
                            }}>
                                <p>Current Theme: <strong>{isDarkMode ? 'Dark' : 'Light'}</strong></p>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={toggleTheme}>
                            {isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
                        </button>

                        <div className="hook-explanation">
                            <strong>Hooks Used:</strong>
                            <ul>
                                <li><code>useContext</code> - Access global theme state</li>
                                <li><code>createContext</code> - Create ThemeContext provider</li>
                                <li><code>useState</code> - Manage theme in context</li>
                            </ul>
                            <p>Notice how the entire app changes theme without prop drilling!</p>
                        </div>
                    </div>
                </div>

                {/* SECTION 5: useId, useEffect - Form Management */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>📋 Advanced Form Patterns</h2>
                        <span className="hook-badge">useId, useEffect, useRef</span>
                    </div>
                    <div className="hook-content">
                        <form className="form-example">
                            <div className="form-group">
                                <label htmlFor={`${noteId}-username`}>Username:</label>
                                <input id={`${noteId}-username`} type="text" placeholder="Enter username" className="input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`${noteId}-email`}>Email:</label>
                                <input id={`${noteId}-email`} type="email" placeholder="Enter email" className="input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`${noteId}-message`}>Message:</label>
                                <textarea id={`${noteId}-message`} placeholder="Enter message" className="input"></textarea>
                            </div>
                        </form>

                        <div className="hook-explanation">
                            <strong>Hooks Used:</strong>
                            <ul>
                                <li><code>useId</code> - Generate unique IDs for form elements</li>
                                <li><code>useEffect</code> - Handle form setup and cleanup</li>
                                <li><code>useRef</code> - Direct input manipulation</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* SECTION 6: Hook Rules and Best Practices */}
                <div className="hook-section" style={cardStyle}>
                    <div className="section-header">
                        <h2>⚡ Hook Rules & Best Practices</h2>
                    </div>
                    <div className="hook-content">
                        <div className="rules-list">
                            <div className="rule">
                                <span className="rule-icon">✓</span>
                                <div>
                                    <strong>Only Call Hooks at Top Level</strong>
                                    <p>Don't call hooks inside loops, conditions, or nested functions</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-icon">✓</span>
                                <div>
                                    <strong>Only Call Hooks from React Functions</strong>
                                    <p>Call hooks from React function components or custom hooks only</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-icon">✓</span>
                                <div>
                                    <strong>Use Custom Hooks for Logic Reuse</strong>
                                    <p>Extract component logic into custom hooks to share across components</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-icon">✓</span>
                                <div>
                                    <strong>Dependency Arrays Matter</strong>
                                    <p>useEffect, useCallback, useMemo depend on correct dependency arrays</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-icon">✓</span>
                                <div>
                                    <strong>Cleanup on Unmount</strong>
                                    <p>Always return cleanup function from useEffect for intervals, listeners, etc.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hooks Reference */}
            <div className="hooks-reference" style={cardStyle}>
                <h2>📚 All React Hooks Reference</h2>
                <div className="reference-grid">
                    <div className="reference-item">
                        <h4>useState</h4>
                        <p>Manage state in functional components</p>
                    </div>
                    <div className="reference-item">
                        <h4>useEffect</h4>
                        <p>Handle side effects and cleanup</p>
                    </div>
                    <div className="reference-item">
                        <h4>useContext</h4>
                        <p>Access context without prop drilling</p>
                    </div>
                    <div className="reference-item">
                        <h4>useReducer</h4>
                        <p>Complex state management</p>
                    </div>
                    <div className="reference-item">
                        <h4>useCallback</h4>
                        <p>Memoize callback functions</p>
                    </div>
                    <div className="reference-item">
                        <h4>useMemo</h4>
                        <p>Memoize expensive calculations</p>
                    </div>
                    <div className="reference-item">
                        <h4>useRef</h4>
                        <p>Direct DOM access & persistent values</p>
                    </div>
                    <div className="reference-item">
                        <h4>useId</h4>
                        <p>Generate unique IDs</p>
                    </div>
                    <div className="reference-item">
                        <h4>useLayoutEffect</h4>
                        <p>Synchronous side effects before paint</p>
                    </div>
                    <div className="reference-item">
                        <h4>Custom Hooks</h4>
                        <p>Reusable stateful logic</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvancedPatterns;
