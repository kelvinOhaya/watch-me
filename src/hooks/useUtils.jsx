import { useCallback } from "react";

function useUtils() {
  //shorthand for simple get requests
  const getRequest = useCallback(async (url, options = {}) => {
    const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...options,
    });
    const data = await response.json();
    return data;
  }, []);

  const getPosterImg = useCallback(
    (path) => `https://image.tmdb.org/t/p/original/${path}`,
    [],
  );

  return { getRequest, getPosterImg };
}

export default useUtils;
