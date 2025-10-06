import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pagesProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icons/bubu-Photoroom.png" />
      </Head>
      <Component {...pagesProps} />
    </>
  );
}

export default MyApp;
