import { MovieCardComponent } from "./MovieCardComponent";
import { Movie, MovieCard, TV, TVCard } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface WatchlistProps {
  movies: MovieCard[];
  shows: TVCard[];
  onToggleWatchlist: (showObj: Movie | TV | MovieCard | TVCard) => void;
  onMovieClick: (card: MovieCard | TVCard, type: "movie" | "tv") => void;
}

export function Watchlist({
  movies,
  shows,
  onToggleWatchlist,
  onMovieClick,
}: WatchlistProps) {
  return (
    <div className="space-y-8">
      <section>
        <motion.h2
          className="text-3xl text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          Movies
        </motion.h2>
        {movies.length === 0 ? (
          <motion.p
            className="text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
          >
            No movies in your watchlist
          </motion.p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02, duration: 0.25 }}
                >
                  <MovieCardComponent
                    {...movie}
                    variant="watchlist"
                    onToggleWatchlist={onToggleWatchlist}
                    onClick={() => onMovieClick(movie, "movie")}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <section>
        <motion.h2
          className="text-3xl text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          Shows
        </motion.h2>
        {shows.length === 0 ? (
          <motion.p
            className="text-center text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.25 }}
          >
            No shows in your watchlist
          </motion.p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence>
              {shows.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02, duration: 0.25 }}
                >
                  <MovieCardComponent
                    {...show}
                    variant="watchlist"
                    onToggleWatchlist={onToggleWatchlist}
                    onClick={() => onMovieClick(show, "tv")}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
