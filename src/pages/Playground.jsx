// C:\Projects\react-fundamentals\src\pages\Playground.jsx
import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/Playground.css';

// Subcomponents imported from modular playground folder
import IntroTab from '../components/playground/IntroTab';
import QuizTab from '../components/playground/QuizTab';
import TextAnalyzerTab from '../components/playground/TextAnalyzerTab';
import KanbanTab from '../components/playground/KanbanTab';
import ThemeSettingsTab from '../components/playground/ThemeSettingsTab';
import DOMMeasurerTab from '../components/playground/DOMMeasurerTab';
import SlowListTab from '../components/playground/SlowListTab';
import AlertDrawerTab from '../components/playground/AlertDrawerTab';
import AccessibleFormTab from '../components/playground/AccessibleFormTab';
import CustomHooksTab from '../components/playground/CustomHooksTab';
import HooksReferenceTab from '../components/playground/HooksReferenceTab';

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
      case 'reference':
        return <HooksReferenceTab />;
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
              onClick={() => handleTabClick('reference')}
              className={`playground-nav-item ${activeTab === 'reference' ? 'active' : ''}`}
              style={{ 
                background: activeTab === 'reference' ? 'var(--primary-gradient)' : 'rgba(79, 70, 229, 0.05)', 
                color: activeTab === 'reference' ? '#ffffff' : '#4f46e5',
                border: '1.5px dashed rgba(79, 70, 229, 0.3)'
              }}
            >
              <span>📚 Usecases & Examples</span>
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
