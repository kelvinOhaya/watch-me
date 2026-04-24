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

function Information() {
  const { showId, showType } = useParams();
  const { show, getShow, loading } = useInfo();
  const [hasResolvedInfo, setHasResolvedInfo] = useState(false);
  const { getPosterImg } = useUtils();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const searchQuery =
    searchParams.get("searchQuery") || location.state?.searchQuery;
  const prompt = `Hi Chat! Tell me a little bit about the ${show.type} called ${show.title || show.name}. I'd like to know the overview, when it released, and where I can watch it. Provide a trailer if it exists.`;

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

  if (loading || !hasResolvedInfo) {
    return (
      <div className={styles.loadingPage}>
        <Navbar />
        <div className={styles.loadingBody}>
          <PageStatus
            variant="compact"
            className={styles.loadingStatus}
            eyebrow="Show details"
            title="Loading the information page"
            copy="Fetching posters, cast, trailers, and release details."
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.bg}></div>
      <Navbar />
      <div
        className={styles.bgImg}
        style={{
          background: `url(${fullPosterUrl}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
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
              onClick={() => navigate(`/search/${searchQuery}`)}
            >
              <span className={styles.backLabel}>Back to search</span>
            </button>
          </div>
        ) : null}
        <div className={styles.topContent}>
          {/* Title & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          >
            <h1>{show.title || show.name}</h1>
            <p
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 400,
                lineHeight: "normal",
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
            <span style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <p style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
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
              <p style={{ color: "#7c7c7c", fontSize: "16px", lineHeight: 1 }}>
                {new Intl.NumberFormat("en-Us", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(show.vote_count)}{" "}
                votes
              </p>
            </span>
          </div>
        </div>

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
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "stretch",
              height: 500,
              gap: 32,
            }}
          >
            {show.hasPoster ? (
              <img
                src={fullPosterUrl}
                style={{ height: "100%", borderRadius: 32 }}
                alt="Movie Logo"
              />
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
                style={{ height: "100%", flex: 1, maxWidth: 800 }}
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
            <div
              style={{
                padding: 16,
                height: "100%",
                flex: 1,
                maxWidth: 350,
                display: "flex",
                flexDirection: "column",
                borderRadius: 24,
                background: "#7c7c7c55",
              }}
            >
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
                Producers:
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
                      style={{ height: 32 }}
                      src={fullLogoUrl(company.logo_path)}
                    />
                  ))}
              </div>
            </div>
          </main>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: 8,
            alignItems: "center",
            alignSelf: "stretch",
            marginBottom: 32,
          }}
        >
          {show.genres?.map((id, key) => (
            <Tag key={key} description={id.name} />
          ))}
        </div>
        <p
          style={{
            color: " #FFF",
            fontFamily: "Helvetica",
            fontSize: 24,
            fontStyle: "normal",
            fontHeight: 400,
            lineHeight: "27px",
          }}
        >
          {show.overview}
        </p>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "32px",
          }}
        >
          <WatchListBtn id={showId} show={show} showType={showType} />
        </div>
      </div>
    </div>
  );
}

export default Information;
