import { useCallback, useEffect, useState } from "react";
import { Movie, RequestStatus } from "../types";
import { API_ALL_MOVIES, fetchMethod } from "../utils/api";

export interface FilmsResponseBody {
  results: Movie[];
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetchMethod<FilmsResponseBody>(API_ALL_MOVIES);
      const newMovies = response?.results;
      setMovies(newMovies);
      setStatus("complete");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, status };
};
