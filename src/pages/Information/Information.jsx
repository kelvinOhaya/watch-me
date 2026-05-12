import React, { useEffect, useState } from "react";
import styles from "./Information.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useInfo from "../../hooks/useInfo";
import useUtils from "../../hooks/useUtils";
import useWatchlist from "../../hooks/useWatchlist";
import Skeleton from "react-loading-skeleton";
import ResponsiveLayout from "./ResponsiveLayout";

function Information() {
  const { showId, showType } = useParams();
  const { show, getShow } = useInfo();
  const [hasResolvedInfo, setHasResolvedInfo] = useState(false);
  const { getPosterImg } = useUtils();
  const { addToWatchList, removeFromWatchList, watchlist, saveWatchlist } =
    useWatchlist();
  const [hasBeenAdded, setHasBeenAdded] = useState(() =>
    watchlist.some(
      (savedShow) => savedShow.id === showId && savedShow.type === showType,
    ),
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery =
    searchParams.get("searchQuery") || location.state?.searchQuery;
  const prompt = `Hi Chat! Tell me a little bit about the ${show?.type} called ${show?.title || show?.name} released on ${show?.release_date || show?.first_air_date}
  . I'd like to know the overview, when it released, and where I can watch it. Provide a trailer if it exists.`;

  useEffect(() => {
    let active = true;

    const loadInfo = async () => {
      if (!showType || !showId) {
        setHasResolvedInfo(false);
        return;
      }

      setHasResolvedInfo(false);
      const queryString = `${showType}/${showId}`;
      await getShow(queryString);
      if (active) setHasResolvedInfo(true);
    };

    loadInfo();

    return () => {
      active = false;
    };
  }, [getShow, showId, showType]);

  useEffect(() => {
    saveWatchlist();
  }, [watchlist, saveWatchlist]);

  const handleWatchlistToggle = () => {
    if (hasBeenAdded) {
      removeFromWatchList(showId, showType);
    } else {
      addToWatchList(show, showId, showType);
    }

    setHasBeenAdded((prev) => !prev);
  };

  const fullPosterUrl = getPosterImg(show.poster_path);
  const fullLogoUrl = (url) => `https://image.tmdb.org/t/p/original/${url}`;

  return (
    <div className={styles.pageShell}>
      <div className={styles.bg}></div>
      <Navbar />

      {hasResolvedInfo ? (
        <div
          className={styles.bgImg}
          style={{
            background: `url(${fullPosterUrl}) lightgray 50% / cover no-repeat`,
          }}
        ></div>
      ) : (
        <div
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            background: "#000000",
          }}
        ></div>
      )}

      {hasResolvedInfo ? (
        <div
          className={styles.contentLayer}
          style={{
            padding: 32,
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 81px)",
          }}
        >
          {searchQuery ? (
            <div className={styles.backRow}>
              <button
                type="button"
                className={styles.backButton}
                title="Back to search"
                onClick={() =>
                  navigate(`/search/${searchQuery}`, { viewTransition: true })
                }
              >
                <span className={styles.backLabel}>Back to search</span>
              </button>
            </div>
          ) : null}

          {show.ghostShow ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <h1 style={{ color: "white", height: "100%" }}>
                It seems we don't have much info on on this show :({" "}
                <a
                  className={styles.learnMore}
                  target="_blank"
                  href={`https://chatgpt.com/?q=${encodeURIComponent(prompt)}`}
                >
                  Learn more about the show
                </a>
              </h1>
            </div>
          ) : (
            <ResponsiveLayout
              show={show}
              fullPosterUrl={fullPosterUrl}
              fullLogoUrl={fullLogoUrl}
              hasBeenAdded={hasBeenAdded}
              onToggleWatchlist={handleWatchlistToggle}
            />
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default Information;
