import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getData from "../lib/fetchData";
import Card from "../component/characterCard";
import { useEffect, useState } from "react";

const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

export async function getServerSideProps() {
  const data = await getData(defaultEndpoint);
  return { props: data };
}

export default function Home({ data }) {
  // console.log(data);
  const info = data.info;
  const defaultResults = data.results;

  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const current = page.current;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const response = await getData(current);
      const nextData = response.data;

      if (nextData.error) {
        updateResults([]);
        return;
      }

      updatePage({
        current: current,
        ...nextData.info,
      });

      if (!nextData.info.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function loadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page.next,
      };
    });
  }

  function search(event) {
    event.preventDefault();
    console.log(event, defaultEndpoint + "?name=" + event.target[0].value);
    updatePage((prev) => {
      return {
        ...prev,
        current: defaultEndpoint + "?name=" + event.target[0].value,
      };
    });
  }

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <h1>Rick and Morty</h1>
      <div className={styles.searchForm}>
        <form onSubmit={(event) => search(event)}>
          <input placeholder="Find" className={styles.searchInput} />
          <button className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
      <div className={styles.characterItems}>
        {results.map((result) => {
          return (
            <Card
              key={result.id}
              url={"/character/" + result.id}
              name={result.name}
              image={result.image}
            />
          );
        })}
      </div>
      <div className={styles.loadMore}>
        {page.next ? (
          <button onClick={loadMore} className={styles.loadButton}>
            Load More
          </button>
        ) : null}
      </div>
    </>
  );
}
