import Link from "next/link";
import { Character } from "../../types";
import { getUrlID } from "../../utils/getUrlID";

interface CharactersListProps {
  characters: Character[];
}

function CharactersList({ characters }: CharactersListProps) {
  return (
    <ul>
      {characters.map(({ name, url }) => {
        const id = getUrlID(url);
        return (
          <li key={name}>
            {id ? <Link href={`/characters/${id}`}>{name}</Link> : <>{name}</>}
          </li>
        );
      })}
    </ul>
  );
}

export default CharactersList;
