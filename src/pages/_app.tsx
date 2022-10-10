import "../styles/globals.css";
import type { AppProps } from "next/app";
import Breadcrumbs from "../components/Breadcrumbs";
import Head from "next/head";
import { ReviewsProvider } from "../contexts/ReviewsProvider";
import BackButton from "../components/BackButton/BackButton";

function MyApp({ Component, pageProps }: AppProps<{ pageTitle?: string }>) {
  const currentPageTitle = pageProps?.pageTitle;
  const pageFullTitle = `Zadanie testowe - ${currentPageTitle}`;

  return (
    <>
      <Head>
        <title>{pageFullTitle}</title>
      </Head>
      <Breadcrumbs pageTitle={currentPageTitle} />
      <ReviewsProvider>
        <Component {...pageProps} />
      </ReviewsProvider>
      <BackButton />
    </>
  );
}

export default MyApp;
