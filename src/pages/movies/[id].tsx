import { link } from "fs";
import { GetStaticPropsContext } from "next";
import { FilmResponseBody } from "../../hooks/useMovie";
import { FilmsResponseBody } from "../../hooks/useMovies";
import css from "../../styles/Layout.module.css";
import type { Character, Movie } from "../../types";
import { API_ALL_MOVIES, API_SINGLE_MOVIE, fetchMethod } from "../../utils/api";
import { getUrlID } from "../../utils/getUrlID";
import ReviewsForm from "../../components/ReviewsForm/ReviewsForm";
import Link from "next/link";
import { useReviews } from "../../hooks/useReviews";
import { useRouter } from "next/router";
import CharactersList from "../../components/CharactersList/CharactersList";
import ReviewsList from "../../components/ReviewsList/ReviewsList";

interface MovieWithFetchedCharacters extends Omit<Movie, "characters"> {
  characters: Character[];
}

interface MovieProps {
  movie: MovieWithFetchedCharacters;
}

const Movie = ({ movie }: MovieProps) => {
  const { title, opening_crawl, characters } = movie;

  return (
    <div className={css.container}>
      <h3>Film: {title}</h3>
      <p>{opening_crawl}</p>

      <p>Postacie w filmie:</p>
      {characters && <CharactersList characters={characters} />}

      <h3>Recenzje</h3>
      <ReviewsList />
      <ReviewsForm />
    </div>
  );
};

export async function getStaticPaths() {
  const { data } = await fetchMethod<FilmsResponseBody>(API_ALL_MOVIES);
  const movies = data?.results || [];

  const paths = movies.map(({ url }) => ({
    params: { id: getUrlID(url) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const endpoint = API_SINGLE_MOVIE.replace(":id", params?.id as string);
  const { data, notFound } = await fetchMethod<FilmResponseBody>(endpoint);

  if (notFound || !data) {
    return { notFound };
  }

  const { characters, ...movie } = data;

  const fetchedCharacters = await Promise.all(
    characters.map(async (endpoint) => {
      const singleCharacter = await fetchMethod<Character>(endpoint);
      return singleCharacter?.data;
    })
  );
  const minute = 60;

  return {
    props: {
      movie: { ...movie, characters: fetchedCharacters },
      pageTitle: movie?.title,
    },
    revalidate: minute * 5,
    notFound,
  };
}

export default Movie;
