import Link from "next/link";
import { CharactersResponseBody } from "../../hooks/useCharacters";
import { getUrlID } from "../../utils/getUrlID";
import css from "../../styles/Layout.module.css";
import { API_ALL_CHARACTERS, fetchMethod } from "../../utils/api";
import { Character } from "../../types";

interface CharactersProps {
  characters: Character[];
}

function Characters({ characters }: CharactersProps) {
  return (
    <div className={css.container}>
      <h3>Filmy</h3>
      <ul>
        {characters.map(({ url, name }) => {
          return (
            <li key={url}>
              <Link href={`/characters/${getUrlID(url)}`}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data, notFound } = await fetchMethod<CharactersResponseBody>(
    API_ALL_CHARACTERS
  );
  const characters = data?.results || [];
  const minute = 60;

  return {
    props: {
      characters,
      pageTitle: "lista postaci",
    },
    revalidate: minute * 5,
    notFound,
  };
}

export default Characters;
