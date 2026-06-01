import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDark: isDarkMode,
    colors: isDarkMode ? {
      bg: '#1a1a1a',
      text: '#ffffff',
      card: '#2d2d2d',
      accent: '#667eea',
      border: '#444'
    } : {
      bg: '#ffffff',
      text: '#333',
      card: '#f5f5f5',
      accent: '#667eea',
      border: '#ddd'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
