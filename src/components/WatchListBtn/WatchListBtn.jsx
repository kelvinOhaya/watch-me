import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./WatchListBtn.module.css";
import Bookmark from "../Bookmark";
import useWatchlist from "../../hooks/useWatchlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function WatchListBtn({ id, show, showType, size = 32 }) {
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
  const handleClick = () => {
    hasBeenAdded
      ? removeFromWatchList(id, showType)
      : addToWatchList(show, id, showType);
    setHasBeenAdded((prev) => !prev);
  };

  return (
    <motion.button
      className={styles.button}
      ref={buttonRef}
      onClick={handleClick}
      style={{ fontSize: size }}
      animate={{
        marginLeft: "auto",
        background: "transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        size={size}
        fill={hasBeenAdded ? "var(--p100)" : "#ffffffaa"}
      />
    </motion.button>
  );
}

export default WatchListBtn;
