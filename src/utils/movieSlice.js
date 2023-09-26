import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailrerVideo: (state, action) => {
      state.trailerVideo = action.payload
    },
  },
});

export const { addNowPlayingMovies, addTrailrerVideo } = movieSlice.actions;

export default movieSlice.reducer;
