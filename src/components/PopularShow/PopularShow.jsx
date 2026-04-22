import React from "react";
import styles from "./PopularShow.module.css";

function PopularShow({ onClick, show }) {
  const posterFullUrl = `https://image.tmdb.org/t/p/original/${show.poster_path}`;

  //turning date into english
  const dateString = show.release_date;
  const [year, month, day] = dateString.split("-");
  const dateObject = new Date(year, month - 1, day);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const releaseDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject,
  );
  // Result: "October 23, 2015"

  return (
    <button className={styles.container} onClick={onClick}>
      <img className={styles.showImg} src={posterFullUrl}></img>
      <div className={styles.info}>
        <div className={styles.header}>
          <h1>{show.original_title}</h1>
          <p className={styles.meta}>{releaseDate}</p>
          <p className={styles.rating}>
            ⭐{" "}
            <span>
              {show.vote_average} ({show.vote_count})
            </span>
          </p>
        </div>
        <p className={styles.description}>{show.overview}</p>
      </div>
    </button>
  );
}

export default PopularShow;
