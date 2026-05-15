import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Watchlist } from "./components/Watchlist";
import { SearchResultsComponent } from "./components/SearchResults";
import { MovieDetailModal } from "./components/MovieDetailModal";
import { Movie, MovieCard, TVCard, TV } from "./types";
import useMediaLibrary from "./hooks/useMediaLibrary";
import useSearch from "./hooks/useSearch";
import useWatchlist from "./hooks/useWatchlist";

const MOCK_MOVIES: any[] = [
  {
    id: "1",
    title: "The Amazing Digital Circus: The Last Act",
    year: "2024",
    rating: 4.5,
    genre: "Animation",
    runtime: "1h 45m",
    description:
      "Jax finds himself and his friends trying to survive the circus after Caine died. What will happen? Will Pomni abandon to be the main character? Will Ragatha finally snap at everyone they love save Gangle? Oh, and Caine's dead! It doesn't make the cast a threat to the adventure in The Amazing Digital Circus: The Last Act",
    image:
      "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Hulu", "Netflix", "Crunchyroll", "Disney+"],
  },
  {
    id: "2",
    title: "Cosmic Journey",
    year: "2024",
    rating: 4.2,
    genre: "Sci-Fi",
    runtime: "2h 15m",
    description:
      "An epic space adventure following a crew of explorers as they venture into the unknown reaches of the galaxy, discovering new worlds and facing unprecedented challenges.",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Netflix", "HBO Max"],
  },
  {
    id: "3",
    title: "Mystery at Midnight",
    year: "2023",
    rating: 4.7,
    genre: "Thriller",
    runtime: "1h 58m",
    description:
      "A detective uncovers a web of secrets in a small town where nothing is as it seems. Every clue leads to more questions in this gripping mystery.",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Prime Video", "Apple TV+"],
  },
  {
    id: "4",
    title: "Summer Dreams",
    year: "2024",
    rating: 4.0,
    genre: "Romance",
    runtime: "1h 42m",
    description:
      "A heartwarming tale of unexpected love found during a summer vacation. Two strangers meet by chance and discover that sometimes the best things in life are unplanned.",
    image:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Netflix"],
  },
  {
    id: "5",
    title: "Dragon's Legacy",
    year: "2023",
    rating: 4.8,
    genre: "Fantasy",
    runtime: "2h 30m",
    description:
      "In a world where dragons once ruled, a young warrior must unite the kingdoms to face an ancient evil that threatens to return.",
    image:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["HBO Max", "Disney+"],
  },
  {
    id: "6",
    title: "The Hidden City",
    year: "2024",
    rating: 4.3,
    genre: "Adventure",
    runtime: "2h 05m",
    description:
      "An archaeologist discovers clues to a legendary lost city, leading to an adventure filled with danger, wonder, and ancient mysteries.",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Prime Video"],
  },
  {
    id: "7",
    title: "Neon Nights",
    year: "2023",
    rating: 4.1,
    genre: "Action",
    runtime: "1h 55m",
    description:
      "In a cyberpunk future, a lone hacker takes on a powerful corporation in a high-stakes game of cat and mouse through the neon-lit streets.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Netflix", "Hulu"],
  },
  {
    id: "8",
    title: "The Last Garden",
    year: "2024",
    rating: 4.6,
    genre: "Drama",
    runtime: "2h 10m",
    description:
      "A poignant story about family, loss, and healing, centered around a grandmother's beloved garden that holds generations of memories.",
    image:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Apple TV+"],
  },
  {
    id: "9",
    title: "Quantum Shift",
    year: "2023",
    rating: 4.4,
    genre: "Sci-Fi",
    runtime: "2h 20m",
    description:
      "A physicist discovers the ability to shift between parallel universes, but each jump brings unexpected consequences that threaten reality itself.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["HBO Max"],
  },
  {
    id: "10",
    title: "Whispers in the Dark",
    year: "2024",
    rating: 4.5,
    genre: "Horror",
    runtime: "1h 48m",
    description:
      "A family moves into an old mansion, only to discover that the whispers in the night are more than just the wind. Something lurks in the shadows.",
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    type: "movie",
    streamingServices: ["Netflix", "Prime Video"],
  },
  {
    id: "11",
    title: "Echo Chamber",
    year: "2023",
    rating: 4.2,
    genre: "Drama",
    runtime: "8 episodes",
    description:
      "A gripping series about a journalist investigating a conspiracy that goes deeper than anyone imagined.",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
    type: "show",
    streamingServices: ["Hulu"],
  },
  {
    id: "12",
    title: "Chronicles of Tomorrow",
    year: "2024",
    rating: 4.7,
    genre: "Sci-Fi",
    runtime: "10 episodes",
    description:
      "In a future where time travel is possible, a team of specialists must prevent catastrophic changes to the timeline.",
    image:
      "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=400&h=600&fit=crop",
    type: "show",
    streamingServices: ["Netflix", "Disney+"],
  },
];

