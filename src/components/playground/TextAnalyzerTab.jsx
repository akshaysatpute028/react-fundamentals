import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import ConsoleLog from './ConsoleLog';

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

export default TextAnalyzerTab;
