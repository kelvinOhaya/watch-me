import React, { useEffect, useState } from "react";
import styles from "./Information.module.css";
import Navbar from "../../components/Navbar/Navbar";
import starIconSrc from "../../assets/starIcon.svg";
import PageStatus from "../../components/PageStatus/PageStatus";
import Tag from "../../components/Tag/Tag";
import Bookmark from "../../components/Bookmark";
import WatchListBtn from "../../components/WatchListBtn/WatchListBtn";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import useInfo from "../../hooks/useInfo";
import useUtils from "../../hooks/useUtils";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faStar } from "@fortawesome/free-solid-svg-icons";

function Information() {
  const { showId, showType } = useParams();
  const { show, getShow, loading } = useInfo();
  const [hasResolvedInfo, setHasResolvedInfo] = useState(false);
  const { getPosterImg } = useUtils();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // const overviewThreshold = useMediaQuery({ query: "(max-width: 830px)" });
  const posterThreshold = useMediaQuery({ query: "(max-width: 830px)" });
  const searchQuery =
    searchParams.get("searchQuery") || location.state?.searchQuery;
  const prompt = `Hi Chat! Tell me a little bit about the ${show.type} called ${show.title || show.name} released on ${show.release_date || show.first_air_date}
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

  const fullPosterUrl = getPosterImg(show.poster_path);
  const fullLogoUrl = (url) => `https://image.tmdb.org/t/p/original/${url}`;

  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
      }}
    >
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
          {!posterThreshold && (
            <div className={styles.topContent}>
              {/* Title & Description */}
              <div className={styles.titleTagWppr}>
                <h1 className={styles.showTitle}>{show.title || show.name}</h1>
                <p
                  style={{
                    color: "white",
                    fontFamily: "Helvetica",
                    fontSize: "1rem",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "normal",
                    opacity: 0.5,
                  }}
                >
                  {show.type + " · "}{" "}
                  {show.type === "Movie"
                    ? show.release_date?.slice(0, 4) + " · "
                    : show.first_air_date?.slice(0, 4) + " · "}
                  {show.type === "Movie"
                    ? `${show.runtime ? show.runtime + " mins" : ""}`
                    : `${show.seasons?.length} seasons`}{" "}
                </p>
              </div>
              {/* Rating */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  height: "fit-content",
                }}
              >
                <img src={starIconSrc} alt="Rating star" />
                {/* Stats box */}
                <span
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  <p
                    style={{ display: "flex", alignItems: "flex-end", gap: 2 }}
                  >
                    <span
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "white",
                      }}
                    >
                      {show.vote_average}
                    </span>
                    <span
                      style={{
                        color: "#7c7c7c",
                        fontSize: "20px",
                        lineHeight: 1,
                      }}
                    >
                      /10
                    </span>
                  </p>
                  <p
                    style={{
                      color: "#7c7c7c",
                      fontSize: "16px",
                      lineHeight: 1,
                    }}
                  >
                    {new Intl.NumberFormat("en-Us", {
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(show.vote_count)}{" "}
                    votes
                  </p>
                </span>
              </div>
            </div>
          )}

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
            <main
              style={{
                margin: "32px 0",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                minHeight: 100,
                gap: 32,
              }}
            >
              {show.hasPoster ? (
                !posterThreshold && (
                  <div className={styles.desktopPosterWrap}>
                    <div
                      className={styles.poster}
                      role="img"
                      aria-label="Poster image"
                      style={{ backgroundImage: `url(${fullPosterUrl})` }}
                    />
                    <div style={{ position: "absolute", top: -10, right: -30 }}>
                      <WatchListBtn
                        id={showId}
                        show={show}
                        showType={showType}
                      />
                    </div>
                  </div>
                )
              ) : (
                <div
                  style={{
                    height: "100%",
                    borderRadius: 32,
                    padding: 32,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    background: "#FFFFFF33",
                  }}
                >
                  <h1>No Poster</h1>
                </div>
              )}
              {show.hasTrailer ? (
                <iframe
                  className={styles.iframeWrapper}
                  src={`https://www.youtube.com/embed/${show?.videos?.results?.filter((e) => e.type === "Trailer")[0]?.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                >
                  text
                </iframe>
              ) : (
                <div
                  style={{
                    height: "100%",
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    fontSize: 32,
                  }}
                >
                  <h1>No Trailer Found :(</h1>
                </div>
              )}
              {!posterThreshold && (
                <div className={styles.producersContainer}>
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "Helvetica",
                      fontSize: 20,
                      fontWeight: 400,
                      lineHeight: "normal",
                    }}
                  >
                    Producers
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 32,
                      paddingTop: 16,
                    }}
                  >
                    {show.production_companies
                      ?.filter((e) => e.logo_path)
                      .map((company, i) => (
                        <img
                          key={i}
                          className={styles.logo}
                          src={fullLogoUrl(company.logo_path)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </main>
          )}
          {!posterThreshold && (
            <div
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              {show.genres?.map((id, key) => (
                <Tag key={key} description={id.name} />
              ))}
            </div>
          )}
          <div className={styles.mobileContentContainer}>
            {posterThreshold && (
              <div className={styles.mobileHeader}>
                <div className={styles.titleTagWppr}>
                  <h1 className={styles.showTitle}>
                    {show.title || show.name}
                  </h1>
                  <p
                    style={{
                      color: "white",
                      fontFamily: "Helvetica",
                      fontSize: "1rem",
                      fontStyle: "normal",
                      fontWeight: 400,
                      lineHeight: "normal",
                      opacity: 0.5,
                    }}
                  >
                    {show.type + " · "}{" "}
                    {show.type === "Movie"
                      ? show.release_date?.slice(0, 4) + " · "
                      : show.first_air_date?.slice(0, 4) + " · "}
                    {show.type === "Movie"
                      ? `${show.runtime ? show.runtime + " mins" : ""}`
                      : `${show.seasons?.length} seasons`}{" "}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {show.genres?.map((id, key) => (
                    <Tag key={key} description={id.name} />
                  ))}
                </div>
              </div>
            )}

            {show.hasPoster && posterThreshold && (
              <div style={{ display: "flex", gap: "4vw", flex: 1 }}>
                {/* Poster column */}
                <div style={{ position: "relative", height: "100%" }}>
                  <div
                    className={styles.poster}
                    role="img"
                    aria-label="Poster image"
                    style={{ backgroundImage: `url(${fullPosterUrl})` }}
                  />

                  <div style={{ position: "absolute", top: -10, right: -30 }}>
                    <WatchListBtn size={20} />
                  </div>
                </div>

                {/* Overview + rating column */}
                <div
                  className={styles.mobileInfoCol}
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <p className={styles.overview}>{show.overview}</p>
                  <div
                    style={{ flexBasis: "auto", display: "flex", gap: "8px" }}
                  >
                    <span style={{ display: "flex", color: "white" }}>
                      <FontAwesomeIcon icon={faStar} color="var(--p100)" />{" "}
                      <p>{show.vote_average}</p>
                    </span>
                    <span
                      style={{ display: "flex", color: "white", opacity: 0.7 }}
                    >
                      <p>({show.vote_count}) votes</p>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {posterThreshold && (
            <div
              style={{
                alignSelf: "center",
                display: "flex",
                gap: 8,
                background: "#ffffff33",
                padding: "4px 8px",
                borderRadius: "16px",
                marginTop: 8,
              }}
            >
              {show.production_companies
                ?.filter((e) => e.logo_path)
                .map((company, i) => (
                  <img
                    key={i}
                    className={styles.logo}
                    src={fullLogoUrl(company.logo_path)}
                  />
                ))}
            </div>
          )}
          {!posterThreshold && (
            <p className={styles.overview}>{show.overview}</p>
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

export default Information;
