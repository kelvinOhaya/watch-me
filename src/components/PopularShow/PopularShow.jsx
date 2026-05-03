import React, { useRef } from "react";
import styles from "./PopularShow.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import useInfo from "../../hooks/useInfo";

function PopularShow({ show }) {
  const navigate = useNavigate();
  const { getShow } = useInfo();
  //animation
  gsap.registerPlugin(useGSAP);
  const container = useRef();

  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
    timeline.to(container.current, {
      duration: 0.2,
      scale: 1.02,
      ease: "power1.out",
    });
    const onEnter = () => timeline.play();
    const onLeave = () => timeline.reverse();

    container.current.addEventListener("mouseenter", onEnter);
    container.current.addEventListener("mouseleave", onLeave);

    return () => {
      container.current.removeEventListener("mouseenter", onEnter);
      container.current.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const posterFullUrl = `https://image.tmdb.org/t/p/original/${show.poster_path}`;

  //turning date into english
  const dateString = show.release_date || show.first_air_date;
  const [year, month, day] = dateString.split("-");
  const dateObject = new Date(year, month - 1, day);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const releaseDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObject,
  );
  // Result: "Month day, YYYY"

  return (
    <button
      className={styles.container}
      ref={container}
      onClick={() => {
        getShow(show);
        navigate(`/info/${show.type}/${show.id || show.series_id}`);
      }}
    >
      <div style={{ height: "100%", alignContent: "center", minWidth: 200 }}>
        <img className={styles.showImg} src={posterFullUrl} />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <h1>{show.title || show.name}</h1>
          <div className={styles.meta}>
            <p style={{ fontSize: 20, opacity: 0.7 }}>{releaseDate}</p>
            <p className={styles.rating}>
              <span style={{ fontSize: 20 }}>
                ⭐{show.vote_average}{" "}
                <span style={{ fontSize: 16, opacity: 0.7 }}>
                  ({show.vote_count})
                </span>
              </span>
            </p>
          </div>
        </div>
        <p className={styles.description}>{show.overview}</p>
      </div>
    </button>
  );
}

export default PopularShow;
