import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { faBookmark, faGear } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Option({ icon, description, onClick }) {
  return (
    <motion.button
      style={{
        display: "flex",
        gap: 8,
        fontSize: 20,
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <p style={{ color: "white" }}>{description}</p>
      <FontAwesomeIcon icon={icon} color="var(--p100)" />
    </motion.button>
  );
}

function Sidebar() {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const navigate = useNavigate();

  return (
    <div className={styles.relativeContainer}>
      <div className={styles.container}>
        <motion.div
          animate={{ rotate: dropdownIsOpen ? "0deg" : "180deg" }}
          transition={{
            duration: 0.7,
            type: "spring",
            stiffness: 620,
            damping: 25,
            bounce: 0.5,
          }}
        >
          <FontAwesomeIcon
            icon={faGear}
            color="white"
            style={{ fontSize: "32px" }}
            onClick={() => setDropdownIsOpen((prev) => !prev)}
          />
        </motion.div>

        <AnimatePresence>
          {dropdownIsOpen && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{
                scaleY: 0,
                transition: {
                  duration: 0.1,
                  ease: "easeOut",
                },
              }}
              transition={{
                duration: 0.22,
                stiffness: 620,
                damping: 23,
                bounce: 0.5,
                type: "spring",
              }}
              className={styles.content}
              style={{ transformOrigin: "top center" }}
            >
              <form action="#" className={styles.searchbarAndButton}>
                <div className={styles.searchInputWrap}>
                  <input
                    type="text"
                    placeholder="Movies, Shows, etc..."
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
              <Option
                icon={faBookmark}
                description={"Watchlist"}
                onClick={() => navigate("/watchlist")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Sidebar;
