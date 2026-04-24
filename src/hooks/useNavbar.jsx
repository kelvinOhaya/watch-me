import React, { useCallback, useRef, useState } from "react";
import useUtils from "./useUtils";

function useNavbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const { getRequest } = useUtils();
  const genreCacheRef = useRef({ movie: null, tv: null });
  const searchCacheRef = useRef(new Map());
  const abortControllerRef = useRef(null);

  const getSearchResults = useCallback(
    async (text) => {
      const query = text?.trim();

      if (!query) {
        abortControllerRef.current?.abort();
        setSearchResults([]);
        return;
      }

      if (searchCacheRef.current.has(query)) {
        setSearchResults(searchCacheRef.current.get(query));
        return;
      }

      setIsSearching(true);

      try {
        if (!genreCacheRef.current.movie || !genreCacheRef.current.tv) {
          const [movieGenreRes, tvGenreRes] = await Promise.all([
            getRequest("https://api.themoviedb.org/3/genre/movie/list"),
            getRequest("https://api.themoviedb.org/3/genre/tv/list"),
          ]);

          genreCacheRef.current.movie = Object.fromEntries(
            (movieGenreRes.genres || []).map((g) => [g.id, g.name]),
          );
          genreCacheRef.current.tv = Object.fromEntries(
            (tvGenreRes.genres || []).map((g) => [g.id, g.name]),
          );

          setMovieGenres(genreCacheRef.current.movie);
          setTvGenres(genreCacheRef.current.tv);
        }

        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        const data = await getRequest(
          `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
          { signal: controller.signal },
        );

        const results = data.results || [];
        searchCacheRef.current.set(query, results);
        setSearchResults(results);
      } catch (error) {
        if (error?.name !== "AbortError") {
          throw error;
        }
      } finally {
        setIsSearching(false);
      }
    },
    [getRequest],
  );

  return {
    getSearchResults,
    searchResults,
    tvGenres,
    movieGenres,
    isSearching,
  };
}

export default useNavbar;
