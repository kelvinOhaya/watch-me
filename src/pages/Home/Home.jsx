import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import PopularShow from "../../components/PopularShow/PopularShow";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import useHome from "../../hooks/useHome";
import { gsap } from "gsap";

const SECTION_ENTRY_DURATION = 0.3;

function Home() {
  const {
    getPopularMovies,
    popularMovies,
    popularTvShows,
    loading,
    error,
    setCurrentShow,
  } = useHome();
  const moviesRef = useRef(null);
  const tvRef = useRef(null);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

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
  }, [popularMovies, popularTvShows]);

  const navigate = useNavigate();

  return (
    <div className={styles.bg}>
      <Navbar />
      <section className={styles.popularSection}>
        <p className={styles.popularTitle}>Popular</p>
        <h1>In Theaters: </h1>
        {loading ? (
          <div className={styles.loadingState}>
            <p className={styles.loadingEyebrow}>Popular movies</p>
            <p className={styles.loadingText}>
              Loading the current cinema lineup
            </p>
            <p className={styles.loadingHint}>
              Finding the newest releases and poster art
            </p>
          </div>
        ) : error ? (
          <p style={{ color: "#ff9c9c" }}>{error}</p>
        ) : (
          <div className={styles.popularMovieList} ref={moviesRef}>
            {popularMovies.map((movie, index) => (
              <PopularShow key={`popular-${movie.id ?? index}`} show={movie} />
            ))}
          </div>
        )}
        <h1>Series</h1>
        {loading ? (
          <div className={styles.loadingState}>
            <p className={styles.loadingEyebrow}>Popular TV</p>
            <p className={styles.loadingText}>Loading trending series</p>
            <p className={styles.loadingHint}>
              Pulling the latest episodes and season data
            </p>
          </div>
        ) : error ? (
          <p style={{ color: "#ff9c9c" }}>{error}</p>
        ) : (
          <div className={styles.popularMovieList} ref={tvRef}>
            {popularTvShows.map((movie, index) => (
              <PopularShow
                key={`popular-${movie.id ?? index}`}
                onClick={() => {
                  setCurrentShow(movie);
                  navigate(`/info/${movie.id}`);
                }}
                show={movie}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
