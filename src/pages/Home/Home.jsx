import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import PopularShow from "../../components/popularShow/PopularShow";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import useMovieData from "../../hooks/useMovieData";

function Home() {
  const { getPopularMovies, popularMovies, loading, error } = useMovieData();

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  const navigate = useNavigate();

  return (
    <div className={styles.bg}>
      <Navbar />
      <section className={styles.popularSection}>
        <p className={styles.popularTitle}>Popular</p>
        {loading ? (
          <p style={{ color: "var(--white100)" }}>Loading popular movies...</p>
        ) : error ? (
          <p style={{ color: "#ff9c9c" }}>{error}</p>
        ) : (
          <div className={styles.popularMovieList}>
            {popularMovies.map((movie, index) => (
              <PopularShow
                key={`popular-${movie.id ?? index}`}
                onClick={() => navigate("/info")}
                show={movie}
              />
            ))}
          </div>
        )}
      </section>
      <div style={{ marginTop: "128px" }}></div>
      <section className={styles.featuredSection}>
        <p className={styles.featuredTitle}>Featured</p>
        <div className={styles.featuredMovieList}>
          {Array.from({ length: 30 }, (_, index) => (
            <FeaturedShow
              key={`featured-${index}`}
              onClick={() => navigate("/info")}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
