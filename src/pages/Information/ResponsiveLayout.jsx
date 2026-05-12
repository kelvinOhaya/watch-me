import React from "react";
import styles from "./Information.module.css";
import Tag from "../../components/Tag/Tag";
import WatchListBtn from "../../components/WatchListBtn/WatchListBtn";
import starIconSrc from "../../assets/starIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

/**
 * ResponsiveLayout - Single component that handles both desktop and mobile layouts
 * Uses CSS media queries for responsive behavior instead of component switching
 */
function ResponsiveLayout({
  show,
  fullPosterUrl,
  fullLogoUrl,
  hasBeenAdded,
  onToggleWatchlist,
}) {
  return (
    <>
      {/* Trailer Section - Appears on mobile first, then on desktop */}
      <div className={styles.trailerSection}>
        {show.hasTrailer ? (
          <iframe
            className={styles.trailerFrame}
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
          <div className={styles.noTrailerPlaceholder}>
            <h1>No Trailer Found :(</h1>
          </div>
        )}
      </div>

      {/* Desktop-only: Top content with title and rating */}
      <div className={styles.topContent}>
        <div className={styles.titleTagWppr}>
          <h1 className={styles.showTitle}>{show.title || show.name}</h1>
          <p className={styles.showMeta}>
            {show.type + " · "}{" "}
            {show.type === "Movie"
              ? show.release_date?.slice(0, 4) + " · "
              : show.first_air_date?.slice(0, 4) + " · "}
            {show.type === "Movie"
              ? `${show.runtime ? show.runtime + " mins" : ""}`
              : `${show.seasons?.length} seasons`}{" "}
          </p>
        </div>

        <div className={styles.ratingContainer}>
          <img
            src={starIconSrc}
            alt="Rating star"
            className={styles.ratingIcon}
          />
          <span className={styles.ratingContent}>
            <p className={styles.ratingScore}>
              <span className={styles.ratingValue}>{show.vote_average}</span>
              <span className={styles.ratingMax}>/10</span>
            </p>
            <p className={styles.ratingVotes}>
              {new Intl.NumberFormat("en-Us", {
                notation: "compact",
                compactDisplay: "short",
              }).format(show.vote_count)}{" "}
              votes
            </p>
          </span>
        </div>
      </div>

      {/* Main content: Poster, Trailer, Producers */}
      <main className={styles.mainContent}>
        {show.hasPoster ? (
          <div className={styles.posterWrapper}>
            <div
              role="img"
              aria-label="Poster image"
              className={styles.posterImage}
              style={{
                backgroundImage: `url(${fullPosterUrl})`,
              }}
            />
            <div className={styles.watchlistButtonWrapper}>
              <WatchListBtn
                size={24}
                hasBeenAdded={hasBeenAdded}
                onToggle={onToggleWatchlist}
              />
            </div>
          </div>
        ) : (
          <div className={styles.noPosterPlaceholder}>
            <h1>No Poster</h1>
          </div>
        )}

        {/* Mobile: Poster and overview side-by-side */}
        <div className={styles.mobileInfoColumn}>
          <p id="overview" className={styles.overview}>
            {show.overview}
          </p>
          <div className={styles.mobileRatingContainer}>
            <span className={styles.mobileRating}>
              <FontAwesomeIcon
                icon={faStar}
                className={styles.mobileRatingIcon}
              />
              <p>{show.vote_average}</p>
            </span>
            <span className={styles.mobileRatingVotes}>
              <p>({show.vote_count}) votes</p>
            </span>
          </div>
        </div>

        {/* Producers Section */}
        <div className={styles.producersContainer}>
          <p className={styles.producersTitle}>Producers</p>
          <div className={styles.producersGrid}>
            {show.production_companies
              ?.filter((e) => e.logo_path)
              .map((company, i) => (
                <img
                  key={i}
                  className={styles.logo}
                  src={fullLogoUrl(company.logo_path)}
                  alt={company.name}
                />
              ))}
          </div>
        </div>
      </main>

      {/* Tags Section */}
      <div className={styles.tagsSection}>
        {show.genres?.map((id, key) => (
          <Tag key={key} description={id.name} />
        ))}
      </div>

      {/* Overview - Desktop only */}
      <p className={styles.overviewDesktop}>{show.overview}</p>
    </>
  );
}

export default ResponsiveLayout;
