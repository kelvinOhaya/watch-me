import { X, Play, Star, Film } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton-styles.css";
import { Movie, TV } from "../types";

interface MovieDetailModalProps {
  movie: {
    id: string;
    title?: string;
    year?: string;
    genre?: string;
    runtime?: string;
    rating?: number | string;
    description?: string;
    image?: string;
    posterUrl?: string;
    overview?: string;
    trailerUrl?: string;
    streamingServices?: string[];
  };
  isInWatchlist: boolean;
  onClose: () => void;
  onToggleWatchlist: (showObj: Movie | TV) => void;
  isLoading?: boolean;
}

export function MovieDetailModal({
  movie,
  isInWatchlist,
  onClose,
  onToggleWatchlist,
  isLoading = false,
}: MovieDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const [showDelayedLoader, setShowDelayedLoader] = useState(false);

  // Show skeleton loader after 2 seconds
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowDelayedLoader(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowDelayedLoader(false);
    }
  }, [isLoading]);
  const displayImage = movie.image ?? movie.posterUrl ?? "";
  const displayTitle = movie.title ?? movie.overview ?? "Untitled";
  const displayYear = movie.year ?? "";
  const numericRating =
    typeof movie.rating === "string"
      ? parseFloat(movie.rating)
      : (movie.rating ?? 0);
  const displayOverview = movie.description ?? movie.overview ?? "";

  // Format metadata: releaseYear-genre-duration (or seasons if tv)
  const formatMetadata = () => {
    const parts = [];
    if (displayYear) parts.push(displayYear);
    if (movie.genre) parts.push(movie.genre);
    // Check if it's a TV show (has seasons property) or movie (has runtime/duration property)
    if ("seasons" in movie && movie.seasons !== undefined) {
      parts.push(`${movie.seasons} seasons`);
    } else if (movie.runtime) {
      parts.push(movie.runtime);
    }
    return parts.join("-");
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="sticky top-0 bg-background border-b border-border flex items-center justify-between p-4">
          <h2 className="text-xl">{displayTitle}</h2>
          <motion.button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="p-6">
          {isLoading && !showDelayedLoader ? (
            // Show nothing during first 2 seconds of loading
            <div className="min-h-96" />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="aspect-[2/3] bg-secondary rounded-lg overflow-hidden">
                    {!imageError ? (
                      <img
                        src={displayImage}
                        alt={displayTitle}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <Film className="w-16 h-16 opacity-30" />
                        <span className="text-sm opacity-60">
                          No Poster Available
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">
                  {movie.trailerUrl ? (
                    <iframe
                      src={movie.trailerUrl}
                      title={displayTitle}
                      className="w-full aspect-video rounded-lg border border-border/50"
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : (
                    <div className="aspect-video bg-secondary rounded-lg flex flex-col items-center justify-center gap-3 border border-border/50">
                      <Play className="w-16 h-16 text-muted-foreground opacity-30" />
                      <span className="text-sm text-muted-foreground opacity-60">
                        No Trailer Available
                      </span>
                    </div>
                  )}

                  {(movie.streamingServices ?? []).length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {(movie.streamingServices ?? []).map((service, index) => (
                        <motion.div
                          key={service}
                          className="bg-card px-4 py-2 rounded-lg text-sm border border-border/50"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {service}
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-4 bg-secondary/50 rounded-lg border border-border/30">
                      <span className="text-sm text-muted-foreground">
                        No streaming services available
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-6 space-y-4">
            {isLoading && !showDelayedLoader ? (
              // Show nothing for first 2 seconds to avoid flickering
              <div className="h-32" />
            ) : showDelayedLoader ? (
              <div className="skeleton-loader-container">
                <Skeleton className="skeleton-item h-4 w-48" />
                <Skeleton className="skeleton-item h-5 w-12" />
                <Skeleton className="skeleton-item h-20 w-full" />
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground">
                  {formatMetadata()}
                </div>

                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span>{numericRating.toFixed(1)}</span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {displayOverview}
                </p>
              </>
            )}

            <motion.button
              onClick={() => onToggleWatchlist(movie as Movie | TV)}
              className={`w-full md:w-auto px-8 py-3 rounded-full ${
                isInWatchlist
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border-2 border-primary text-primary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isInWatchlist ? "REMOVE FROM WATCHLIST" : "ADD TO WATCHLIST"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
