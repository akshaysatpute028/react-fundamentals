# 🚀 React Fundamentals & Hooks Playground

Welcome to your interactive **React Fundamentals and Hooks Showcase**! This project is a complete learning catalog designed to demonstrate the implementation, use cases, and performance differences of various React hooks (including Concurrent rendering features and custom hooks) in real-world scenarios.

---

## 🛠️ How to Get Started

### 1. Install Dependencies
Run this command in your project terminal to install all required libraries (Bootstrap, React Router DOM, React Icons, etc.):
```bash
npm install
```

### 2. Start the Development Server
Run this command to boot up the application locally:
```bash
npm start
```
Once started, open [http://localhost:3000](http://localhost:3000) to view and test the interactive visual playground.

---

## 🧠 Comprehensive Hooks & Use Cases Directory

Below is the directory of all **18 hooks** implemented in this project, explaining their purpose, general use cases, and exact implementation paths.

### 📦 I. Core State & Side Effect Hooks

#### 1. `useState`
*   **Purpose**: Adds local state variables to functional components.
*   **Common Use Case**: Managing text input states, active selection tabs, modal visibilities, or toggle flags.
*   **Usage in This Project**:
    *   [QuizRegister.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/QuizRegister.jsx#L9-L11): Handles player registration text input values.
    *   [Playground.jsx](file:///c:/Projects/react-fundamentals/src/pages/Playground.jsx#L20): Controls which category tab is actively showing in the sidebar.

#### 2. `useEffect`
*   **Purpose**: Executes asynchronous side-effects (API requests, subscriptions, direct DOM styling updates) and handles cleanup routines.
*   **Common Use Case**: Running component init calls, starting timer intervals, or subscribing to browser event handlers.
*   **Usage in This Project**:
    *   [QuizTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/QuizTab.jsx): Triggers a countdown decrement interval and clears it upon quiz unmount.
    *   [CustomHooksTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx): Listens to window resizing and online status changes to log events.

#### 3. `useContext`
*   **Purpose**: Subscribes directly to a React Context Provider, bypassing intermediate layers of manual props passing (prop-drilling).
*   **Common Use Case**: Sharing global values like theme colors, active user sessions, or language locales.
*   **Usage in This Project**:
    *   [ThemeContext.js](file:///c:/Projects/react-fundamentals/src/context/ThemeContext.js): Defines global styling configurations for light/dark mode.
    *   [ThemeSettingsTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/ThemeSettingsTab.jsx): Subscribes to context elements to toggle application styling theme instantly.

#### 4. `useReducer`
*   **Purpose**: Standardizes complex state changes through a consolidated reducer and a dispatched action mechanism.
*   **Common Use Case**: Managing multi-step forms, shopping cart states, or complex boards.
*   **Usage in This Project**:
    *   [KanbanTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/KanbanTab.jsx): Triggers card column mutations (`ADD_CARD`, `MOVE_CARD`, `DELETE_CARD`).
    *   [useTodoReducer.js](file:///c:/Projects/react-fundamentals/src/hooks/useTodoReducer.js): Directs todo state updates.

---

### ⚡ II. Optimization & DOM Hooks

#### 5. `useRef`
*   **Purpose**: Creates a mutable persistent reference whose `.current` attribute doesn't trigger component re-renders when mutated. Usually used to target DOM nodes.
*   **Common Use Case**: Programmatic text focusing, targeting HTML5 audio/video tags, or keeping track of previous state snapshots.
*   **Usage in This Project**:
    *   [AdvancedPatterns.jsx](file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx#L28): Targets notes fields to automatically refocus inputs when notes are saved.
    *   [DOMMeasurerTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx): Obtains direct handles on DOM elements to calculate widths/heights.

#### 6. `useMemo`
*   **Purpose**: Caches the computed values of heavy functions, preventing recalculation on re-renders unless dependency variables change.
*   **Common Use Case**: Throttling heavy search algorithms, complex chart maps, or layout rendering data.
*   **Usage in This Project**:
    *   [TextAnalyzerTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/TextAnalyzerTab.jsx): Skips repeating text character analysis when changing unrelated panel inputs.
    *   [AdvancedPatterns.jsx](file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx#L52): Calculates note filter strings and lists total/pending todo task metrics.

#### 7. `useCallback`
*   **Purpose**: Memoizes (caches) entire function definitions to maintain function reference integrity between renders.
*   **Common Use Case**: Passing click handlers or actions to children wrapped in `React.memo` to prevent redundant rendering cycles.
*   **Usage in This Project**:
    *   [AdvancedPatterns.jsx](file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx#L77): Wraps note updates (`addNote`, `deleteNote`) so keystrokes don't recreate them.

#### 8. `useLayoutEffect`
*   **Purpose**: Runs side effects synchronously *before* the browser paints the updated layout to the viewport screen.
*   **Common Use Case**: Reading geometric dimensions of an element to dynamically position alerts or custom tooltips without causing visible jumps.
*   **Usage in This Project**:
    *   [DOMMeasurerTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/DOMMeasurerTab.jsx): Synchronously reads dynamic DOM element rectangles.

#### 9. `useImperativeHandle`
*   **Purpose**: Exposes custom functions inside a child component upwardly to a parent ref handler.
*   **Common Use Case**: Writing clean programmatic child controller APIs (like modals, notifications, or slideshow players).
*   **Usage in This Project**:
    *   [AlertDrawer.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/AlertDrawer.jsx#L8): Exposes `.openAlert()` and `.closeAlert()` directly to the parent drawer tab.

#### 10. `useId`
*   **Purpose**: Generates stable, collision-free, unique IDs for HTML forms.
*   **Common Use Case**: Enhancing accessibility tags by linking `<input>` elements with helper labels cleanly.
*   **Usage in This Project**:
    *   [AccessibleFormTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/AccessibleFormTab.jsx): Dynamically anchors input fields to custom description prompts.

---

### ⏱️ III. Concurrent Rendering Hooks (React 18+)

#### 11. `useTransition`
*   **Purpose**: Splits state transitions into high-priority updates (e.g. typing inputs) and low-priority background updates (e.g. rendering list items).
*   **Common Use Case**: Preventing keyboard lag when typing to filter very large lists or grids.
*   **Usage in This Project**:
    *   [SlowListTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx#L31): Segregates keystroke typing updates from heavy background list rendering updates.

#### 12. `useDeferredValue`
*   **Purpose**: Defers rendering updates for a specific state variable value when it's slow to compute.
*   **Common Use Case**: Delaying list rendering updates while keeping typing responsive without using transition functions.
*   **Usage in This Project**:
    *   [SlowListTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/SlowListTab.jsx#L33): Defers query states while rendering synthetic heavy items lists.

---

### 🧩 IV. Custom Reusable Hooks

#### 13. `useLocalStorage`
*   **Purpose**: A custom hook wrapping React state with synchronized local storage operations.
*   **Usage**: [useLocalStorage.js](file:///c:/Projects/react-fundamentals/src/hooks/useLocalStorage.js) (keeps notes state persistent in [AdvancedPatterns.jsx](file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx#L17)).

#### 14. `useTimer`
*   **Purpose**: Simplifies interval timers by packing active flags, elapsed counters, and controls into a clean utility.
*   **Usage**: [useTimer.js](file:///c:/Projects/react-fundamentals/src/hooks/useTimer.js) (manages the countdown timer inside [AdvancedPatterns.jsx](file:///c:/Projects/react-fundamentals/src/pages/AdvancedPatterns.jsx#L40)).

#### 15. `useDebounce`
*   **Purpose**: Throttles frequent value mutations by delaying updates until a cooldown period ends.
*   **Usage**: [useDebounce.js](file:///c:/Projects/react-fundamentals/src/hooks/useDebounce.js) (optimizes typing queries in [CustomHooksTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx#L14)).

#### 16. `useOnlineStatus`
*   **Purpose**: Tracks live network connectivity.
*   **Usage**: [useOnlineStatus.js](file:///c:/Projects/react-fundamentals/src/hooks/useOnlineStatus.js) (updates network connectivity status in [CustomHooksTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx#L9)).

#### 17. `useWindowSize`
*   **Purpose**: Keeps responsive height and width state variables updated automatically.
*   **Usage**: [useWindowSize.js](file:///c:/Projects/react-fundamentals/src/hooks/useWindowSize.js) (provides window layout stats in [CustomHooksTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx#L10)).

#### 18. `useToggle`
*   **Purpose**: Minimizes redundant state logic for standard toggling values.
*   **Usage**: [useToggle.js](file:///c:/Projects/react-fundamentals/src/hooks/useToggle.js) (toggles UI panel visibility alerts in [CustomHooksTab.jsx](file:///c:/Projects/react-fundamentals/src/components/playground/CustomHooksTab.jsx#L11)).
