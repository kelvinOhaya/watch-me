import { useEffect, useState } from "react";
import { Movie, MovieCard, TVCard, TV, Watchlist } from "../types";
import { mapMovieToCard, mapTvToCard } from "../api/movieMappers";

const STORAGE_KEY = "watchlist";

function normalizeMovieCard(movie: MovieCard): MovieCard {
  return { ...movie, hasBeenAdded: movie.hasBeenAdded ?? true };
}

function normalizeTVCard(tv: TVCard): TVCard {
  return { ...tv, hasBeenAdded: tv.hasBeenAdded ?? true };
}

function toCard(showObj: MovieCard | TVCard | Movie | TV): MovieCard | TVCard {
  if ("streamingServices" in showObj) {
    return showObj.type === "movie"
      ? {
          ...mapMovieToCard(showObj as Movie),
          hasBeenAdded: showObj.hasBeenAdded ?? false,
        }
      : {
          ...mapTvToCard(showObj as TV),
          hasBeenAdded: showObj.hasBeenAdded ?? false,
        };
  }

  return showObj.type === "movie"
    ? normalizeMovieCard(showObj as MovieCard)
    : normalizeTVCard(showObj as TVCard);
}

function normalizeWatchlist(rawValue: string | null): Watchlist {
  if (!rawValue) {
    return { movies: [], tvShows: [] };
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<Watchlist> | null;
    return {
      movies: Array.isArray(parsed?.movies)
        ? parsed.movies.map((movie) => normalizeMovieCard(movie as MovieCard))
        : [],
      tvShows: Array.isArray(parsed?.tvShows)
        ? parsed.tvShows.map((tv) => normalizeTVCard(tv as TVCard))
        : [],
    };
  } catch (error) {
    console.error("Failed to parse watchlist from localStorage:", error);
    return { movies: [], tvShows: [] };
  }
}

function useWatchlist() {
  const [watchlist, setWatchlist] = useState<Watchlist>(() => {
    if (typeof window === "undefined") {
      return { movies: [], tvShows: [] };
    }

    return normalizeWatchlist(localStorage.getItem(STORAGE_KEY));
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Failed to write watchlist to localStorage:", error);
    }
  }, [watchlist]);

  function hasBeenAdded(showObj: MovieCard | TVCard | Movie | TV): boolean {
    const card = toCard(showObj);
    if (card.type === "movie") {
      return watchlist.movies.some(
        (movie) => movie.id === card.id && movie.hasBeenAdded,
      );
    }

    return watchlist.tvShows.some((tv) => tv.id === card.id && tv.hasBeenAdded);
  }

  function addToWatchlist(showObj: MovieCard | TVCard | Movie | TV) {
    const card = toCard(showObj);

    setWatchlist((prev) => {
      if (card.type === "movie") {
        const movies = prev.movies.some((movie) => movie.id === card.id)
          ? prev.movies.map((movie) =>
              movie.id === card.id ? { ...movie, hasBeenAdded: true } : movie,
            )
          : [...prev.movies, { ...card, hasBeenAdded: true }];

        return { ...prev, movies };
      }

      const tvShows = prev.tvShows.some((tv) => tv.id === card.id)
        ? prev.tvShows.map((tv) =>
            tv.id === card.id ? { ...tv, hasBeenAdded: true } : tv,
          )
        : [...prev.tvShows, { ...card, hasBeenAdded: true }];

      return { ...prev, tvShows };
    });
  }

  function removeFromWatchlist(showObj: MovieCard | TVCard | Movie | TV) {
    const card = toCard(showObj);

    setWatchlist((prev) => {
      if (card.type === "movie") {
        return {
          ...prev,
          movies: prev.movies.map((movie) =>
            movie.id === card.id ? { ...movie, hasBeenAdded: false } : movie,
          ),
        };
      }

      return {
        ...prev,
        tvShows: prev.tvShows.map((tv) =>
          tv.id === card.id ? { ...tv, hasBeenAdded: false } : tv,
        ),
      };
    });
  }

  function toggleWatchlist(showObj: MovieCard | TVCard | Movie | TV) {
    if (hasBeenAdded(showObj)) {
      removeFromWatchlist(showObj);
      return;
    }

    addToWatchlist(showObj);
  }

  return {
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    hasBeenAdded,
    watchlist,
  };
}

export default useWatchlist;
