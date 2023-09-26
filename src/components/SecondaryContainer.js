import React from 'react'
import MovieList from "../components/MovieList"

const SecondaryContainer = () => {
  return (
    <div>
      <MovieList title = {"Now Playing"}  />
      {/* 
      Movie list - popular
      moviecard * n
      Movie list - Trending
      Movie list - Now Playing
      Movie list - hooror
      */}
    </div>
  )
}

export default SecondaryContainer