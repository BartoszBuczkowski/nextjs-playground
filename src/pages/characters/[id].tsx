import React from "react";
import { CharactersResponseBody } from "../../hooks/useCharacters";
import css from "../../styles/Layout.module.css";
import { Character } from "../../types";
import {
  API_ALL_CHARACTERS,
  API_SINGLE_CHARACTER,
  fetchMethod,
} from "../../utils/api";
import { getUrlID } from "../../utils/getUrlID";
import { GetStaticPropsContext } from "next";

interface CharacterProps {
  character: Character;
}

const Character = ({ character }: CharacterProps) => {
  const { name, height } = character;

  return (
    <div className={css.container}>
      <h3>Nazwa postaci: {name}</h3>
      <p>Wzrost postaci: {height}</p>
    </div>
  );
};

export async function getStaticPaths() {
  const { data, notFound } = await fetchMethod<CharactersResponseBody>(
    API_ALL_CHARACTERS
  );
  const characters = data?.results || [];

  const paths = characters.map(({ url }) => ({
    params: { id: getUrlID(url) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const endpoint = API_SINGLE_CHARACTER.replace(":id", params?.id as string);
  const { data, notFound } = await fetchMethod<Character>(endpoint);
  const minute = 60;

  return {
    props: {
      character: data,
      pageTitle: data?.name,
    },
    revalidate: minute * 5,
    notFound,
  };
}

export default Character;
