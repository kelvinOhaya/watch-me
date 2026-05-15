import { MovieCardComponent } from "./MovieCardComponent";
import { Movie, MovieCard, TVCard, SearchResults, TV } from "../types";
import { motion } from "motion/react";
import { Search, ArrowLeft } from "lucide-react";

interface SearchResultsProps {
  query: string;
  results: SearchResults | null;
  onToggleWatchlist: (showObj: MovieCard | TVCard | Movie | TV) => void;
  onMovieClick: (card: MovieCard | TVCard | any, type: "movie" | "tv") => void;
  onBackToDashboard?: () => void;
}

export function SearchResultsComponent({
  query,
  results,
  onToggleWatchlist,
  onMovieClick,
  onBackToDashboard,
}: SearchResultsProps) {
  const movieResults = results?.movies ?? [];
  const showResults = results?.tvShows ?? [];
  const totalResults = movieResults.length + showResults.length;

  return (
    results && (
      <div className="space-y-8">
        <div className="space-y-4">
          <motion.button
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onBackToDashboard}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            <Search className="w-6 h-6 text-primary" />
            <h2 className="text-2xl">
              Search results for <span className="text-primary">"{query}"</span>
            </h2>
          </motion.div>
        </div>

        {totalResults === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16 gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.25 }}
          >
            <Search className="w-16 h-16 text-muted-foreground opacity-30" />
            <p className="text-muted-foreground text-center">
              No results found for "{query}"
            </p>
            <p className="text-sm text-muted-foreground opacity-60">
              Try adjusting your search terms
            </p>
          </motion.div>
        ) : (
          <>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.25 }}
            >
              Found {totalResults} {totalResults === 1 ? "result" : "results"}
            </motion.p>

            {movieResults.length > 0 && (
              <section>
                <motion.h3
                  className="text-xl text-primary mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 }}
                >
                  Movies ({movieResults.length})
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movieResults.map((movie: MovieCard, index: number) => (
                    <motion.div
                      key={movie.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.02, duration: 0.25 }}
                    >
                      <MovieCardComponent
                        {...movie}
                        variant="featured"
                        onToggleWatchlist={onToggleWatchlist}
                        onClick={() => onMovieClick(movie, "movie")}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {showResults.length > 0 && (
              <section>
                <motion.h3
                  className="text-xl text-primary mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  TV Shows ({showResults.length})
                </motion.h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {showResults.map((show: TVCard, index: number) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.02, duration: 0.25 }}
                    >
                      <MovieCardComponent
                        {...show}
                        variant="featured"
                        onToggleWatchlist={onToggleWatchlist}
                        onClick={() => onMovieClick(show, "tv")}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    )
  );
}
