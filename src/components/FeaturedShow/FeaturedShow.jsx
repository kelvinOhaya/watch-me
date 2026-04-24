import React, { useRef } from "react";
import styles from "./FeaturedShow.module.css";
import { useNavigate } from "react-router-dom";
import useUtils from "../../hooks/useUtils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function FeaturedShow({
  show,
  type,
  movieGenres = {},
  tvGenres = {},
  searchQuery,
}) {
  const { getPosterImg } = useUtils();
  const navigate = useNavigate();
  const container = useRef(null);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    if (!container.current) return;

    const timeline = gsap.timeline({ paused: true });

    timeline.to(container.current, {
      duration: 0.2,
      scale: 1.02,
      ease: "power1.out",
    });

    const onEnter = () => timeline.play();
    const onLeave = () => timeline.reverse();
    const onFocus = () => timeline.play();
    const onBlur = () => timeline.reverse();

    container.current.addEventListener("mouseenter", onEnter);
    container.current.addEventListener("mouseleave", onLeave);
    container.current.addEventListener("focus", onFocus);
    container.current.addEventListener("blur", onBlur);

    return () => {
      container.current?.removeEventListener("mouseenter", onEnter);
      container.current?.removeEventListener("mouseleave", onLeave);
      container.current?.removeEventListener("focus", onFocus);
      container.current?.removeEventListener("blur", onBlur);
    };
  }, []);

  const fullPosterUrl = getPosterImg(show.poster_path);
  const genreMap = type === "tv" ? tvGenres : movieGenres;
  const genreNames = show?.genre_ids
    ? (show?.genre_ids || []).map((id) => genreMap[id]).filter(Boolean)
    : show.genres?.map((genre) => genre.name);
  const title = show.title || show.name;
  const genresText = genreNames.length
    ? genreNames.join(" · ")
    : "Genre unavailable";

  return (
    <button
      type="button"
      className={styles.container}
      ref={container}
      onClick={() =>
        navigate({
          pathname: `/info/${show.media_type || type}/${show.id}`,
          search: searchQuery
            ? `?searchQuery=${encodeURIComponent(searchQuery)}`
            : "",
        })
      }
      aria-label={`Open details for ${title}`}
    >
      {show.poster_path ? (
        <img
          className={styles.showImg}
          src={fullPosterUrl}
          alt={`${title} poster`}
        />
      ) : (
        <div className={styles.showImg}>
          <span className={styles.fallbackMark}>?</span>
        </div>
      )}
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.meta}>{genresText}</p>
      </div>
    </button>
  );
}

export default FeaturedShow;
