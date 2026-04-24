import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PageStatus from "../../components/PageStatus/PageStatus";
import { useParams } from "react-router-dom";
import FeaturedShow from "../../components/FeaturedShow/FeaturedShow";
import styles from "./Search.module.css";
import useNavbar from "../../hooks/useNavbar";
import { gsap } from "gsap";

const SECTION_ENTRY_DURATION = 0.3;

function Search() {
  const {
    searchResults,
    getSearchResults,
    tvGenres,
    movieGenres,
    isSearching,
  } = useNavbar();
  const { searchQuery } = useParams();
  const moviesRef = useRef(null);
  const tvRef = useRef(null);
  const emptyStateRef = useRef(null);
  const [hasResolvedQuery, setHasResolvedQuery] = useState(false);
  const movieResults = searchResults.filter((e) => e.media_type === "movie");
  const tvResults = searchResults.filter((e) => e.media_type === "tv");
  const hasRenderableResults = movieResults.length > 0 || tvResults.length > 0;

  useEffect(() => {
    let active = true;

    const loadQuery = async () => {
      if (!searchQuery) {
        setHasResolvedQuery(false);
        return;
      }

      setHasResolvedQuery(false);
      await getSearchResults(searchQuery);
      if (active) setHasResolvedQuery(true);
    };

    loadQuery();

    return () => {
      active = false;
    };
  }, [searchQuery, getSearchResults]);

  useEffect(() => {
    if (!hasRenderableResults) return;

    const animateItems = (items) => {
      if (!items.length) return;

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 5,
        },
        {
          opacity: 1,
          y: 0,
          duration: SECTION_ENTRY_DURATION,
          stagger: 0.06,
          ease: "power1.out",
        },
      );
    };

    animateItems(Array.from(moviesRef.current?.children ?? []));
    animateItems(Array.from(tvRef.current?.children ?? []));
  }, [hasRenderableResults, searchResults]);

  useEffect(() => {
    if (
      isSearching ||
      !hasResolvedQuery ||
      hasRenderableResults ||
      !searchQuery ||
      !emptyStateRef.current
    ) {
      return;
    }

    gsap.fromTo(
      emptyStateRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" },
    );
  }, [isSearching, hasResolvedQuery, hasRenderableResults, searchQuery]);

  if (isSearching)
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <h1 className={styles.title}>Searching for "{searchQuery}"</h1>
        </div>
      </>
    );

  if (hasRenderableResults)
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <h1 className={styles.title}>Results for "{searchQuery}"</h1>
          <section>
            <h2 className={styles.sectionTitle}>Movies</h2>
            <div className={styles.showContainer} ref={moviesRef}>
              {movieResults.map((show, index) => (
                <FeaturedShow
                  key={`popular-${index}`}
                  show={show}
                  type={show.media_type}
                  movieGenres={movieGenres}
                  tvGenres={tvGenres}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </section>
          <section>
            <h2 className={styles.sectionTitle}>TV Shows</h2>
            <div className={styles.showContainer} ref={tvRef}>
              {tvResults?.map((show, index) => (
                <FeaturedShow
                  key={`popular-${index}`}
                  show={show}
                  type={show.media_type}
                  movieGenres={movieGenres}
                  tvGenres={tvGenres}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          </section>
        </div>
      </>
    );

  if (!hasResolvedQuery) {
    return (
      <>
        <Navbar />
        <div className={styles.page}>
          <h1 className={styles.title}>Searching for "{searchQuery}"</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className={styles.page}>
        <h1 className={styles.title}>Results for "{searchQuery}"</h1>
        <PageStatus
          ref={emptyStateRef}
          eyebrow="No results found"
          title={`We could not find any movies or TV shows for "${searchQuery}".`}
          copy="Check for typos, try fewer words, or search with a more common title."
        />
      </div>
    </>
  );
}

export default Search;
