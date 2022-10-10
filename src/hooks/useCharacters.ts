import { useCallback, useEffect, useState } from "react";
import { Character, RequestStatus } from "../types";
import { API_ALL_CHARACTERS, fetchMethod } from "../utils/api";

export interface CharactersResponseBody {
  results: Character[];
}

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [status, setStatus] = useState<RequestStatus>("loading");

  const fetchCharacters = useCallback(async () => {
    try {
      const response = await fetchMethod<CharactersResponseBody>(
        API_ALL_CHARACTERS
      );
      const newMovies = response?.results;
      setCharacters(newMovies);
      setStatus("complete");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { characters, status };
};
