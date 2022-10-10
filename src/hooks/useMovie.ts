import { useCallback, useEffect, useState } from "react";
import { Movie, RequestStatus } from "../types";
import { API_SINGLE_MOVIE, fetchMethod } from "../utils/api";

export interface FilmResponseBody {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  created: string;
  edited: string;
  url: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

export const useMovie = (movieId: string) => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [status, setStatus] = useState<RequestStatus>("loading");

  const fetchMovies = useCallback(async () => {
    try {
      const endpoint = API_SINGLE_MOVIE.replace(":id", movieId);
      const response = await fetchMethod<FilmResponseBody>(endpoint);
      setMovie(response);
      setStatus("complete");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movie, status };
};
