const API_KEY = "8b96775a";

export const seachMovies = async ({ search }) => {
  if (search == "") return null;

  try {
    const reponse = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&S=${search}`
    );
    const json = await reponse.json();

    const movies = json.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    }));
  } catch (e) {
    throw new Error("error searching movies");
  }
};
