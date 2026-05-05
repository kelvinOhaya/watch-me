import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Information from "./pages/Information/Information";
import Watchlist from "./pages/Watchlist/Watchlist";
import Search from "./pages/Search/Search";
import Navbar from "./components/Navbar/Navbar";

const router = createBrowserRouter([
  { index: true, element: <Home /> },
  { path: "info/:showType/:showId", element: <Information /> },
  { path: "search/:searchQuery", element: <Search /> },
  { path: "watchlist", element: <Watchlist /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
