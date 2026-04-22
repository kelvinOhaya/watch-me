import React from "react";
import styles from "./FeaturedShow.module.css";

function FeaturedShow({ onClick }) {
  return (
    <button className={styles.container} onClick={onClick}>
      <div className={styles.showImg}></div>
      <div className={styles.info}>
        <h1>Title</h1>
        <p>Action · Comedy · Romance</p>
      </div>
    </button>
  );
}

export default FeaturedShow;
