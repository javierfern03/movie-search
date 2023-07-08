import { useCallback, useMemo, useRef, useState } from "react";
import { seachMovies } from "../services/movies";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const previusSearch = useRef(search);


  const getMovies = useCallback( async ({search}) => {
    if (search == previusSearch.current) return;

    
    try{
      const newMovies = await seachMovies({ search });
      setMovies(newMovies);
      previusSearch.current = search;

    }catch{
      console.log("error")
    }
  }, []);



  const sortedMovies = useMemo(()=>{
    return sort 
    ? [...movies].sort((a,b) => a.title.localeCompare(b.title))
    : movies
  },[sort, movies]) 

  

  return { movies: sortedMovies, getMovies };
}
