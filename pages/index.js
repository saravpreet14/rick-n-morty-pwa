import Head from "next/head";
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
<<<<<<< HEAD
  console.log(data);
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
        updateResults([])
        return;
      }
=======
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
>>>>>>> dd1a1213e5ecf98cbc9046fb2b658772d4369da3

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

<<<<<<< HEAD
  function search(event) {
    event.preventDefault();
    console.log(event, defaultEndpoint + '?name=' + event.target[0].value);
    updatePage((prev) => {
      return {
        ...prev,
        current: defaultEndpoint + '?name=' + event.target[0].value
      }
    })
  }

=======
>>>>>>> dd1a1213e5ecf98cbc9046fb2b658772d4369da3
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <h1>Rick and Morty</h1>
<<<<<<< HEAD
      <div className={styles.searchForm}>
        <form onSubmit={(event) => search(event)}>
          <input placeholder='Search' />
          <button className={styles.searchButton}><img src='/images/search.jpg' className={styles.searchButtonImage} /></button>
        </form>
      </div>
=======
>>>>>>> dd1a1213e5ecf98cbc9046fb2b658772d4369da3
      <div className={styles.grid}>
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
      <p>
        {page.next ? (
          <button onClick={loadMore} className={styles.loadButton}>
            Load More
          </button>
        ) : null}
      </p>
    </>
  );
}
