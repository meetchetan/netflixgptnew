//  done till 2 hr 20 minutes

import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchtext = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchtext.current.value);
    // Make an api call to GPT API and get movie results

    const gptQuery =
      "Act as a Movie recommendation system and suggest some movie for the query" +
      searchtext.current.value +
      "Only give me names of 5 movies, comma sapratedlike the example result given ahead. Example Result: gadar, Sholey, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      console.log("Np movie found")
    }
    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
    // for each movie i will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Pomise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);
  };

  return (
    <div className="pt-[10%] justify-center flex">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchtext}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlacehHolder}
        />
        <button
          className="m-4 col-span-3 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
