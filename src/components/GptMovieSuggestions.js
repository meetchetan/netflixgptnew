import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { moviesResults, moviesNames } = gpt;
  if (!moviesNames) return "null";
  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      <div>
        {moviesNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={moviesResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
