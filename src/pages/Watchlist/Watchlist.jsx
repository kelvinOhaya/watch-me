import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import styles from "./Watchllist.module.css";

function Watchlist() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>WatchList</h1>
        <section>
          <h2 className={styles.sectionTitle}>Movies</h2>
          <div className={styles.showContainer}>
            {Array.from({ length: 20 }, (_, index) => (
              <FeaturedShow
                key={`popular-${index}`}
                onClick={() => navigate("/info")}
              />
            ))}
          </div>
        </section>
        <section>
          <h2 className={styles.sectionTitle}>TV Shows</h2>
          <div className={styles.showContainer}>
            {Array.from({ length: 20 }, (_, index) => (
              <FeaturedShow
                key={`popular-${index}`}
                onClick={() => navigate("/info")}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Watchlist;
