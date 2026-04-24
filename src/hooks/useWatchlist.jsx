import React, { useState } from "react";

function useWatchlist() {
  const [watchlist, setWatchlist] = useState(
    localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [],
  );

  const logWatchlist = () => console.log(watchlist);
  const loadWatchlist = () =>
    localStorage.getItem("watchlist")
      ? JSON.parse(localStorage.getItem("watchlist"))
      : [];

  const saveWatchlist = () => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  const addToWatchList = (show, id, type) => {
    const newShow = { ...show, id: id, type: type };
    setWatchlist((prev) => [...prev, newShow]);
  };
  const removeFromWatchList = (id, type) => {
    setWatchlist((prev) =>
      prev.filter((show) => !(show.id === id && show.type === type)),
    );
    logWatchlist();
  };

  const hasBeenSaved = (show, id, type) => {
    const showWasFound =
      watchlist.filter(
        (savedShow) => id === savedShow.id && type === savedShow.type,
      ).length > 0;
    logWatchlist();
    return showWasFound;
  };
  //DEBUGGING PURPOSES ONLY
  const empty = () => localStorage.setItem("watchlist", "[]");
  return {
    addToWatchList,
    removeFromWatchList,
    hasBeenSaved,
    loadWatchlist,
    saveWatchlist,
    watchlist,
    empty,
  };
}

export default useWatchlist;
