import { useCallback, useMemo, useRef, useState } from "react";
import { seachMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);

  const previusSearch = useRef(search);

  const getMovies = useCallback( async () => {
    if (search == previusSearch.current) return;
    const newMovies = await seachMovies({ search });
    setMovies(newMovies);
    previusSearch.current = search;
  }, []);



  const sortedMovies = useMemo(()=>{
    return sort 
    ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
    : movies
  },[sort, movies]) 

  

  return { movies: sortedMovies, getMovies };
}
