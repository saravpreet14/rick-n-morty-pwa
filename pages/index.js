import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../component/characterCard";
import { useEffect, useState } from "react";
import { getCharacters } from '../lib/getData';

const defaultPage = {
  page: 1, 
  name: ''
};

export async function getServerSideProps() {
  const data = await getCharacters();
  return { props: {data} };
}

export default function Home({ data }) {
  const info = data.info;
  const defaultResults = data.results;

  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultPage,
  });

  const current = page.current;

  useEffect(() => {
    if (current === defaultPage) return;

    async function request() {
      const nextData = await getCharacters(current.page, current.name);

      if (!nextData) {
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
        current: {
          page: page.next,
          name: prev.current.name
        },
      };
    });
  }

  function search(event) {
    event.preventDefault();
    const searchQuery = event.target[0].value;

    updatePage((prev) => {
      return {
        ...prev,
        current: {
          page: 1,
          name: searchQuery,
        }
      };
    });

    event.target[0].value = ''
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
          <button className={styles.searchButton}>Search</button>
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
      {
        results.length > 0 ? null : 
        <div className={styles.noDataMessage}>
          <h2>Nothing to show</h2>
        </div>
      }
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
