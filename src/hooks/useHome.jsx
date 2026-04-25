import React, { useCallback, useState } from "react";
import useUtils from "./useUtils";

function useHome() {
  const { getRequest } = useUtils();
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPopularMovies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [movieData, tvShowData] = await Promise.all([
        getRequest("https://api.themoviedb.org/3/movie/popular"),
        getRequest("https://api.themoviedb.org/3/tv/popular"),
      ]);
      //make sure results exists first
      const [movieResults, tvShowResults] = [
        movieData.results.map((result) => ({
          ...result,
          type: "movie",
          vote_average: result.vote_average.toFixed(1),
        })),
        tvShowData.results.map((result) => ({
          ...result,
          type: "tv",
          vote_average: result.vote_average.toFixed(1),
        })),
      ];
      setPopularMovies(movieResults);
      setPopularTvShows(tvShowResults);
    } catch (error) {
      console.log(`Error trying to access the movies: \n ${error}`);
      setError(error.message || "Failed to fetch popular movies.");
      setPopularMovies([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getPopularMovies,
    popularMovies,
    popularTvShows,
    loading,
    error,
  };
}

export default useHome;
