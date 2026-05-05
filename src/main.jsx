import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";

// main.jsx (after rendering App)
const root = createRoot(document.getElementById("root"));
root.render(<App />);

// Delayed loader: only show spinner if loading takes >1s
const loader = document.getElementById("initial-loader");
if (loader) {
  const showDelay = 1000; // 1 second
  let spinnerShown = false;
  const showTimer = setTimeout(() => {
    loader.classList.add("show-spinner");
    spinnerShown = true;
  }, showDelay);

  // Once React has painted, remove or fade the loader
  requestAnimationFrame(() => {
    // If spinner not yet shown -> app loaded quickly: cancel timer and remove loader immediately
    if (!spinnerShown) {
      clearTimeout(showTimer);
      loader.remove();
      return;
    }
    // If spinner already shown (app took >1s), fade out then remove
    loader.classList.add("hidden");
    setTimeout(() => loader.remove(), 250);
  });
}
