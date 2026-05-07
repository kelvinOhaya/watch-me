import React from "react";
import styles from "./WatchListBtn.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function WatchListBtn({ hasBeenAdded, onToggle, size = 32 }) {
  return (
    <button
      onClick={onToggle}
      style={{ fontSize: size, background: "transparent" }}
    >
      <FontAwesomeIcon
        icon={faBookmark}
        size={size}
        fill={hasBeenAdded ? "var(--p100)" : "#ffffffaa"}
      />
    </button>
  );
}

export default WatchListBtn;
