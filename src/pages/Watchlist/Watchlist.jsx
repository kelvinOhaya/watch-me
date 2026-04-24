import React, { useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import styles from "./Watchlist.module.css";
import useWatchlist from "../../hooks/useWatchlist";
import useInfo from "../../hooks/useInfo";
import { gsap } from "gsap";

const SECTION_ENTRY_DURATION = 1;

function Search() {
  const { watchlist, saveWatchlist } = useWatchlist();
  const { movieGenres, tvGenres } = useInfo();
  const moviesRef = useRef(null);
  const tvRef = useRef(null);

  useEffect(() => {
    saveWatchlist();
  }, [watchlist, saveWatchlist]);

  useEffect(() => {
    const animateItems = (items) => {
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 5,
        },
        {
          opacity: 1,
          y: 0,
          duration: SECTION_ENTRY_DURATION,
          stagger: 0.06,
          ease: "power1.out",
        },
      );
    };

    animateItems(Array.from(moviesRef.current?.children ?? []));
    animateItems(Array.from(tvRef.current?.children ?? []));
  }, [watchlist]);

  if (watchlist) {
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <h1 className={styles.title}>Watchlist</h1>
          <section>
            <h2 className={styles.sectionTitle}>Movies</h2>
            <div className={styles.showContainer} ref={moviesRef}>
              {watchlist
                .filter((e) => e.type === "movie")
                .map((show, index) => (
                  <FeaturedShow
                    key={`popular-${index}`}
                    show={show}
                    type={show.type}
                    movieGenres={movieGenres}
                    tvGenres={tvGenres}
                  />
                ))}
            </div>
          </section>
          <section>
            <h2 className={styles.sectionTitle}>TV Shows</h2>
            <div className={styles.showContainer} ref={tvRef}>
              {watchlist
                .filter((e) => e.type === "tv")
                ?.map((show, index) => (
                  <FeaturedShow
                    key={`popular-${index}`}
                    show={show}
                    type={show.type}
                    movieGenres={movieGenres}
                    tvGenres={tvGenres}
                  />
                ))}
            </div>
          </section>
        </div>
      </>
    );
  }
  return <h1>Loading Watchlist...</h1>;
}

export default Search;
