import React from 'react';
import FilmCard from './FilmCard';

function FilmList({ films, toggleFavoris, deleteFilm }) {
  if (films.length === 0) {
    return (
      <div className="no-films">
        <p>❌ Aucun film trouvé</p>
      </div>
    );
  }

  return (
    <div className="film-list">
      {films.map(film => (
        <FilmCard 
          key={film.id} 
          film={film} 
          toggleFavoris={toggleFavoris}
          deleteFilm={deleteFilm}
        />
      ))}
    </div>
  );
}

export default FilmList;