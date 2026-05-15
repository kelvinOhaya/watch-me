/** @jsxImportSource react */
import { Star, Bookmark, X, Film } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Movie, MovieCard, TVCard, TV } from "../types";

interface MovieCardComponentProps {
  id: string;
  type?: "movie" | "tv";
  title?: string;
  year?: string;
  rating?: number | string;
  genre?: string | null;
  runtime?: string;
  description?: string;
  image?: string;
  posterUrl?: string;
  releaseYear?: string;
  overview?: string;
  isInWatchlist?: boolean;
  hasBeenAdded?: boolean;
  variant?: "featured" | "popular" | "watchlist";
  onToggleWatchlist?: (showObj: Movie | TV | MovieCard | TVCard) => void;
  onClick?: () => void;
}

export function MovieCardComponent({
  id,
  type,
  title,
  year,
  rating,
  genre,
  runtime,
  description,
  image,
  posterUrl,
  releaseYear,
  overview,
  isInWatchlist = false,
  hasBeenAdded,
  variant = "featured",
  onToggleWatchlist,
  onClick,
}: MovieCardComponentProps) {
  const [imageError, setImageError] = useState(false);

  const displayImage = image ?? posterUrl ?? "";
  const displayTitle = title ?? overview ?? "Untitled";
  const displayYear = year ?? releaseYear ?? "";
  const numericRating =
    typeof rating === "string" ? parseFloat(rating) : (rating ?? 0);
  const bookmarked = hasBeenAdded ?? isInWatchlist;

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWatchlist?.({
      id,
      title: title ?? displayTitle,
      posterUrl: displayImage,
      releaseYear: displayYear,
      rating: typeof rating === "string" ? rating : String(numericRating),
      overview: overview ?? description ?? "",
      genre: genre ?? null,
      type: type ?? "movie",
      hasBeenAdded: bookmarked,
    } as Movie | TV | MovieCard | TVCard);
  };

  if (variant === "popular") {
    return (
      <motion.div
        className="bg-card rounded-lg overflow-hidden cursor-pointer"
        onClick={onClick}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex gap-4 p-4">
          <div className="w-24 h-36 flex-shrink-0 bg-secondary rounded overflow-hidden">
            {!imageError ? (
              <img
                src={displayImage}
                alt={displayTitle}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Film className="w-8 h-8 opacity-30" />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg mb-1">{displayTitle}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{displayYear}</span>
              {genre && <span>• {genre}</span>}
              {runtime && <span>• {runtime}</span>}
            </div>
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm">{numericRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
              {description}
            </p>
          </div>
          <motion.button
            onClick={handleToggleWatchlist}
            className="text-primary self-start"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bookmark
              className={`w-6 h-6 ${bookmarked ? "fill-primary" : ""}`}
            />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (variant === "watchlist") {
    return (
      <motion.div
        className="bg-card rounded-lg overflow-hidden cursor-pointer relative group"
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="aspect-[2/3] bg-secondary">
          {!imageError ? (
            <img
              src={displayImage}
              alt={displayTitle}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Film className="w-12 h-12 opacity-30" />
            </div>
          )}
        </div>
        <div className="p-3 flex items-center justify-between">
          <h3 className="text-sm">{displayTitle}</h3>
          <motion.button
            onClick={handleToggleWatchlist}
            className="text-muted-foreground hover:text-foreground"
            whileHover={{ scale: 1.2, rotate: 90 }}
            whileTap={{ scale: 0.8 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-card rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="aspect-[2/3] bg-secondary relative">
        {!imageError ? (
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Film className="w-12 h-12 opacity-30" />
          </div>
        )}
        <motion.button
          onClick={handleToggleWatchlist}
          className="absolute bottom-2 right-2 text-primary"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-primary" : ""}`} />
        </motion.button>
      </div>
      <div className="p-3">
        <h3 className="text-sm mb-1">{displayTitle}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {numericRating.toFixed(1)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
