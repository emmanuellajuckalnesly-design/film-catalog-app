// components/MyList.jsx
import React from 'react';
import './MyList.css';

const MyList = ({ films, toggleFavoris }) => {
  const favoriteFilms = films.filter(film => film.favoris);

  if (favoriteFilms.length === 0) {
    return (
      <div className="my-list-section">
        <h2>📁 MA LISTE</h2>
        <div className="empty-list">
          <div className="empty-icon">🎬</div>
          <h3>Votre liste est vide</h3>
          <p>Ajoutez des films à vos favoris pour les retrouver ici</p>
        </div>
      </div>
    );
  }

  return (
    <div className="my-list-section">
      <div className="section-header">
        <h2>📁 MA LISTE ({favoriteFilms.length})</h2>
      </div>
      
      <div className="my-list-grid">
        {favoriteFilms.map(film => (
          <div key={film.id} className="my-list-card">
            <div className="my-list-poster">
              <div className="my-list-emoji">{film.poster}</div>
              <button 
                className="remove-from-list"
                onClick={() => toggleFavoris(film.id)}
                title="Retirer de la liste"
              >
                ❌
              </button>
            </div>
            <div className="my-list-info">
              <h4>{film.titre}</h4>
              <div className="my-list-meta">
                <span>{film.annee}</span>
                <span>★ {film.note}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyList;