// components/FilmList.jsx
import React from 'react';
import './FilmList.css';

const FilmList = ({ films, toggleFavoris, deleteFilm }) => {
  // Images réelles des films (remplacez par vos URLs préférées)
  const filmImages = {
    1: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    2: "https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    3: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    4: "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    5: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    6: "https://images.unsplash.com/photo-1489599809516-9827b6d1cf13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  };

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2); // Convertir sur 5 étoiles
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  if (films.length === 0) {
    return (
      <div className="no-films">
        <h3>🎬 Aucun film trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    );
  }

  return (
    <div className="film-list">
      {films.map((film) => (
        <div key={film.id} className="film-card">
          <div className="film-poster">
            <img 
              src={filmImages[film.id]} 
              alt={film.titre}
              className="poster-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = `linear-gradient(45deg, var(--netflix-red), var(--netflix-dark))`;
              }}
            />
            <div className="poster-overlay"></div>
            <div className="poster-emoji">{film.poster}</div>
            <div className="film-overlay">
              <button 
                className={`quick-favoris ${film.favoris ? 'active' : ''}`}
                onClick={() => toggleFavoris(film.id)}
              >
                {film.favoris ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
          
          <div className="film-content">
            <div className="film-header">
              <h3>{film.titre}</h3>
              <div className="film-badge">{film.favoris ? '⭐' : ''}</div>
            </div>
            
            <div className="film-meta">
              <span className="genre-tag">{film.genre}</span>
              <span className="year-tag">{film.annee}</span>
            </div>
            
            <div className="rating">
              <span className="rating-stars">{renderStars(film.note)}</span>
              <span className="rating-value">{film.note}/10</span>
            </div>
            
            <p className="description">{film.description}</p>
            
            <div className="film-actions">
              <button
                className={`action-btn favoris-btn ${film.favoris ? 'active' : ''}`}
                onClick={() => toggleFavoris(film.id)}
              >
                {film.favoris ? '❤️ Retirer' : '🤍 Ajouter'}
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => deleteFilm(film.id)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmList;