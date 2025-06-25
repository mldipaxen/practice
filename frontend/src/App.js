import React, { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';
import UrlForm from './components/UrlForm';
import UrlList from './components/UrlList';
import './App.css';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <button 
      onClick={() => setDarkMode(!darkMode)}
      className="theme-toggle"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

const AppContent = () => {
  const [urls, setUrls] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUrls = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/urls/');
      if (!response.ok) throw new Error('Failed to fetch URLs');
      const data = await response.json();
      setUrls(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Сокращение ссылок</h1>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <UrlForm onSuccess={fetchUrls} />
        
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <UrlList urls={urls} refreshList={fetchUrls} />
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
