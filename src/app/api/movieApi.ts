import { Movie, SearchResults, TV } from "../types";
import { PopularMovies, PopularTVShows } from "../types";
import {
  MovieDetailsResponse,
  PopularMoviesResponse,
  PopularTVShowsResponse,
  SearchResultsResponse,
  TVDetailsResponse,
} from "./movieDtos";

async function getRequest(url: string): Promise<any> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}
import {
  mapMovieDetailsResponseToMovie,
  mapPopularMoviesResponseToPopularMovies,
  mapPopularTVShowResponseToPopularTVShow,
  mapSearchResultsResponseToSearchResult,
  mapTVDetailsResponseToTV,
} from "./movieMappers";

export async function fetchPopularMovies(): Promise<PopularMovies> {
  const result: PopularMoviesResponse = await getRequest(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  );
  const popularMovies: PopularMovies =
    mapPopularMoviesResponseToPopularMovies(result);
  return popularMovies;
}

export async function fetchPopularTVShows(): Promise<PopularTVShows> {
  const result: PopularTVShowsResponse = await getRequest(
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
  );
  const popularTVShows: PopularTVShows =
    mapPopularTVShowResponseToPopularTVShow(result);
  return popularTVShows;
}

export async function fetchMovieDetails(movieID: number): Promise<Movie> {
  const result: MovieDetailsResponse = await getRequest(
    `https://api.themoviedb.org/3/movie/${movieID}?append_to_response=videos`,
  );

  const res: Movie = mapMovieDetailsResponseToMovie(result);
  return res;
}

export async function fetchTVDetails(TVShowID: number): Promise<TV> {
  const result: TVDetailsResponse = await getRequest(
    `https://api.themoviedb.org/3/tv/${TVShowID}?append_to_response=videos`,
  );
  const res: TV = mapTVDetailsResponseToTV(result);
  return res;
}

export async function fetchSearchResults(
  query: string,
): Promise<SearchResults> {
  const encoded = encodeURIComponent(query);
  const result: SearchResultsResponse = await getRequest(
    `https://api.themoviedb.org/3/search/multi?query=${encoded}&include_adult=false&language=en-US&page=1`,
  );
  const searchResults: SearchResults =
    mapSearchResultsResponseToSearchResult(result);
  return searchResults;
}
