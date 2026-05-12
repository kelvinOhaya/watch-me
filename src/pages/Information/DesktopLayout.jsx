import React from "react";
import styles from "./Information.module.css";
import Tag from "../../components/Tag/Tag";
import WatchListBtn from "../../components/WatchListBtn/WatchListBtn";
import starIconSrc from "../../assets/starIcon.svg";

function DesktopLayout({
  show,
  fullPosterUrl,
  fullLogoUrl,
  hasBeenAdded,
  onToggleWatchlist,
}) {
  return (
    <>
      <div className={styles.topContent}>
        <div className={styles.titleTagWppr}>
          <h1 className={styles.showTitle}>{show.title || show.name}</h1>
          <p
            style={{
              color: "white",
              fontFamily: "Helvetica",
              fontSize: "0.85em",
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

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 6,
            height: "fit-content",
          }}
        >
          <img src={starIconSrc} alt="Rating star" style={{height: "20px"}} />
          <span style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            <p style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {show.vote_average}
              </span>
              <span
                style={{
                  color: "#7c7c7c",
                  fontSize: "14px",
                  lineHeight: 1,
                }}
              >
                /10
              </span>
            </p>
            <p
              style={{
                color: "#7c7c7c",
                fontSize: "12px",
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

      <main
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          minHeight: 100,
          gap: 20,
        }}
      >
        {show.hasPoster ? (
          <div style={{ position: "relative" }}>
            <div
              role="img"
              aria-label="Poster image"
              style={{
                backgroundImage: `url(${fullPosterUrl})`,
                height: 250,
                width: 140,
                backgroundSize: "cover",
                borderRadius: 8,
              }}
            />
            <div style={{ position: "absolute", bottom: -12, right: -12 }}>
              <WatchListBtn
                size={24}
                hasBeenAdded={hasBeenAdded}
                onToggle={onToggleWatchlist}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              borderRadius: 24,
              padding: 24,
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
              fontSize: 24,
            }}
          >
            <h1>No Trailer Found :(</h1>
          </div>
        )}

        <div className={styles.producersContainer}>
          <p
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Helvetica",
              fontSize: 16,
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
              gap: 20,
              paddingTop: 12,
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
      </main>

      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 12,
          overflow: "hidden",
        }}
      >
        {show.genres?.map((id, key) => (
          <Tag key={key} description={id.name} />
        ))}
      </div>

      <p className={styles.overview}>{show.overview}</p>
    </>
  );
}

export default DesktopLayout;
