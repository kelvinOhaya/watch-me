import {
  Movie,
  TV,
  PopularMovies,
  PopularTVShows,
  MovieCard,
  TVCard,
  SearchResults,
} from "../types";
import { MovieGenres, TVGenres } from "../utils/genres";
import {
  PopularMoviesResponse,
  MovieDetailsResponse,
  PopularTVShowsResponse,
  TVDetailsResponse,
  PopularTVShowResult,
  PopularMoviesResult,
  SearchResultsResponse,
  SearchResult,
} from "./movieDtos";

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hourSuffix = hours > 1 ? "hrs" : "hr";
  const minuteSuffix = minutes > 1 ? "mins" : "min";
  return `${hours + hourSuffix} ${minutes + minuteSuffix}`;
}
export function mapTVDetailsResponseToTV(
  TVDetailsResponse: TVDetailsResponse,
): TV {
  const trailer = TVDetailsResponse.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  return {
    id: TVDetailsResponse.id.toString(),
    title: TVDetailsResponse.name,
    posterUrl: `https://image.tmdb.org/t/p/w500/${TVDetailsResponse.poster_path}`,
    releaseYear: TVDetailsResponse.first_air_date.slice(0, 4),
    seasons: TVDetailsResponse.number_of_seasons,
    episodes: TVDetailsResponse.number_of_episodes,
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : "",
    rating: TVDetailsResponse.vote_average.toString(),
    overview: TVDetailsResponse.overview,
    streamingServices: TVDetailsResponse.production_companies.map(
      (company) => company.name,
    ),
    genres: TVDetailsResponse.genres.map((genre) => genre.name),
    type: "tv",
    hasBeenAdded: false,
  };
}
export function mapMovieDetailsResponseToMovie(
  MovieDetailsResponse: MovieDetailsResponse,
): Movie {
  const trailer = MovieDetailsResponse.videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  return {
    id: MovieDetailsResponse.id.toString(),
    title: MovieDetailsResponse.title,
    posterUrl: `https://image.tmdb.org/t/p/w500/${MovieDetailsResponse.poster_path}`,
    releaseYear: MovieDetailsResponse.release_date.slice(0, 4),
    duration: formatMinutes(MovieDetailsResponse.runtime),
    trailerUrl: trailer ? `https://www.youtube.com/embed/${trailer.key}` : "",
    rating: MovieDetailsResponse.vote_average.toString(),
    overview: MovieDetailsResponse.overview,
    streamingServices: MovieDetailsResponse.production_companies.map(
      (company) => company.name,
    ),
    genres: MovieDetailsResponse.genres.map((genre) => genre.name),
    type: "movie",
    hasBeenAdded: false,
  };
}

export function mapPopularTvShowResultToPopularTvCard(
  PopularTVShowResult: PopularTVShowResult,
): TVCard {
  return {
    title: PopularTVShowResult.name,
    posterUrl: `https://image.tmdb.org/t/p/w500/${PopularTVShowResult.poster_path}`,
    releaseYear: PopularTVShowResult.first_air_date.slice(0, 4),
    genre: PopularTVShowResult.genre_ids.map((id) =>
      TVGenres.findGenreById(id),
    )[0],
    rating: PopularTVShowResult.vote_average.toString(),
    overview: PopularTVShowResult.overview,
    id: PopularTVShowResult.id.toString(),
    type: "tv",
    hasBeenAdded: false,
  };
}

export function mapPopularMovieResultToPopularMovieCard(
  popularMoviesResult: PopularMoviesResult,
): MovieCard {
  return {
    title: popularMoviesResult.title,
    posterUrl: `https://image.tmdb.org/t/p/w500/${popularMoviesResult.poster_path}`,
    releaseYear: popularMoviesResult.release_date.slice(0, 4),
    genre: TVGenres.findGenreById(popularMoviesResult.genre_ids[0]),
    rating: popularMoviesResult.vote_average.toString(),
    overview: popularMoviesResult.overview,
    id: popularMoviesResult.id.toString(),
    type: "movie",
    hasBeenAdded: false,
  };
}

export function mapPopularMoviesResponseToPopularMovies(
  popularMoviesResponse: PopularMoviesResponse,
): PopularMovies {
  return {
    results: popularMoviesResponse.results.map((result) =>
      mapPopularMovieResultToPopularMovieCard(result),
    ),
  };
}

export function mapPopularTVShowResponseToPopularTVShow(
  popularTVShowResponse: PopularTVShowsResponse,
): PopularTVShows {
  return {
    results: popularTVShowResponse.results.map((result) =>
      mapPopularTvShowResultToPopularTvCard(result),
    ),
  };
}

export function mapPopularMoviesResponseToPopularMovie(
  popularMoviesResponse: PopularMoviesResponse,
): PopularMovies {
  return {
    results: popularMoviesResponse.results.map((result) =>
      mapPopularMovieResultToPopularMovieCard(result),
    ),
  };
}

export function mapSearchResultResponseToCard(
  searchResult: SearchResult,
): MovieCard | TVCard | null {
  if (searchResult.media_type === "movie") {
    return {
      title: searchResult.title,
      posterUrl: `https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`,
      releaseYear: searchResult.release_date?.slice(0, 4) ?? "N/A",
      rating: searchResult.vote_average.toString(),
      overview: searchResult.overview,
      id: searchResult.id.toString(),
      genre: MovieGenres.findGenreById(searchResult.genre_ids[0]),
      type: "movie",
      hasBeenAdded: false,
    };
  } else if (searchResult.media_type === "tv") {
    return {
      title: searchResult.name,
      posterUrl: `https://image.tmdb.org/t/p/w500/${searchResult.poster_path}`,
      releaseYear: searchResult.first_air_date?.slice(0, 4) ?? "N/A",
      rating: searchResult.vote_average.toString(),
      overview: searchResult.overview,
      id: searchResult.id.toString(),
      genre: TVGenres.findGenreById(searchResult.genre_ids[0]),
      type: "tv",
      hasBeenAdded: false,
    };
  } else return null;
}

export function mapSearchResultsResponseToSearchResult(
  searchResultsResponse: SearchResultsResponse,
): SearchResults {
  const movieList: MovieCard[] = searchResultsResponse.results
    .filter((result) => result.media_type === "movie")
    .map((e) => mapSearchResultResponseToCard(e))
    .filter((e): e is MovieCard => e !== null);

  const tvList: TVCard[] = searchResultsResponse.results
    .filter((result) => result.media_type === "tv")
    .map((e) => mapSearchResultResponseToCard(e))
    .filter((e): e is TVCard => e !== null);

  return { movies: movieList, tvShows: tvList };
}

export function mapMovieToCard(movie: Movie): MovieCard {
  return {
    posterUrl: movie.posterUrl,
    releaseYear: movie.releaseYear,
    title: movie.title,
    rating: movie.rating,
    overview: movie.overview,
    id: movie.id,
    genre: movie.genres[0],
    type: movie.type,
    hasBeenAdded: movie.hasBeenAdded ?? false,
  };
}

export function mapTvToCard(tv: TV): TVCard {
  return {
    posterUrl: tv.posterUrl,
    title: tv.title,
    releaseYear: tv.releaseYear,
    genre: tv.genres[0],
    rating: tv.rating,
    overview: tv.overview,
    id: tv.id,
    type: tv.type,
    hasBeenAdded: tv.hasBeenAdded ?? false,
  };
}
