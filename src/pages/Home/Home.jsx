import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import Navbar from "../../components/Navbar/Navbar";
import PopularShow from "../../components/PopularShow/PopularShow";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import useHome from "../../hooks/useHome";
import { motion, stagger } from "framer-motion";

const SECTION_ENTRY_DURATION = 0.3;

function Home() {
  const { getPopularMovies, popularMovies, popularTvShows, loading } =
    useHome();
  const navigate = useNavigate();

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]);

  //variants
  const containerVariant = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const showVariant = {
    initial: {
      y: 8,
      opacity: 0,
    },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <div className={styles.bg}>
      <Navbar />
      {!loading && (
        <motion.section tabIndex={0} className={styles.popularSection}>
          <>
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.sectionTitle}
            >
              In Theaters
            </motion.h1>
            <motion.div
              variants={containerVariant}
              initial="initial"
              animate="animate"
              className={styles.popularMovieList}
            >
              {popularMovies.map((movie, index) => (
                <motion.div variants={showVariant}>
                  <PopularShow
                    key={`popular-${movie.id ?? index}`}
                    show={movie}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
          <>
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={styles.sectionTitle}
            >
              Series
            </motion.h1>
            <motion.div
              variants={containerVariant}
              initial="initial"
              animate="animate"
              className={styles.popularMovieList}
            >
              {popularTvShows.map((movie, index) => (
                <motion.div variants={showVariant}>
                  <PopularShow
                    key={`popular-${movie.id ?? index}`}
                    onClick={() => {
                      navigate(`/info/${movie.id}`);
                    }}
                    show={movie}
                  />
                </motion.div>
              ))}
            </motion.div>
          </>
        </motion.section>
      )}
    </div>
  );
}

export default Home;
