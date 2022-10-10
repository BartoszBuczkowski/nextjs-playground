import { useCallback, useEffect, useState } from "react";
import { Character, RequestStatus } from "../types";
import { API_SINGLE_CHARACTER, fetchMethod } from "../utils/api";

export const useCharacter = (characterId: string) => {
  const [character, setCharacter] = useState<Character | undefined>(undefined);
  const [status, setStatus] = useState<RequestStatus>("loading");

  const fetchCharacters = useCallback(async () => {
    try {
      const endpoint = API_SINGLE_CHARACTER.replace(":id", characterId);
      const response = await fetchMethod<Character>(endpoint);
      setCharacter(response);
      setStatus("complete");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { character, status };
};
