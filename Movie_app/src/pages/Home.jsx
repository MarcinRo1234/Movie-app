import MovieCard from "../components/MovieCard";
import{useState} from 'react'
export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { id: 1, title: "Call of Booty", release_date: "2018" },
    { id: 2, title: "Doctor do me a little", release_date: "2000" },
    { id: 3, title: "Ass titans", release_date: "2025" },
    { id: 4, title: "Asian gods", release_date: "2021" },
    { id: 5, title: "Hello", release_date: "2022" },
  ];
  const handleSearch = (e) => {
    e.preventDefault()
    console.log("handleSearch działa");
    setSearchQuery("")
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
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="movies-grid">
        {movies.map((movie) => (
          movie.title.toLowerCase().startsWith(searchQuery) && <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