export default function App() {
  const {
    popularMovies,
    popularTVShows,
    currentShow,
    isLoadingDetails,
    getMovieDetails,
    getTVDetails,
  } = useMediaLibrary();

  const [activeTab, setActiveTab] = useState<
    "dashboard" | "watchlist" | "search"
  >("dashboard");

  const { watchlist, toggleWatchlist, hasBeenAdded } = useWatchlist();

  /*
  Track which type of detail was requested (movie or tv)
  */
  const [detailType, setDetailType] = useState<"movie" | "tv" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { search, searchResults } = useSearch();

  const handleToggleWatchlist = (showObj: Movie | TV | MovieCard | TVCard) => {
    toggleWatchlist(showObj);
  };

  const popularMoviesWithWatchlist =
    popularMovies?.results.map((movie) => ({
      ...movie,
      hasBeenAdded: hasBeenAdded(movie),
    })) ?? [];

  const popularShowsWithWatchlist =
    popularTVShows?.results.map((show) => ({
      ...show,
      hasBeenAdded: hasBeenAdded(show),
    })) ?? [];

  const searchResultsWithWatchlist = searchResults
    ? {
        movies:
          searchResults.movies?.map((movie) => ({
            ...movie,
            hasBeenAdded: hasBeenAdded(movie),
          })) ?? [],
        tvShows:
          searchResults.tvShows?.map((show) => ({
            ...show,
            hasBeenAdded: hasBeenAdded(show),
          })) ?? [],
      }
    : null;

  const watchlistMovies = watchlist.movies.filter(
    (movie) => movie.hasBeenAdded,
  );
  const watchlistShows = watchlist.tvShows.filter((show) => show.hasBeenAdded);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      search(query);
      setActiveTab("search");
    } else {
      setActiveTab("dashboard");
    }
  };

  const handleCardClick = async (
    card: MovieCard | TVCard | any,
    type: "movie" | "tv",
  ) => {
    const id = parseInt(card.id, 10);
    try {
      if (type === "movie") {
        setDetailType("movie");
        await getMovieDetails(id);
      } else {
        setDetailType("tv");
        await getTVDetails(id);
      }
    } catch (error) {
      console.error(`Failed to fetch ${type} details:`, error);
    }
  };

  const handleReturnToDashboard = () => {
    setActiveTab("dashboard");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onSearch={handleSearch} onLogoClick={handleReturnToDashboard} />

      {activeTab !== "search" && (
        <nav className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-4 sm:gap-8">
            <motion.button
              onClick={() => {
                setActiveTab("dashboard");
                setSearchQuery("");
              }}
              className={`py-4 border-b-2 transition-colors relative ${
                activeTab === "dashboard"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
              {activeTab === "dashboard" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => {
                setActiveTab("watchlist");
                setSearchQuery("");
              }}
              className={`py-4 border-b-2 transition-colors relative ${
                activeTab === "watchlist"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watchlist
              {activeTab === "watchlist" && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                />
              )}
            </motion.button>
          </div>
        </nav>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Dashboard
                popularMovies={popularMoviesWithWatchlist.slice(0, 9)}
                popularShows={popularShowsWithWatchlist.slice(0, 9)}
                onToggleWatchlist={handleToggleWatchlist}
                onMovieClick={handleCardClick}
              />
            </motion.div>
          ) : activeTab === "watchlist" ? (
            <motion.div
              key="watchlist"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Watchlist
                movies={watchlistMovies}
                shows={watchlistShows}
                onToggleWatchlist={handleToggleWatchlist}
                onMovieClick={handleCardClick}
              />
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <SearchResultsComponent
                query={searchQuery}
                results={searchResultsWithWatchlist}
                onToggleWatchlist={handleToggleWatchlist}
                onMovieClick={handleCardClick}
                onBackToDashboard={handleReturnToDashboard}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {detailType && currentShow && (
          <MovieDetailModal
            movie={currentShow}
            isInWatchlist={hasBeenAdded(currentShow)}
            onClose={() => {
              setDetailType(null);
            }}
            onToggleWatchlist={handleToggleWatchlist}
            isLoading={isLoadingDetails}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
