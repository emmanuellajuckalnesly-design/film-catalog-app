import React from 'react';

function FilmCard({ film, toggleFavoris, deleteFilm }) {
  return (
    <div className="film-card">
      <div className="film-poster">{film.poster}</div>
      
      <div className="film-content">
        <h3>{film.titre}</h3>
        
        <div className="film-info">
          <span className="genre">{film.genre}</span>
          <span className="annee">{film.annee}</span>
          <span className="note">⭐ {film.note}/10</span>
        </div>

        <p className="description">{film.description}</p>

        <div className="film-actions">
          <button
            className={`favoris-btn ${film.favoris ? 'active' : ''}`}
            onClick={() => toggleFavoris(film.id)}
            title="Ajouter aux favoris"
          >
            {film.favoris ? '❤️ Favoris' : '🤍 Favoris'}
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteFilm(film.id)}
            title="Supprimer"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilmCard;