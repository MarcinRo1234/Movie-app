import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useState, useEffect } from "react";
import { getPopularMovies, searchMovies } from "../services/api";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const movies = [
  //   { id: 1, title: "Call of Booty", release_date: "2018" },
  //   { id: 2, title: "Doctor do me a little", release_date: "2000" },
  //   { id: 3, title: "Ass titans", release_date: "2025" },
  //   { id: 4, title: "Asian gods", release_date: "2021" },
  //   { id: 5, title: "Hello", release_date: "2022" },
  // ];

  // const movies = getPopularMovies()
  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Faile to load movies");
      } finally {
        setLoading(false);
      } 
    };
    loadPopularMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("handleSearch działa");
    setSearchQuery("");
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Wyszukaj Film"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map(
            (movie) =>
              movie.title.toLowerCase().startsWith(searchQuery) && (
                <MovieCard movie={movie} key={movie.id} />
              ),
          )}
        </div>
      )}
    </div>
  );
}
