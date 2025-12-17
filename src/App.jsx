import { useState, useEffect } from "react";
import "./App.css";

import FilmList from "./components/FilmList";
import SearchBar from "./components/SearchBar";
import FilterGenre from "./components/FilterGenre";

function App() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Tous");

  // 🎬 Films de démonstration
  // Dans votre App.js, ajoutez ces films avec des descriptions améliorées
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

  const genres = ["Tous", ...new Set(films.map((f) => f.genre))];

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Catalogue de Films</h1>
        <p>Découvrez et gérez votre collection de films</p>
      </header>

      <div className="container">
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
          <p>📊 {filmsFiltres.length} film(s) trouvé(s)</p>
        </div>

        <FilmList
          films={filmsFiltres}
          toggleFavoris={toggleFavoris}
          deleteFilm={deleteFilm}
        />
      </div>
    </div>
  );
}

export default App;
