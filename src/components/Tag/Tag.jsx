import React from "react";
import styles from "./Tag.module.css";

function Tag({ description }) {
  return <span className={styles.tag}>{description}</span>;
}

export default Tag;
