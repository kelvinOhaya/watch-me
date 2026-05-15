import { MovieCardComponent } from "./MovieCardComponent";
import { Movie, MovieCard, TV, TVCard } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface DashboardProps {
  popularMovies: MovieCard[];
  popularShows: TVCard[];
  onToggleWatchlist: (showObj: Movie | TV | MovieCard | TVCard) => void;
  onMovieClick: (card: MovieCard | TVCard, type: "movie" | "tv") => void;
}

export function Dashboard({
  popularMovies,
  popularShows,
  onToggleWatchlist,
  onMovieClick,
}: DashboardProps) {
  const [showAllMovies, setShowAllMovies] = useState(false);
  const [showAllShows, setShowAllShows] = useState(false);

  const displayedMovies = showAllMovies
    ? popularMovies
    : popularMovies.slice(0, 2);
  const displayedShows = showAllShows ? popularShows : popularShows.slice(0, 2);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-3xl text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
          >
            Popular Movies
          </motion.h2>
          {popularMovies.length > 2 && (
            <motion.button
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setShowAllMovies(!showAllMovies)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllMovies ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}
        </div>
        <div className="grid gap-4">
          <AnimatePresence>
            {displayedMovies.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.25,
                }}
              >
                <MovieCardComponent
                  {...movie}
                  variant="popular"
                  onToggleWatchlist={onToggleWatchlist}
                  onClick={() => onMovieClick(movie, "movie")}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            className="text-3xl text-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            Popular TV Shows
          </motion.h2>
          {popularShows.length > 3 && (
            <motion.button
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={() => setShowAllShows(!showAllShows)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAllShows ? (
                <>
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}
        </div>
        <div className="grid gap-4">
          <AnimatePresence>
            {displayedShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: 0.1 + index * 0.05,
                  duration: 0.25,
                }}
              >
                <MovieCardComponent
                  {...show}
                  variant="popular"
                  onToggleWatchlist={onToggleWatchlist}
                  onClick={() => onMovieClick(show, "tv")}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
