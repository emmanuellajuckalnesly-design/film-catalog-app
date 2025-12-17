// components/FilmModal.jsx
import React from 'react';
import './FilmModal.css';

const FilmModal = ({ film, isOpen, onClose, toggleFavoris, deleteFilm }) => {
  if (!isOpen || !film) return null;

  const renderStars = (rating) => {
    const stars = Math.round(rating / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <div className="modal-poster">
            <div className="modal-emoji">{film.poster}</div>
          </div>
          
          <div className="modal-info">
            <h2>{film.titre} ({film.annee})</h2>
            
            <div className="modal-meta">
              <span className="modal-genre">{film.genre}</span>
              <span className="modal-rating">
                <span className="stars">{renderStars(film.note)}</span>
                <strong>{film.note}/10</strong>
              </span>
              <span className="modal-duration">⏱️ 2h 28m</span>
            </div>
            
            <p className="modal-description">{film.description}</p>
            
            <div className="modal-actions">
              <button className={`modal-btn watch-btn ${film.favoris ? 'active' : ''}`}>
                ▶ REGARDER MAINTENANT
              </button>
              <button 
                className={`modal-btn fav-btn ${film.favoris ? 'active' : ''}`}
                onClick={() => toggleFavoris(film.id)}
              >
                {film.favoris ? '❤️ RETIRER DES FAVORIS' : '🤍 AJOUTER AUX FAVORIS'}
              </button>
              <button 
                className="modal-btn delete-btn"
                onClick={() => {
                  deleteFilm(film.id);
                  onClose();
                }}
              >
                🗑️ SUPPRIMER LE FILM
              </button>
            </div>
            
            <div className="modal-details">
              <div className="detail-item">
                <strong>Réalisateur:</strong> Christopher Nolan
              </div>
              <div className="detail-item">
                <strong>Acteurs:</strong> Leonardo DiCaprio, Tom Hardy
              </div>
              <div className="detail-item">
                <strong>Langue:</strong> Anglais
              </div>
              <div className="detail-item">
                <strong>Sous-titres:</strong> Français, Anglais
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-similar">
          <h3>FILMS SIMILAIRES</h3>
          <div className="similar-films">
            <div className="similar-film">🎬 Tenet</div>
            <div className="similar-film">🕶️ The Matrix</div>
            <div className="similar-film">🌌 Gravity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmModal;