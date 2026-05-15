export interface PopularMovies {
  results: MovieCard[];
}

export interface PopularTVShows {
  results: TVCard[];
}

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  releaseYear: string;
  duration: string;
  trailerUrl: string;
  rating: string;
  overview: string;
  type: "movie";
  streamingServices: string[];
  genres: string[];
  hasBeenAdded?: boolean;
}

export interface MovieCard {
  posterUrl: string;
  releaseYear?: string;
  title?: string;
  rating: string;
  overview: string;
  id: string;
  genre: string | null;
  type: "movie";
  hasBeenAdded?: boolean;
}
export interface TVCard {
  posterUrl: string;
  title?: string;
  releaseYear: string;
  genre: string | null;
  rating: string;
  overview: string;
  id: string;
  type: "tv";
  hasBeenAdded?: boolean;
}

export interface TV {
  id: string;
  title: string;
  posterUrl: string;
  releaseYear: string;
  seasons: number;
  episodes: number;
  trailerUrl: string;
  rating: string;
  overview: string;
  type: "tv";
  streamingServices: string[];
  genres: string[];
  hasBeenAdded?: boolean;
}

export interface SearchResults {
  movies: MovieCard[];
  tvShows: TVCard[];
}

export interface Watchlist {
  movies: MovieCard[];
  tvShows: TVCard[];
}
