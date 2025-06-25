import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};