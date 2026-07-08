import React, { useState } from 'react';

const HOOK_DETAILS = {
  useState: {
    title: "useState",
    analogy: "Keeping score in a game",
    whereUsed: "Login forms, counters, cart quantity, likes",
    scenario: "Instagram Like Button",
    details: "Likes state starts at 100. User clicks ❤️. Likes state increments to 101. The value changes and the user interface updates instantly to reflect the new state value.",
    scenario2: "Shopping Cart Item Count",
    details2: "A shopper increases item quantity from 1 to 2. The quantity counter state updates, which instantly updates the subtotal and checkout button states dynamically.",
    useCase: "Managing dynamic UI variables like input text, loading state, show/hide flags, active items, or counter indexes.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/QuizRegister.jsx">QuizRegister.jsx</a> (lines 9-11) to control player inputs, and in <a href="file:///c:/Projects/react-fundamentals/src/pages/Playground.jsx">Playground.jsx</a> (line 20) to manage active navigation tabs.
      </span>
    ),
    interview: "Q: What is useState?\nA: A hook that lets you add state variables to functional components, triggering a re-render whenever the set state function is called."
  },
  useEffect: {
    title: "useEffect",
    analogy: "Setting an alarm after waking up",
    whereUsed: "API calls, fetching user data, timers, event listeners",
    scenario: "Weather App Data Sync",
    details: "When the application mounts, an API call is made asynchronously to fetch weather forecasts. Once retrieved, the state updates. The operation runs as a side-effect after component rendering completes.",
    scenario2: "Automatic Text Draft Auto-Save",
    details2: "As the user types a blog post, an effect watches the text input changes and triggers a debounced background save to a database every 5 seconds, cleaning up previous unsaved timers.",
    useCase: "Executing external synchronization, initiating API/fetch calls, subscribing to events, or managing timing intervals on component updates.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/QuizTab.jsx">QuizTab.jsx</a> to manage the live quiz countdown timer, and in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to track online status.
      </span>
    ),
    interview: "Q: What is the purpose of useEffect?\nA: To perform asynchronous or direct DOM operations (side effects) and return cleanups (like clearing timers or unbinding events)."
  },
  useContext: {
    title: "useContext",
    analogy: "Family group sharing information",
    whereUsed: "Theme preferences, user authentication, language localization",
    scenario: "Dark Mode State sharing",
    details: "Instead of prop-drilling a theme variable down to every single header, body, sidebar, and footer item, useContext lets all descendants connect directly to a single shared Provider context source.",
    scenario2: "Multi-Language Localization (i18n)",
    details2: "A user changes language from English to Spanish. A LanguageContext distributes translated strings down to all headers, buttons, and form labels automatically.",
    useCase: "Sharing global settings (themes, auth state, language locales) deep down the component tree without passing props manually.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/context/ThemeContext.js">ThemeContext.js</a> and <a href="file:///c:/Projects/react-fundamentals/src/components/playground/ThemeSettingsTab.jsx">ThemeSettingsTab.jsx</a> to distribute theme toggles.
      </span>
    ),
    interview: "Q: When should you use useContext?\nA: When data is global and needed by many components at different nesting levels, avoiding manual prop passing."
  },
  useRef: {
    title: "useRef",
    analogy: "Bookmark in a book",
    whereUsed: "Input focusing, video playback controls, tracking previous state values",
    scenario: "Form Input Auto-Focus",
    details: "As soon as a portal page loads, you want the text cursor to flash inside the input field. useRef references the exact DOM node directly, allowing you to manipulate it without causing re-renders.",
    scenario2: "Video Player Play/Pause Control",
    details2: "Instead of causing a full-page render just to trigger play or pause, a ref hooks directly into the HTML5 video tag, calling play() or pause() imperatively.",
    useCase: "Accessing underlying DOM elements directly or keeping persistent mutable variables that survive renders without triggering layout updates.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to programmatically focus inputs, and in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx">DOMMeasurerTab.jsx</a> to reference layout elements.
      </span>
    ),
    interview: "Q: What is the main difference between useRef and useState?\nA: useRef stores a mutable value in .current that persists across renders but does NOT trigger a component re-render when changed."
  },
  useMemo: {
    title: "useMemo",
    analogy: "Saving calculated marks instead of recalculating",
    whereUsed: "Heavy search filtering, dashboard data grouping, chart aggregations",
    scenario: "E-Commerce Filter Catalog",
    details: "Amazon has over 10,000 items. Filtering by category 'Laptops' is CPU intensive. useMemo stores the filtered result and recalculates it only when the search text or dependencies change, rather than on every minor page interaction.",
    scenario2: "Dashboard Metric Summarizations",
    details2: "Calculating minimum, maximum, and average prices from thousands of records is skipped on unrelated renders unless the database query array updates.",
    useCase: "Skipping expensive computing cycles or object constructions unless key state dependencies have changed.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/TextAnalyzerTab.jsx">TextAnalyzerTab.jsx</a> to count words and density, and in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to compute task statistics.
      </span>
    ),
    interview: "Q: How does useMemo optimize performance?\nA: It memoizes (caches) the returned value of a function, skipping calculations on re-renders if the dependencies haven't changed."
  },
  useCallback: {
    title: "useCallback",
    analogy: "Saving a frequently used phone number",
    whereUsed: "Memoized functions passed to optimized child components",
    scenario: "Optimized List Actions",
    details: "In a list app, editing notifications in a parent shouldn't re-render list items. useCallback caches the click handler functions to avoid recreating them and triggering redundant renders of components wrapped in React.memo.",
    scenario2: "Infinite Scroll Fetch Triggers",
    details2: "A callback triggers API queries when users scroll near page bottoms. useCallback keeps the callback reference stable, preventing the browser window from rebinding event handlers.",
    useCase: "Memoizing handler functions to avoid recreating their signatures on every render, keeping reference integrity for optimized child components.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to prevent redeclaring callback handlers like `addNote` on every keystroke.
      </span>
    ),
    interview: "Q: How do useCallback and useMemo differ?\nA: useMemo caches the *result* of calling a function, whereas useCallback caches the *function definition itself*."
  },
  useReducer: {
    title: "useReducer",
    analogy: "Bank transaction system",
    whereUsed: "Shopping carts, complex forms, games state",
    scenario: "Shopping Cart Actions",
    details: "Items in a cart undergo many transformations: Add Item, Remove Item, Increase Quantity, Clear Cart. useReducer consolidates all this transition code under a single state machine and a dispatch function.",
    scenario2: "Multi-Step Registration Wizard",
    details2: "Allows safe navigation between 'Profile Setup', 'Account Verification', and 'Payment Gateway' state validation steps sequentially.",
    useCase: "Structuring multi-step form transitions, dispatch operations, or complex nested state trees.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/KanbanTab.jsx">KanbanTab.jsx</a> to manage columns and cards, and in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useTodoReducer.js">useTodoReducer.js</a>.
      </span>
    ),
    interview: "Q: When is useReducer preferred over useState?\nA: When managing state trees with multiple sub-values or complex logical relationships where the next state relies heavily on the previous one."
  },
  useLayoutEffect: {
    title: "useLayoutEffect",
    analogy: "Measuring a wall before painting",
    whereUsed: "Dynamic tooltip positioning, canvas dimensions reading, layout animations",
    scenario: "Tooltip Placement Alignments",
    details: "Before showing a popup alert, we measure the anchor element's coordinate boxes. useLayoutEffect runs synchronously immediately after DOM layout calculations but before paint, eliminating visual jumps.",
    scenario2: "Canvas Bounding Geometry Recalculations",
    details2: "Aligns charts or dynamic overlay indicators synchronously to avoid visual page rendering delays.",
    useCase: "Synchronously reading measurements from the DOM and applying geometric mutations prior to visual screen paints.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx">DOMMeasurerTab.jsx</a> to calculate active sizing values before layout painting.
      </span>
    ),
    interview: "Q: When should you choose useLayoutEffect over useEffect?\nA: Only when measuring layout geometry or properties that dictate layout shifts before the browser updates the paint frame."
  },
  useImperativeHandle: {
    title: "useImperativeHandle",
    analogy: "TV remote controlling TV functions",
    whereUsed: "Modals, overlay drawers, media players",
    scenario: "Controlling Child Modals from Parent",
    details: "A parent component needs to open a popup panel. Instead of passing toggle flags, the child exposes custom functions (.openAlert(), .closeAlert()) through useImperativeHandle so the parent ref triggers them.",
    scenario2: "Programmatic Audio Board Controllers",
    details2: "Exposes play, pause, and volume triggers directly from a custom audio widget up to the landing dashboard component.",
    useCase: "Exposing dynamic nested child controller interfaces imperatively up to a parent component via refs.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/AlertDrawer.jsx">AlertDrawer.jsx</a> to reveal `.openAlert()` and `.closeAlert()` to the parent tab.
      </span>
    ),
    interview: "Q: What does useImperativeHandle do?\nA: It customizes the instance value that is exposed to parent components when they reference a child wrapped in forwardRef."
  },
  useId: {
    title: "useId",
    analogy: "Roll number assigned to students",
    whereUsed: "Forms, lists, ARIA accessibility attributes",
    scenario: "Accessible Registration Form",
    details: "Inputs require unique ID hooks to link to screen reader labels (<label htmlFor={id}>). useId generates stable, unique strings that remain consistent across client/server loads, avoiding ID duplication.",
    scenario2: "Complex Custom Grid Headers accessibility",
    details2: "Binds screen-reader descriptions and dynamic row elements cleanly without label string collision errors.",
    useCase: "Generating deterministic, unique, and collision-free string IDs for web accessibility linkages.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/AccessibleFormTab.jsx">AccessibleFormTab.jsx</a> to link HTML input fields with labels and description overlays.
      </span>
    ),
    interview: "Q: Why not use Math.random() for component IDs?\nA: Because Math.random() yields different IDs on client and server during hydration, breaking server-side rendered layouts."
  },
  useLocalStorage: {
    title: "useLocalStorage (Custom Hook)",
    analogy: "Notebook inside the browser",
    whereUsed: "Theme settings persistence, shopping carts data, draft recoveries",
    scenario: "Dark Theme Toggle persistence",
    details: "Without useLocalStorage, selecting Dark mode works, but refreshing the browser resets state to Light. With useLocalStorage, the preference is written to browser storage, keeping theme selections active on page load.",
    scenario2: "Autosaving Contact Form Progress",
    details2: "If the browser window gets closed unexpectedly, the user's form inputs are stored and automatically loaded when they navigate back to the page.",
    useCase: "Custom state handling that automatically caches and syncs key value pairs directly with the local browser storage.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useLocalStorage.js">useLocalStorage.js</a> and <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to store persistable user notes.
      </span>
    ),
    interview: "Q: What is useLocalStorage?\nA: A custom hook that wraps React state with localStorage operations. It reads saved entries on load, and updates browser storage whenever the state changes."
  },
  useTransition: {
    title: "useTransition",
    analogy: "Sorting mail in the background while answering phone calls",
    whereUsed: "Heavy list filtering, slow rendering search bars, tab switching",
    scenario: "Lag-Free Product Search",
    details: "When a user types in a search input, useTransition updates the typing input state instantly (high priority) and defers filtering the huge dataset (low priority) to prevent the screen from freezing.",
    scenario2: "Dashboard Chart Metric Toggle",
    details2: "Allows charts with thousands of nodes to recalculate graphics in the background while keeping tab selectors responsive to mouse clicks.",
    useCase: "Splitting state updates into high-priority input updates and low-priority background updates to maintain fluid UI responsiveness.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx">SlowListTab.jsx</a> (lines 31, 63) to prioritize keystrokes over heavy dataset rendering.
      </span>
    ),
    interview: "Q: What is useTransition?\nA: A hook that lets you update state without blocking the UI, marking state transitions as non-blocking background tasks."
  },
  useDeferredValue: {
    title: "useDeferredValue",
    analogy: "Waiting for prints to compile while using the computer",
    whereUsed: "Large search results lists, third-party component render deferrals",
    scenario: "Delayed Search List Rendering",
    details: "Instead of lagging the text typing cursor, useDeferredValue yields a deferred copy of the query string. The list renders asynchronously using the deferred value while the input updates instantly.",
    scenario2: "Deferred Vector Map Resizes",
    details2: "When zooming or sliding vector layouts, the query handles adjust instantly while the graphic updates catch up a split second later.",
    useCase: "Deferring rendering updates for a value that is slow to process, allowing typing input to remain fast.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx">SlowListTab.jsx</a> (line 33) to defer search query strings during heavy render cycles.
      </span>
    ),
    interview: "Q: What is useDeferredValue?\nA: A hook that returns a deferred version of a value, keeping UI interactions smooth by letting React compute slow rendering subtrees in the background."
  },
  useTimer: {
    title: "useTimer (Custom Hook)",
    analogy: "Kitchen timer ticking down",
    whereUsed: "Game countdowns, Pomodoro timers, authentication timeouts",
    scenario: "Pomodoro Focus session",
    details: "Ticks down from a given duration in seconds. Sets up a setInterval loop inside an effect, updating states for elapsed seconds and active status.",
    scenario2: "One-Time Password (OTP) validation duration",
    details2: "Restricts inputs to a 60-second limit before disabling forms and offering a retry button.",
    useCase: "Encapsulating stopwatch or countdown ticking logic in a reusable custom hook with reset and toggle handlers.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useTimer.js">useTimer.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> (line 40) to drive a 25-minute Pomodoro timer.
      </span>
    ),
    interview: "Q: Why wrap intervals in a custom hook?\nA: To separate the complex window.setInterval lifecycle and cleanup details from the UI presentation components."
  },
  useDebounce: {
    title: "useDebounce (Custom Hook)",
    analogy: "Waiting for a elevator door to stay open before ascending",
    whereUsed: "Search queries, auto-saving drafts, resizing adjustments",
    scenario: "API Search Query optimization",
    details: "Delays state changes until typing is finished for 600ms, ensuring you don't dispatch API calls for intermediate keystrokes.",
    scenario2: "Real-time Field Validation checks",
    details2: "Wait until the user finishes typing their password or username for a half-second before dispatching database validation queries.",
    useCase: "Throttling rapid state updates to prevent excessive calculations or network server load.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useDebounce.js">useDebounce.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> (line 14) to throttle search prompts.
      </span>
    ),
    interview: "Q: What does useDebounce prevent?\nA: It prevents network congestion and server overload by delaying search requests until typing activity pauses."
  },
  useOnlineStatus: {
    title: "useOnlineStatus (Custom Hook)",
    analogy: "Signal strength indicator on your phone",
    whereUsed: "Off-grid warnings, draft syncing, connectivity badges",
    scenario: "Offline Alert Banner",
    details: "Listens to the browser online/offline status and exposes a simple boolean flag, allowing the component tree to dynamically adjust connection messages.",
    scenario2: "Save Button Disabler",
    details2: "Dynamically disables database submit/save functions if user network connectivity drops to prevent network failures.",
    useCase: "Tracking browser network state dynamically by binding standard offline/online window listeners.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useOnlineStatus.js">useOnlineStatus.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> (line 9) to show network badges.
      </span>
    ),
    interview: "Q: How does useOnlineStatus work under the hood?\nA: It sets up window.addEventListener listeners for 'online' and 'offline' and updates a state representation accordingly."
  },
  useWindowSize: {
    title: "useWindowSize (Custom Hook)",
    analogy: "Flexible measuring tape scaling with shapes",
    whereUsed: "Adaptive grid controls, heavy responsive designs, conditional render splits",
    scenario: "Responsive Sidebar controller",
    details: "Registers a resize listener, updating state for width/height whenever the viewport window changes size.",
    scenario2: "Dynamic Canvas layout resizing",
    details2: "Re-renders graphic bounds on responsive resizes to ensure pixel-perfect renders.",
    useCase: "Listening to responsive screen geometry changes for components that cannot use CSS media queries alone.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useWindowSize.js">useWindowSize.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> (line 10) to display viewport resolution metrics.
      </span>
    ),
    interview: "Q: What is window resize debouncing?\nA: A technique to prevent excessive execution of recalculations while resizing window width/height dimensions."
  },
  useToggle: {
    title: "useToggle (Custom Hook)",
    analogy: "Light switch toggle",
    whereUsed: "Show/hide content flags, sidebar collapse settings, dialog displays",
    scenario: "Toggling Custom Drawer panel visibility",
    details: "Returns a boolean value and a memoized toggle function helper that flips the value, simplifying basic toggle states.",
    scenario2: "Collapsible Accordion visibility",
    details2: "Toggles whether individual FAQ items are open or closed when user clicks on card headings.",
    useCase: "Removing the boilerplate of writing `value => !value` callbacks across standard true/false states.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useToggle.js">useToggle.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> (line 11) to trigger visible drawer boxes.
      </span>
    ),
    interview: "Q: What is a custom toggle hook useful for?\nA: It saves boilerplate code and ensures update triggers are wrapped in simple callbacks."
  }
};

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
            </tr>
          </thead>
          <tbody>
            {Object.entries(HOOK_DETAILS).map(([key, hook]) => (
              <tr 
                key={key} 
                onClick={() => setSelectedHook(key)}
                style={{ 
                  borderBottom: '1px solid #e5e7eb', 
                  backgroundColor: selectedHook === key ? 'rgba(79, 70, 229, 0.08)' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <td style={{ padding: '0.75rem 0.5rem', fontWeight: 700, color: '#4f46e5' }}>{hook.title}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#4b5563' }}>{hook.analogy}</td>
                <td style={{ padding: '0.75rem 0.5rem', color: '#6b7280' }}>{hook.whereUsed}</td>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🌟 Scenario 1: {activeDetail.scenario}</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{activeDetail.details}</p>
          </div>
          
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🌟 Scenario 2: {activeDetail.scenario2}</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>{activeDetail.details2}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#f0fdf4', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #22c55e', fontSize: '0.9rem', color: '#14532d' }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🛠️ Common Use Cases:</strong>
            <p style={{ margin: '0.5rem 0 0 0', lineHeight: 1.5, fontSize: '0.875rem' }}>{activeDetail.useCase}</p>
          </div>
          
          <div style={{ background: '#f5f3ff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #8b5cf6', fontSize: '0.9rem', color: '#4c1d95' }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>📂 Usage in This Project:</strong>
            <p style={{ margin: '0.5rem 0 0 0', lineHeight: 1.5, fontSize: '0.875rem' }}>{activeDetail.projectExample}</p>
          </div>
        </div>

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

export default IntroTab;
