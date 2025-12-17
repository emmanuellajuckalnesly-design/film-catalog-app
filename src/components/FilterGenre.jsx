import React from 'react';

function FilterGenre({ genres, selectedGenre, setSelectedGenre }) {
  return (
    <div className="filter-genre">
      <label>Filtrer par genre :</label>
      <div className="genre-buttons">
        {genres.map(genre => (
          <button
            key={genre}
            className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterGenre;