import Link from "next/link";
import { FilmsResponseBody } from "../../hooks/useMovies";
import css from "../../styles/Layout.module.css";
import { Movie } from "../../types";
import { API_ALL_MOVIES, fetchMethod } from "../../utils/api";
import { getUrlID } from "../../utils/getUrlID";
import { GetStaticProps } from "next";

interface MoviesProps {
  movies: Movie[];
}

function Movies({ movies }: MoviesProps) {
  return (
    <div className={css.container}>
      <h3>Filmy</h3>
      <ul>
        {movies?.map(({ url, title, episode_id }) => {
          return (
            <li key={episode_id}>
              <Link href={`/movies/${getUrlID(url)}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { data, notFound } = await fetchMethod<FilmsResponseBody>(
    API_ALL_MOVIES
  );
  const movies = data?.results || [];
  const minute = 60;

  return {
    props: {
      movies,
      pageTitle: "lista filmów",
    },
    revalidate: minute * 5,
    notFound,
  };
}

export default Movies;
