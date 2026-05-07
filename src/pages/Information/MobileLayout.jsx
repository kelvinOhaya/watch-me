import React from "react";
import styles from "./Information.module.css";
import Tag from "../../components/Tag/Tag";
import WatchListBtn from "../../components/WatchListBtn/WatchListBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MobileLayout({
  show,
  fullPosterUrl,
  fullLogoUrl,
  hasBeenAdded,
  onToggleWatchlist,
}) {
  return (
    <div
      id="container"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "fit-content",
        alignItems: "center",
      }}
    >
      {show.hasTrailer ? (
        <iframe
          id="trailer"
          style={{
            width: "80vw",
            marginBottom: 32,
            marginTop: 81,
            height: "20vh",
          }}
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
            height: "fit-content",
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
      <div className={styles.mobileContentContainer}>
        <div className={styles.mobileHeader}>
          <div className={styles.titleTagWppr}>
            <h1 style={{ color: "white", fontSize: "3vw" }}>
              {show.title || show.name}
            </h1>
            <p
              style={{
                color: "white",
                fontFamily: "Helvetica",
                fontSize: "2vw",
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
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {show.genres?.map((id, key) => (
              <span
                key={key}
                style={{ color: "white", opacity: 0.7, fontSize: "2vw" }}
              >
                {id.name + (key < show.genres?.length - 1 ? "·" : "")}
              </span>
            ))}
          </div>
        </div>

        {show.hasPoster && (
          <div className={styles.posterAndOverview}>
            <div
              style={{
                position: "relative",
                height: "20vw",
                width: "15vw",
              }}
            >
              <div
                id="poster"
                className={styles.poster}
                role="img"
                aria-label="Poster image"
                style={{
                  backgroundImage: `url(${fullPosterUrl})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "calc(0% - 7px)",
                  right: "calc(0% - 7px)",
                }}
              >
                <WatchListBtn
                  size={"clamp(0.5rem, 2vw, 1rem)"}
                  hasBeenAdded={hasBeenAdded}
                  onToggle={onToggleWatchlist}
                />
              </div>
            </div>

            <div
              className={styles.mobileInfoCol}
              style={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
              <p id="overview" className={styles.overview}>
                {show.overview}
              </p>
              <div
                style={{
                  flexBasis: "auto",
                  display: "flex",
                  gap: "8px",
                }}
              >
                <span
                  style={{ display: "flex", color: "white", fontSize: "2vw" }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    color="var(--p100)"
                    style={{ fontSize: "2vw" }}
                  />
                  <p>{show.vote_average}</p>
                </span>
                <span
                  style={{
                    display: "flex",
                    color: "white",
                    opacity: 0.7,
                    fontSize: "2vw",
                  }}
                >
                  <p>({show.vote_count}) votes</p>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
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
    </div>
  );
}

export default MobileLayout;
