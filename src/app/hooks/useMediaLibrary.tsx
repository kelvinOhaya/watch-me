import { useEffect, useState } from "react";
import { Movie, PopularMovies, PopularTVShows, TV } from "../types";
import {
  fetchMovieDetails,
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchTVDetails,
} from "../api/movieApi";

function useMediaLibrary() {
  const [popularMovies, setPopularMovies] = useState<PopularMovies | null>(
    null,
  );

  const [popularTVShows, setPopularTVShows] = useState<PopularTVShows | null>(
    null,
  );

  const [currentShow, setCurrentShow] = useState<Movie | TV | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  //fetch the popular movies and tv shows
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [popularMoviesData, popularTVShowsData] = await Promise.all([
          fetchPopularMovies(),
          fetchPopularTVShows(),
        ]);
        if (!mounted) return;
        setPopularMovies(popularMoviesData);
        setPopularTVShows(popularTVShowsData);
      } catch (error) {
        console.error(error);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  //set the currentShow to a movie
  async function getMovieDetails(id: number) {
    setIsLoadingDetails(true);
    try {
      const data: Movie = await fetchMovieDetails(id);
      if (data !== currentShow) {
        setCurrentShow(data);
      }
    } finally {
      setIsLoadingDetails(false);
    }
  }
  //set the currentShow to a tv show
  async function getTVDetails(id: number) {
    setIsLoadingDetails(true);
    try {
      const data: TV = await fetchTVDetails(id);
      if (data !== currentShow) {
        setCurrentShow(data);
      }
    } finally {
      setIsLoadingDetails(false);
    }
  }

  return {
    popularMovies,
    popularTVShows,
    currentShow,
    isLoadingDetails,
    getMovieDetails,
    getTVDetails,
  };
}

export default useMediaLibrary;
