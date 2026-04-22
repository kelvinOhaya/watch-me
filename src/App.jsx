import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Information from "./pages/Information/Information";
import Watchlist from "./pages/Watchlist/Watchlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Information />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
