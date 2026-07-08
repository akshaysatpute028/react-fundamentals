import React, { useState, useReducer } from 'react';
import ConsoleLog from './ConsoleLog';

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

export default KanbanTab;
