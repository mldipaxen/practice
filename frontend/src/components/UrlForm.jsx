import React, { useState } from 'react';
import './UrlForm.css';

const UrlForm = ({ onSuccess }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/urls/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original_url: url }),
      });

      if (!response.ok) {
        throw new Error(response.status === 400 
          ? 'Invalid URL format' 
          : 'Не получилось сократить URL');
      }

      await response.json(); // можно не сохранять, т.к. перезагружаем всё
      onSuccess(); // ⬅️ обновляем список ссылок
      setUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Введите длинный URL"
            className="url-input"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting || !url}
          >
            {isSubmitting ? 'Сокращаем' : 'Сократить'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default UrlForm;
