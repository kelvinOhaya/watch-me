import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import logoSrc from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
// import useNavbar from "../../hooks/useNavbar";

function Navbar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState();
  // const { getSearchResults, searchResults } = useNavbar();

  return (
    <div className={styles.container}>
      <Link to="/" className={`${styles.title} ${styles.titleLink}`}>
        <p>Watch Me</p>
        <img src={logoSrc} alt="Watch Me logo" />
      </Link>
      <div className={styles.rightSide}>
        <form action="#" className={styles.searchbarAndButton}>
          <div className={styles.searchInputWrap}>
            <input
              type="text"
              placeholder="Search for movies, shows, etc..."
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!searchInput.trim()) return;
              navigate(`/search/${searchInput}`);
            }}
          >
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
