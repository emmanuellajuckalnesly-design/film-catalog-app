// components/AddFilmForm.jsx
import React, { useState } from 'react';
import './AddFilmForm.css';

const AddFilmForm = ({ onAddFilm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    titre: '',
    genre: 'Action',
    annee: new Date().getFullYear(),
    note: 8.0,
    description: '',
    poster: '🎬'
  });

  const genres = [
    'Action', 'Science-Fiction', 'Drame', 'Comédie', 
    'Thriller', 'Horreur', 'Romance', 'Animation',
    'Documentaire', 'Fantasy', 'Aventure', 'Mystère'
  ];

  const posters = [
    '🎬', '🚀', '🦇', '🔫', '👻', '💖', '👑', '⚔️',
    '🕵️', '🎭', '🎪', '🎨', '📽️', '🌟', '🌈', '🔥'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFilm = {
      id: Date.now(),
      ...formData,
      favoris: false
    };
    onAddFilm(newFilm);
    setFormData({
      titre: '',
      genre: 'Action',
      annee: new Date().getFullYear(),
      note: 8.0,
      description: '',
      poster: '🎬'
    });
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <button className="add-film-fab" onClick={() => setIsOpen(true)}>
        <span className="fab-icon">+</span>
        <span className="fab-label">AJOUTER UN FILM</span>
      </button>

      {isOpen && (
        <div className="add-film-modal" onClick={() => setIsOpen(false)}>
          <div className="add-film-content" onClick={e => e.stopPropagation()}>
            <button className="close-form" onClick={() => setIsOpen(false)}>✕</button>
            
            <h2>🎬 AJOUTER UN NOUVEAU FILM</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>TITRE DU FILM *</label>
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    required
                    placeholder="Inception, Interstellar..."
                  />
                </div>

                <div className="form-group">
                  <label>GENRE</label>
                  <select 
                    name="genre" 
                    value={formData.genre}
                    onChange={handleChange}
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>ANNÉE</label>
                  <input
                    type="number"
                    name="annee"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.annee}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>NOTE /10</label>
                  <div className="rating-input">
                    <input
                      type="range"
                      name="note"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formData.note}
                      onChange={handleChange}
                    />
                    <span className="rating-value">{formData.note}</span>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label>DESCRIPTION</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Décrivez le film..."
                  />
                </div>

                <div className="form-group full-width">
                  <label>CHOISISSEZ UN EMOJI</label>
                  <div className="poster-options">
                    {posters.map(poster => (
                      <button
                        key={poster}
                        type="button"
                        className={`poster-option ${formData.poster === poster ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, poster})}
                      >
                        {poster}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsOpen(false)}>
                  ANNULER
                </button>
                <button type="submit" className="submit-btn">
                  AJOUTER LE FILM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFilmForm;