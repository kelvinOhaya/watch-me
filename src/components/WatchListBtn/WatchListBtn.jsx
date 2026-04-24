import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./WatchListBtn.module.css";
import Bookmark from "../Bookmark";
import useWatchlist from "../../hooks/useWatchlist";

function WatchListBtn({ id, show, showType }) {
  const {
    addToWatchList,
    removeFromWatchList,
    hasBeenSaved,
    watchlist,
    saveWatchlist,
  } = useWatchlist();
  const [hasBeenAdded, setHasBeenAdded] = useState(
    hasBeenSaved(show, id, showType),
  );

  useEffect(() => {
    saveWatchlist();
  }, [watchlist, saveWatchlist]);
  const buttonRef = useRef(null);
  const isInitialRender = useRef(true);

  const handleClick = () => {
    hasBeenAdded
      ? removeFromWatchList(id, showType)
      : addToWatchList(show, id, showType);
    setHasBeenAdded((prev) => !prev);
  };

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const label = button.querySelector(`.${styles.label}`);
    const icon = button.querySelector("svg path");

    if (!label || !icon) return;

    if (isInitialRender.current) {
      gsap.set(button, { scale: 1 });
      gsap.set(label, { color: hasBeenAdded ? "var(--p100)" : "var(--p500)" });
      gsap.set(icon, { fill: hasBeenAdded ? "var(--p100)" : "var(--p500)" });
      isInitialRender.current = false;
      return;
    }

    const timeline = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.out" },
    });

    timeline
      .to(
        button,
        {
          scale: 1,
        },
        0,
      )
      .to(
        label,
        { color: hasBeenAdded ? "var(--p100)" : "var(--p500)", duration: 0.1 },
        0,
      )
      .to(
        icon,
        { fill: hasBeenAdded ? "var(--p100)" : "var(--p500)", duration: 0.1 },
        0,
      );

    return () => timeline.kill();
  }, [hasBeenAdded]);

  return (
    <button
      className={styles.button}
      ref={buttonRef}
      onClick={handleClick}
      style={{ background: hasBeenAdded ? "var(--p500)" : "var(--pg100)" }}
    >
      <span className={styles.label}>
        {hasBeenAdded ? "REMOVE FROM WATCHLIST" : "ADD TO WATCHLIST"}{" "}
        <Bookmark fill={hasBeenAdded ? "var(--p100)" : "var(--p500)"} />
      </span>
    </button>
  );
}

export default WatchListBtn;
