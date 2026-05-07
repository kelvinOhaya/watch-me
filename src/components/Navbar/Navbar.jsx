import React, { useState } from "react";
import styles from "./Navbar.module.css";
import logoSrc from "../../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { motion, scale } from "framer-motion";
import { useMediaQuery } from "react-responsive";

// import useNavbar from "../../hooks/useNavbar";

function Navbar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState();
  const [hoverOnTitle, setHoverOnTitle] = useState(false);
  // const { getSearchResults, searchResults } = useNavbar();
  const sidebarThreshold = useMediaQuery({ query: "(max-width: 755px)" });
  return (
    <div className={styles.container}>
      <Link
        to="/"
        onMouseEnter={() => setHoverOnTitle(true)}
        onMouseLeave={() => setHoverOnTitle(false)}
        className={`${styles.title} ${styles.titleLink}`}
      >
        <motion.p
          animate={{
            scale: hoverOnTitle ? 1.05 : 1,
            textShadow: hoverOnTitle ? "0 0 12px 0 #d98700" : "none",
          }}
        >
          Watch Me
        </motion.p>
        <motion.img
          animate={{
            rotate: hoverOnTitle ? -5 : 0,
            scale: hoverOnTitle ? 1.125 : 1,
          }}
          src={logoSrc}
          alt="Watch Me logo"
          style={{ height: "clamp(16px, 1rem + 2vw, 32px)" }}
        />
      </Link>
      {!sidebarThreshold && (
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
                navigate(`/search/${searchInput}`, { viewTransition: true });
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
      )}
      {sidebarThreshold && (
        <div className={styles.sidebarContainer}>
          <Sidebar />
        </div>
      )}
    </div>
  );
}

export default Navbar;
