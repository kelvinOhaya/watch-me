import React, { useCallback, useState } from "react";

function useMovieData() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPopularMovies = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const accessToken =
        import.meta.env.VITE_ACCESS_TOKEN || import.meta.env.VITE_API_KEY;

      if (!accessToken) {
        throw new Error("Error: API key not found");
      }

      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `TMDb request failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      const results = Array.isArray(data?.results) ? data.results : [];
      setPopularMovies(results);
      return results;
    } catch (error) {
      console.log(`Error trying to access the movies: \n ${error}`);
      setError(error.message || "Failed to fetch popular movies.");
      setPopularMovies([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getPopularMovies, popularMovies, loading, error };
}

export default useMovieData;
