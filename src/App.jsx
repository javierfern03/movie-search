import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isfirstInput = useRef(true)
  
  useEffect(() => {
    if(isfirstInput.current){
      isfirstInput.current = search == ""
      return
    }
    if (search == "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {

  const [sort, setsort] = useState(false)

  const { search, updateSearch, error } = useSearch();
  const { movies,getMovies } = useMovies({search, sort});

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search})
  };

  const handleChange = (e) => {
    updateSearch(e.target.value);
  };

  const handleSort = ()=>{
    setsort(!sort)
  }

  return (
    <div className="page">
      <h1>buscador de peliculas</h1>
      <header>
        <form onSubmit={handleSubmit} className="">
          <input
            onChange={handleChange}
            value={search}
            name="query"
            type="text"
            placeholder="Avenger, Star Wars, The Matrix..."
          />
          <input type="checkbox"  onChange={handleSort} checked={sort}/>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
