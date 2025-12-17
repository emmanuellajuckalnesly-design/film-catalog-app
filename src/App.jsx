// src/App.js
import { useState, useEffect } from "react";
import "./App.css";

import FilmList from "./components/FilmList";
import SearchBar from "./components/SearchBar";
import FilterGenre from "./components/FilterGenre";
import TrendingCarousel from "./components/TrendingCarousel";
import MyList from "./components/MyList";
import FilmModal from "./components/FilmModal";
import AddFilmForm from "./components/AddFilmForm";

function App() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🎬 Films de démonstration améliorés
  const filmsInitiaux = [
    {
      id: 1,
      titre: "Inception",
      genre: "Science-Fiction",
      annee: 2010,
      note: 8.8,
      description: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction : le vol de secrets dans les rêves.",
      poster: "🎭",
      favoris: false,
    },
    {
      id: 2,
      titre: "Interstellar",
      genre: "Science-Fiction",
      annee: 2014,
      note: 8.6,
      description: "Pour sauver l'humanité, un groupe d'explorateurs utilise un vaisseau interstellaire pour franchir un trou de ver.",
      poster: "🚀",
      favoris: false,
    },
    {
      id: 3,
      titre: "The Dark Knight",
      genre: "Action",
      annee: 2008,
      note: 9.0,
      description: "Batman accepte de relever son plus grand défi : affronter le Joker, un criminel d'une cruauté inédite.",
      poster: "🦇",
      favoris: false,
    },
    {
      id: 4,
      titre: "Pulp Fiction",
      genre: "Thriller",
      annee: 1994,
      note: 8.9,
      description: "Les vies de deux tueurs à gages, d'un boxeur et d'un gangster s'entremêlent dans une histoire de crime.",
      poster: "🔫",
      favoris: false,
    },
    {
      id: 5,
      titre: "La La Land",
      genre: "Musical",
      annee: 2016,
      note: 8.0,
      description: "Un musicien de jazz et une actrice en herbe tombent amoureux à Los Angeles tout en poursuivant leurs rêves.",
      poster: "🎵",
      favoris: false,
    },
    {
      id: 6,
      titre: "Parasite",
      genre: "Thriller",
      annee: 2019,
      note: 8.6,
      description: "Une famille pauvre s'infiltre dans le quotidien d'une riche famille en se faisant passer pour des employés.",
      poster: "🏆",
      favoris: false,
    },
    {
      id: 7,
      titre: "The Shawshank Redemption",
      genre: "Drame",
      annee: 1994,
      note: 9.3,
      description: "Un banquier est condamné à la prison à vie et développe une amitié profonde avec un autre détenu.",
      poster: "🔓",
      favoris: false,
    },
    {
      id: 8,
      titre: "Avengers: Endgame",
      genre: "Action",
      annee: 2019,
      note: 8.4,
      description: "Les Avengers restants tentent de restaurer l'univers après les actions dévastatrices de Thanos.",
      poster: "🦸",
      favoris: false,
    },
  ];

  // 🔁 Chargement initial
  useEffect(() => {
    const filmsStockes = localStorage.getItem("films");
    if (filmsStockes) {
      setFilms(JSON.parse(filmsStockes));
    } else {
      setFilms(filmsInitiaux);
      localStorage.setItem("films", JSON.stringify(filmsInitiaux));
    }
  }, []);

  // 💾 Sauvegarde automatique
  useEffect(() => {
    if (films.length > 0) {
      localStorage.setItem("films", JSON.stringify(films));
    }
  }, [films]);

  // 🔍 Filtrage
  const filmsFiltres = films.filter((film) => {
    const matchSearch = film.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchGenre =
      selectedGenre === "Tous" || film.genre === selectedGenre;
    return matchSearch && matchGenre;
  });

  // ⭐ Favoris
  const toggleFavoris = (id) => {
    setFilms((prevFilms) =>
      prevFilms.map((film) =>
        film.id === id ? { ...film, favoris: !film.favoris } : film
      )
    );
  };

  // 🗑️ Suppression
  const deleteFilm = (id) => {
    setFilms((prevFilms) => prevFilms.filter((film) => film.id !== id));
  };

  // 🎬 Ajout d'un film
  const addFilm = (newFilm) => {
    setFilms((prevFilms) => [...prevFilms, newFilm]);
  };

  // 🎞️ Ouvrir modal détail
  const openFilmModal = (film) => {
    setSelectedFilm(film);
    setIsModalOpen(true);
  };

  // ❌ Fermer modal
  const closeFilmModal = () => {
    setIsModalOpen(false);
    setSelectedFilm(null);
  };

  const genres = ["Tous", ...new Set(films.map((f) => f.genre))];

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🎬 CATALOGUE PREMIUM</h1>
          <p>Votre cinémathèque personnelle - Découvrez, organisez, profitez</p>
        </div>
      </header>

      <div className="container">
        {/* Section Trending */}
        <TrendingCarousel films={films} />

        {/* Section Ma Liste */}
        <MyList films={films} toggleFavoris={toggleFavoris} />

        {/* Section Recherche et Filtres */}
        <div className="controls-section">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          <FilterGenre
            genres={genres}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
          />

          <div className="stats">
            <p>📊 {filmsFiltres.length} FILM(S) TROUVÉ(S) • 🎯 {selectedGenre} • 🔍 "{searchTerm || 'Tous'}"</p>
          </div>
        </div>

        {/* Liste des Films */}
        <FilmList
          films={filmsFiltres}
          toggleFavoris={toggleFavoris}
          deleteFilm={deleteFilm}
          onFilmClick={openFilmModal} // Ajout de cette prop
        />
      </div>

      {/* Modal Détail Film */}
      <FilmModal
        film={selectedFilm}
        isOpen={isModalOpen}
        onClose={closeFilmModal}
        toggleFavoris={toggleFavoris}
        deleteFilm={deleteFilm}
      />

      {/* Bouton Ajout Film */}
      <AddFilmForm onAddFilm={addFilm} />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>🎥 Catalogue de Films Premium • © {new Date().getFullYear()} • Made with ❤️</p>
          <p className="footer-stats">
            {films.length} films • {films.filter(f => f.favoris).length} favoris • {Math.max(...films.map(f => f.note))}/10 meilleure note
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;