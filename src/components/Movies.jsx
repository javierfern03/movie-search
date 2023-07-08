import React from "react";
import results from "../mocks/results.json"

export function ListOfMovies ({movies}) {
  return (
    <ul className="movies">
      {movies?.map((movie) => (
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <div>
          <img src={movie.poster} alt={movie.title} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export function NoMoviesResults (){
  return(
    <p>No se encontraron peliculas</p>
  )
}

export function Movies ({movies}){
  const hasMovies = results.Response;
  
  return(
    hasMovies ? <ListOfMovies movies={movies}/> : <NoMoviesResults/>
  )
}