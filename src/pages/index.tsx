import type { NextPage } from "next";
import Link from "next/link";
import css from "../styles/Layout.module.css";

const Home: NextPage = () => {
  return (
    <div className={css.container}>
      <ul>
        <li>
          <Link href="/movies">Filmy</Link>
        </li>
        <li>
          <Link href="/characters">Postacie</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
