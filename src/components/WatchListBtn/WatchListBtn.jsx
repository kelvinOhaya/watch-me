import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./WatchListBtn.module.css";
import Bookmark from "../Bookmark";

function WatchListBtn() {
  const [hasBeenAdded, setHasBeenAdded] = useState(true);
  const buttonRef = useRef(null);
  const isInitialRender = useRef(true);

  useLayoutEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const label = button.querySelector(`.${styles.label}`);
    const icon = button.querySelector("svg path");

    if (!label || !icon) return;

    if (isInitialRender.current) {
      gsap.set(button, {
        "--watchlist-overlay-opacity": hasBeenAdded ? 1 : 0,
        scale: 1,
      });
      gsap.set(label, { color: hasBeenAdded ? "var(--bg)" : "var(--p100)" });
      gsap.set(icon, { fill: hasBeenAdded ? "var(--bg)" : "var(--p100)" });
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
          "--watchlist-overlay-opacity": hasBeenAdded ? 1 : 0,
          scale: 1,
        },
        0,
      )
      .to(label, { color: hasBeenAdded ? "var(--bg)" : "var(--p100)" }, 0)
      .to(icon, { fill: hasBeenAdded ? "var(--bg)" : "var(--p100)" }, 0);

    return () => timeline.kill();
  }, [hasBeenAdded]);

  const handleEnter = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.to(buttonRef.current, {
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleDown = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.to(buttonRef.current, {
      scale: 0.96,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const handleUp = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.to(buttonRef.current, {
      scale: 1.03,
      duration: 0.18,
      ease: "power2.out",
    });
  };

  const handleLeave = () => {
    gsap.killTweensOf(buttonRef.current);
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <button
      className={styles.button}
      ref={buttonRef}
      onMouseEnter={handleEnter}
      onMouseDown={handleDown}
      onMouseUp={handleUp}
      onMouseLeave={handleLeave}
      onClick={() => setHasBeenAdded((prev) => !prev)}
    >
      <span className={styles.label}>
        {hasBeenAdded ? " REMOVE FROM WATCHLIST" : "ADD TO WATCHLIST"}{" "}
        <Bookmark />
      </span>
    </button>
  );
}

export default WatchListBtn;
