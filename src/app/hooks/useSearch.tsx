import { useCallback, useState } from "react";
import { SearchResults } from "../types";
import { fetchSearchResults } from "../api/movieApi";

function useSearch() {
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null,
  );

  // returns search results for the provided query
  const search = useCallback(async (query: string) => {
    if (!query || query.trim() === "") {
      setSearchResults(null);
      return;
    }

    try {
      const results = await fetchSearchResults(query);
      setSearchResults(results);
    } catch (error) {
      console.error("fetchSearchResults error:", error);
      setSearchResults(null);
    }
  }, []);

  return { searchResults, search };
}

export default useSearch;
