import React from "react";
import styles from "./Navbar.module.css";
import Logo from "../../assets/logo.svg?react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <Link to="/" className={`${styles.title} ${styles.titleLink}`}>
        <p>Watch Me</p> <Logo />
      </Link>
      <div className={styles.rightSide}>
        <form action="#" className={styles.searchbarAndButton}>
          <div className={styles.searchInputWrap}>
            <input type="text" placeholder="Search for movies, shows, etc..." />
          </div>
          <button type="submit">
            <span style={{ color: "white", fontSize: 16 }}>Search</span>
          </button>
        </form>
        <FontAwesomeIcon
          icon={faBookmark}
          color="#ffa600"
          style={{ fontSize: "32px" }}
          onClick={() => navigate("/watchlist")}
        />
      </div>
    </div>
  );
}

export default Navbar;
