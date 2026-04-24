import React, { useCallback, useState } from "react";
import useUtils from "./useUtils";

function useInfo() {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(false);
  const { getRequest } = useUtils();
  const getShow = useCallback(
    async (queryString) => {
      setLoading(true);

      try {
        let data = await getRequest(
          `https://api.themoviedb.org/3/${queryString}?append_to_response=videos`,
        );

        const productionCompanies = data.production_companies ?? [];
        const videoResults = data.videos?.results ?? [];
        const hasProducerLogo = productionCompanies.some((e) => e.logo_path);
        const hasTrailer = videoResults.some(
          (video) => video.type === "Trailer",
        );
        const hasPoster = Boolean(data.poster_path);

        data = {
          ...data,
          type: queryString.includes("tv") ? "TV Series" : "Movie",
          ghostShow: !hasProducerLogo && !hasTrailer && !hasPoster,
          hasTrailer,
          hasPoster,
        };
        setShow(data);
      } catch (error) {
        console.log(`Error getting the show from TMDB: \n ${error}`);
      } finally {
        setLoading(false);
      }
    },
    [getRequest],
  );

  return { show, getShow, loading };
}

export default useInfo;
