import React, { useState } from 'react';

const REFERENCE_HOOKS = [
  {
    title: "useState",
    category: "Core State",
    badgeColor: "#4f46e5",
    badgeBg: "#e0e7ff",
    useCase: "Managing dynamic local state variables like inputs, counters, triggers, or toggles that automatically cause the UI to re-render when changed.",
    scenario: "Instagram Like Button",
    details: "Likes state starts at 100. User clicks ❤️. Likes state increments to 101. The value changes and the user interface updates instantly to reflect the new state value.",
    scenario2: "Shopping Cart Item Count",
    details2: "A shopper increases item quantity from 1 to 2. The quantity counter state updates, which instantly updates the subtotal and checkout button states dynamically.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/QuizRegister.jsx">QuizRegister.jsx</a> (lines 9-11) to manage user detail text fields, and in <a href="file:///c:/Projects/react-fundamentals/src/pages/Playground.jsx">Playground.jsx</a> (line 20) to manage active tab selection.
      </span>
    )
  },
  {
    title: "useEffect",
    category: "Core Side Effects",
    badgeColor: "#10b981",
    badgeBg: "#d1fae5",
    useCase: "Handling side effects like starting data fetch calls, subscribing to events, setting timers, or syncing DOM elements, and cleaning them up on unmount.",
    scenario: "Weather App Data Sync",
    details: "When the application mounts, an API call is made asynchronously to fetch weather forecasts. Once retrieved, the state updates. The operation runs as a side-effect after component rendering completes.",
    scenario2: "Automatic Text Draft Auto-Save",
    details2: "As the user types a blog post, an effect watches the text input changes and triggers a debounced background save to a database every 5 seconds, cleaning up previous unsaved timers.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/QuizTab.jsx">QuizTab.jsx</a> to govern countdown timers, and in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to log connectivity/resize events.
      </span>
    )
  },
  {
    title: "useContext",
    category: "Core Shared State",
    badgeColor: "#ec4899",
    badgeBg: "#fce7f3",
    useCase: "Subscribing directly to context provider objects to retrieve global app-wide configurations without manually drilling props down intermediate nesting levels.",
    scenario: "Dark Mode State sharing",
    details: "Instead of prop-drilling a theme variable down to every single header, body, sidebar, and footer item, useContext lets all descendants connect directly to a single shared Provider context source.",
    scenario2: "Multi-Language Localization (i18n)",
    details2: "A user changes language from English to Spanish. A LanguageContext distributes translated strings down to all headers, buttons, and form labels automatically.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/context/ThemeContext.js">ThemeContext.js</a> and <a href="file:///c:/Projects/react-fundamentals/src/components/playground/ThemeSettingsTab.jsx">ThemeSettingsTab.jsx</a> to share light/dark theme values globally.
      </span>
    )
  },
  {
    title: "useRef",
    category: "DOM & References",
    badgeColor: "#8b5cf6",
    badgeBg: "#ede9fe",
    useCase: "Storing persistent mutable values that persist across renders without triggering layout updates, or holding reference pointers directly to HTML elements.",
    scenario: "Form Input Auto-Focus",
    details: "As soon as a portal page loads, you want the text cursor to flash inside the input field. useRef references the exact DOM node directly, allowing you to manipulate it without causing re-renders.",
    scenario2: "Video Player Play/Pause Control",
    details2: "Instead of causing a full-page render just to trigger play or pause, a ref hooks directly into the HTML5 video tag, calling play() or pause() imperatively.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> (line 28) to focus note forms, and in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx">DOMMeasurerTab.jsx</a> to target elements.
      </span>
    )
  },
  {
    title: "useMemo",
    category: "Performance Optimizations",
    badgeColor: "#f59e0b",
    badgeBg: "#fef3c7",
    useCase: "Caching (memoizing) expensive calculation results so they aren't recalculated on subsequent renders unless dependencies change.",
    scenario: "E-Commerce Filter Catalog",
    details: "Amazon has over 10,000 items. Filtering by category 'Laptops' is CPU intensive. useMemo stores the filtered result and recalculates it only when the search text or dependencies change, rather than on every minor page interaction.",
    scenario2: "Dashboard Metric Summarizations",
    details2: "Calculating minimum, maximum, and average prices from thousands of records is skipped on unrelated renders unless the database query array updates.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/TextAnalyzerTab.jsx">TextAnalyzerTab.jsx</a> to count words and density, and in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> (line 52) to aggregate todo stats.
      </span>
    )
  },
  {
    title: "useCallback",
    category: "Performance Optimizations",
    badgeColor: "#3b82f6",
    badgeBg: "#dbeafe",
    useCase: "Caching function definitions between renders to maintain function reference integrity. Crucial for passing callback hooks to optimized child components.",
    scenario: "Optimized List Actions",
    details: "In a list app, editing notifications in a parent shouldn't re-render list items. useCallback caches the click handler functions to avoid recreating them and triggering redundant renders of components wrapped in React.memo.",
    scenario2: "Infinite Scroll Fetch Triggers",
    details2: "A callback triggers API queries when users scroll near page bottoms. useCallback keeps the callback reference stable, preventing the browser window from rebinding event handlers.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> (line 77) to prevent resetting handler bindings on rapid typing events.
      </span>
    )
  },
  {
    title: "useReducer",
    category: "Complex State",
    badgeColor: "#6366f1",
    badgeBg: "#e0e7ff",
    useCase: "Managing structured state trees with complex transitions or nested values using formal dispatched actions (actions / reducers design).",
    scenario: "Shopping Cart Actions",
    details: "Items in a cart undergo many transformations: Add Item, Remove Item, Increase Quantity, Clear Cart. useReducer consolidates all this transition code under a single state machine and a dispatch function.",
    scenario2: "Multi-Step Registration Wizard",
    details2: "Allows safe navigation between 'Profile Setup', 'Account Verification', and 'Payment Gateway' state validation steps sequentially.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/KanbanTab.jsx">KanbanTab.jsx</a> to dispatch column actions, and in the custom hook <a href="file:///c:/Projects/react-fundamentals/src/hooks/useTodoReducer.js">useTodoReducer.js</a>.
      </span>
    )
  },
  {
    title: "useLayoutEffect",
    category: "DOM & Measurements",
    badgeColor: "#14b8a6",
    badgeBg: "#ccfbf1",
    useCase: "Running side effects synchronously after all DOM mutations are calculated but before elements are visually painted to eliminate graphic flickers.",
    scenario: "Tooltip Placement Alignments",
    details: "Before showing a popup alert, we measure the anchor element's coordinate boxes. useLayoutEffect runs synchronously immediately after DOM layout calculations but before paint, eliminating visual jumps.",
    scenario2: "Canvas Bounding Geometry Recalculations",
    details2: "Aligns charts or dynamic overlay indicators synchronously to avoid visual page rendering delays.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx">DOMMeasurerTab.jsx</a> to calculate active sizing values before layout painting.
      </span>
    )
  },
  {
    title: "useImperativeHandle",
    category: "Refs & Communication",
    badgeColor: "#64748b",
    badgeBg: "#f1f5f9",
    useCase: "Customizing child methods and functions that are revealed to parent references. Must be used with forwardRef.",
    scenario: "Controlling Child Modals from Parent",
    details: "A parent component needs to open a popup panel. Instead of passing toggle flags, the child exposes custom functions (.openAlert(), .closeAlert()) through useImperativeHandle so the parent ref triggers them.",
    scenario2: "Programmatic Audio Board Controllers",
    details2: "Exposes play, pause, and volume triggers directly from a custom audio widget up to the landing dashboard component.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/AlertDrawer.jsx">AlertDrawer.jsx</a> (line 8) to expose modal toggling triggers directly to the parent components.
      </span>
    )
  },
  {
    title: "useId",
    category: "Accessibility",
    badgeColor: "#a855f7",
    badgeBg: "#f3e8ff",
    useCase: "Generating stable, deterministic, unique accessibility element IDs that remain consistent across client/server loading updates.",
    scenario: "Accessible Registration Form",
    details: "Inputs require unique ID hooks to link to screen reader labels (<label htmlFor={id}>). useId generates stable, unique strings that remain consistent across client/server loads, avoiding ID duplication.",
    scenario2: "Complex Custom Grid Headers accessibility",
    details2: "Binds screen-reader descriptions and dynamic row elements cleanly without label string collision errors.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/AccessibleFormTab.jsx">AccessibleFormTab.jsx</a> to link HTML input fields with labels and description overlays.
      </span>
    )
  },
  {
    title: "useTransition",
    category: "Concurrent Rendering",
    badgeColor: "#06b6d4",
    badgeBg: "#ecfeff",
    useCase: "Splitting state updates into high-priority updates (typing inputs) and deferred background updates (rendering list updates) to keep typing responsive.",
    scenario: "Lag-Free Product Search",
    details: "When a user types in a search input, useTransition updates the typing input state instantly (high priority) and defers filtering the huge dataset (low priority) to prevent the screen from freezing.",
    scenario2: "Dashboard Chart Metric Toggle",
    details2: "Allows charts with thousands of nodes to recalculate graphics in the background while keeping tab selectors responsive to mouse clicks.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx">SlowListTab.jsx</a> (lines 31, 63) to prioritize keystrokes over heavy dataset rendering.
      </span>
    )
  },
  {
    title: "useDeferredValue",
    category: "Concurrent Rendering",
    badgeColor: "#0284c7",
    badgeBg: "#e0f2fe",
    useCase: "Providing a deferred version of a value that updates asynchronously, preventing layout updates from blocking active user input interactions.",
    scenario: "Delayed Search List Rendering",
    details: "Instead of lagging the text typing cursor, useDeferredValue yields a deferred copy of the query string. The list renders asynchronously using the deferred value while the input updates instantly.",
    scenario2: "Deferred Vector Map Resizes",
    details2: "When zooming or sliding vector layouts, the query handles adjust instantly while the graphic updates catch up a split second later.",
    projectExample: (
      <span>
        Used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx">SlowListTab.jsx</a> (line 33) to defer search query strings during heavy render cycles.
      </span>
    )
  },
  {
    title: "useLocalStorage",
    category: "Custom Hooks",
    badgeColor: "#ea580c",
    badgeBg: "#ffedd5",
    useCase: "Synchronizing state inputs directly to browser localStorage so values survive window reloads and page exits.",
    scenario: "Dark Theme Toggle persistence",
    details: "Without useLocalStorage, selecting Dark mode works, but refreshing the browser resets state to Light. With useLocalStorage, the preference is written to browser storage, keeping theme selections active on page load.",
    scenario2: "Autosaving Contact Form Progress",
    details2: "If the browser window gets closed unexpectedly, the user's form inputs are stored and automatically loaded when they navigate back to the page.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useLocalStorage.js">useLocalStorage.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to store persistent note boards.
      </span>
    )
  },
  {
    title: "useTimer",
    category: "Custom Hooks",
    badgeColor: "#e11d48",
    badgeBg: "#ffe4e6",
    useCase: "Packaging stopwatch ticking intervals, toggle controls, elapsed durations, and resets into a clean, reusable state loop.",
    scenario: "Pomodoro Focus session",
    details: "Ticks down from a given duration in seconds. Sets up a setInterval loop inside an effect, updating states for elapsed seconds and active status.",
    scenario2: "One-Time Password (OTP) validation duration",
    details2: "Restricts inputs to a 60-second limit before disabling forms and offering a retry button.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useTimer.js">useTimer.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx">AdvancedPatterns.jsx</a> to govern Pomodoro focus cycles.
      </span>
    )
  },
  {
    title: "useDebounce",
    category: "Custom Hooks",
    badgeColor: "#4f46e5",
    badgeBg: "#e0e7ff",
    useCase: "Delaying input updates by a buffer duration (like 600ms) to throttle server traffic and API requests during rapid keyboard entries.",
    scenario: "API Search Query optimization",
    details: "Delays state changes until typing is finished for 600ms, ensuring you don't dispatch API calls for intermediate keystrokes.",
    scenario2: "Real-time Field Validation checks",
    details2: "Wait until the user finishes typing their password or username for a half-second before dispatching database validation queries.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useDebounce.js">useDebounce.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to optimize search triggers.
      </span>
    )
  },
  {
    title: "useOnlineStatus",
    category: "Custom Hooks",
    badgeColor: "#16a34a",
    badgeBg: "#dcfce7",
    useCase: "Monitoring browser settings to track connection drops, enabling auto-saving configurations or warnings dynamically.",
    scenario: "Offline Alert Banner",
    details: "Listens to the browser online/offline status and exposes a simple boolean flag, allowing the component tree to dynamically adjust connection messages.",
    scenario2: "Save Button Disabler",
    details2: "Dynamically disables database submit/save functions if user network connectivity drops to prevent network failures.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useOnlineStatus.js">useOnlineStatus.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to render status tags.
      </span>
    )
  },
  {
    title: "useWindowSize",
    category: "Custom Hooks",
    badgeColor: "#2563eb",
    badgeBg: "#dbeafe",
    useCase: "Extracting active screen geometries (width/height dimensions) dynamically to support conditional rendering setups.",
    scenario: "Responsive Sidebar controller",
    details: "Registers a resize listener, updating state for width/height whenever the viewport window changes size.",
    scenario2: "Dynamic Canvas layout resizing",
    details2: "Re-renders graphic bounds on responsive resizes to ensure pixel-perfect renders.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useWindowSize.js">useWindowSize.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to display responsive layout categories.
      </span>
    )
  },
  {
    title: "useToggle",
    category: "Custom Hooks",
    badgeColor: "#7c3aed",
    badgeBg: "#f3e8ff",
    useCase: "Bundling a simple true/false boolean flag state with a memoized callback function toggle handler to minimize form state declarations.",
    scenario: "Toggling Custom Drawer panel visibility",
    details: "Returns a boolean value and a memoized toggle function helper that flips the value, simplifying basic toggle states.",
    scenario2: "Collapsible Accordion visibility",
    details2: "Toggles whether individual FAQ items are open or closed when user clicks on card headings.",
    projectExample: (
      <span>
        Defined in <a href="file:///c:/Projects/react-fundamentals/src/hooks/useToggle.js">useToggle.js</a> and used in <a href="file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx">CustomHooksTab.jsx</a> to switch visible dialog cards.
      </span>
    )
  }
];

function HooksReferenceTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHooks = REFERENCE_HOOKS.filter(hook =>
    hook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hook.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hook.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hook.scenario.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hook.scenario2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hooks-reference-tab">
      <div className="demo-section-header">
        <div className="demo-title-container">
          <h2>📚 Complete Hooks Reference & Code Directory</h2>
          <p className="demo-description">A compiled catalog of all 18 hooks used in your project, showcasing use cases, real-world examples, and exact file link pointers.</p>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="🔍 Search hooks by name, category, scenario, or use case description..."
          className="list-filter-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ margin: 0, padding: '0.9rem 1.25rem' }}
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
          Showing {filteredHooks.length} of {REFERENCE_HOOKS.length} reference hooks
        </div>
      </div>

      <div className="hooks-reference-grid">
        {filteredHooks.length > 0 ? (
          filteredHooks.map((hook) => (
            <div key={hook.title} className="hook-ref-card">
              <div>
                <div className="hook-ref-header">
                  <h3 className="hook-ref-title">
                    <code>{hook.title}</code>
                  </h3>
                  <span 
                    className="hook-ref-category"
                    style={{ 
                      color: hook.badgeColor, 
                      background: hook.badgeBg, 
                      border: `1px solid ${hook.badgeColor}22`
                    }}
                  >
                    {hook.category}
                  </span>
                </div>

                <div className="hook-ref-usecase-section" style={{ borderLeft: `3.5px solid ${hook.badgeColor}` }}>
                  <span className="hook-ref-label">
                    🛠️ Common Use Case:
                  </span>
                  <p className="hook-ref-usecase-text">
                    {hook.useCase}
                  </p>
                </div>

                <div className="hook-ref-scenarios-section">
                  <span className="hook-ref-label">
                    💡 Real-World Scenarios:
                  </span>
                  <div className="hook-ref-scenarios-list">
                    <div className="hook-ref-scenario-box">
                      <strong>1. {hook.scenario}:</strong> {hook.details}
                    </div>
                    <div className="hook-ref-scenario-box">
                      <strong>2. {hook.scenario2}:</strong> {hook.details2}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hook-ref-project-section">
                <span className="hook-ref-label">
                  📂 Usage in This Project:
                </span>
                <div className="hook-ref-project-text">
                  {hook.projectExample}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: 'span 2', padding: '3rem', textAlign: 'center', color: '#64748b', fontWeight: 600 }}>
            No hooks matching your search query. Try typing something else! 🔍
          </div>
        )}
      </div>
    </div>
  );
}

export default HooksReferenceTab;
