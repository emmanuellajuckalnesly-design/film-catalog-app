// components/TrendingCarousel.jsx
import React, { useState } from 'react';
import './TrendingCarousel.css';

const TrendingCarousel = ({ films }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const trendingFilms = films
    .filter(film => film.note >= 8.5)
    .slice(0, 5);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingFilms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingFilms.length) % trendingFilms.length);
  };

  if (trendingFilms.length === 0) return null;

  return (
    <div className="trending-section">
      <div className="section-header">
        <h2>🔥 TENDANCE EN CE MOMENT</h2>
        <div className="carousel-controls">
          <button onClick={prevSlide} className="carousel-btn">←</button>
          <button onClick={nextSlide} className="carousel-btn">→</button>
        </div>
      </div>
      
      <div className="trending-carousel">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {trendingFilms.map((film) => (
            <div key={film.id} className="trending-card">
              <div className="trending-poster">
                <div className="trending-badge">⭐ TENDANCE</div>
                <div className="poster-emoji-large">{film.poster}</div>
                <div className="trending-overlay">
                  <div className="trending-info">
                    <h3>{film.titre}</h3>
                    <p className="trending-description">{film.description}</p>
                    <div className="trending-meta">
                      <span className="trending-genre">{film.genre}</span>
                      <span className="trending-year">{film.annee}</span>
                      <span className="trending-rating">★ {film.note}/10</span>
                    </div>
                    <button className="trending-watch-btn">▶ REGARDER</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-dots">
        {trendingFilms.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingCarousel;