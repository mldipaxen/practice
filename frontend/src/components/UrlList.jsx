import React, { useState } from 'react';
import './UrlList.css';

const UrlList = ({ urls = [], refreshList }) => {
  const [deletingId, setDeletingId] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Скопировано: ${text}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Удалить эту ссылку?')) return;

    setDeletingId(id);
    try {
      const response = await fetch(`http://localhost:8000/urls/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Произошла ошибка при удалении');
      refreshList();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="url-list-container">
      <h2 className="section-title">Раннее сокращенные</h2>

      {Array.isArray(urls) && urls.length === 0 ? (
        <div className="empty-state">
          <p>Здесь будут ваши сокращенные ссылки</p>
        </div>
      ) : (
        <ul className="urls-grid">
          {Array.isArray(urls) &&
            urls.map((url, index) => {
              if (!url || !url.id) {
                console.warn(`Пропущен некорректный url (index ${index}):`, url);
                return null;
              }

              return (
                <li
                  key={url.id}
                  className={`url-card ${deletingId === url.id ? 'deleting' : ''}`}
                >
                  <button
                    onClick={() => handleDelete(url.id)}
                    className="delete-btn"
                    disabled={deletingId === url.id}
                  >
                    {deletingId === url.id ? 'Deleting...' : '×'}
                  </button>

                  <div className="url-content">
                    <div className="url-main">
                      <a
                        href={`http://localhost:8000/${url.short_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="short-url"
                      >
                        {window.location.host}/{url.short_code}
                      </a>
                      <p className="original-url" title={url.original_url}>
                        {url.original_url?.length > 50
                          ? `${url.original_url.substring(0, 50)}...`
                          : url.original_url || '—'}
                      </p>
                    </div>
                    <div className="url-actions">
                      <button
                        onClick={() =>
                          copyToClipboard(`${window.location.host}/${url.short_code}`)
                        }
                        className="copy-btn"
                      >
                        Скопировать
                      </button>
                    </div>
                  </div>
                  <div className="url-meta">
                    <span className="clicks">
                      Переходы: <strong>{url.clicks ?? 0}</strong>
                    </span>
                    <span className="date">
                      {url.created_at
                        ? new Date(url.created_at).toLocaleDateString()
                        : 'N/A'}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default UrlList;
