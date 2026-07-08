// Main App Component - Root component that sets up routing for the entire application
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import AdvancedPatterns from './pages/AdvancedPatterns';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import Footer from './pages/Footer';
import Playground from './pages/Playground.jsx';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navigation />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/advanced-patterns" element={<AdvancedPatterns />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>


          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
