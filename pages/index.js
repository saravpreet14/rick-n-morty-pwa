import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import getData from "../lib/fetchData";
import Card from "../components/characterCard";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// const defaultEndpoint = "https://rickandmortyapi.com/api/character/";

// export async function getServerSideProps() {
//   const data = await getData(defaultEndpoint);
//   return { props: data };
// }
console.log("top");
var isSearch = false;
// export var isHome = false;
var current_filter = "";
export default function Home() {
  // console.log(data);
  // const info = data.info;
  // const defaultResults = data.results;

  // const [results, updateResults] = useState(defaultResults);

  // const [page, updatePage] = useState({
  //   ...info,
  //   current: defaultEndpoint,
  // });
  // // console.log(page, info);
  // const current = page.current;

  // useEffect(() => {
  //   if (current === defaultEndpoint) return;

  //   async function request() {
  //     const response = await getData(current);
  //     const nextData = response.data;

  //     if (nextData.error) {
  //       updateResults([]);
  //       return;
  //     }

  //     updatePage({
  //       current: current,
  //       ...nextData.info,
  //     });

  //     if (!nextData.info.prev) {
  //       updateResults(nextData.results);
  //       return;
  //     }

  //     updateResults((prev) => {
  //       return [...prev, ...nextData.results];
  //     });
  //   }

  //   request();
  // }, [current]);

  const Characters_data = gql`
    query CharactersQuery($page: Int, $filter: FilterCharacter) {
      characters(page: $page, filter: $filter) {
        info {
          prev
          next
        }
        results {
          id
          name
          status
          species
          type
          gender
          origin {
            name
          }
          location {
            name
          }
          image
        }
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(Characters_data, {
    variables: { page: 1, filter: {} },
  });

  // const {
  //   loading: search_loading,
  //   error: search_error,
  //   data: search_data,
  //   fetchMore: search_fetchMore,
  // } = useQuery(Characters_data, {
  //   variables: { page: null, filter: null },
  // });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  function loadMore(isSearch, current_filter) {
    const nextPage = data.characters.info.next;
    var variables = { page: nextPage, filter: {} };
    console.log(isSearch);
    if (isSearch) {
      variables = { page: nextPage, filter: { name: current_filter } };
    }
    console.log(variables);

    fetchMore({
      variables: variables,
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.characters.results = [
          ...prevResult.characters.results,
          ...fetchMoreResult.characters.results,
        ];
        return fetchMoreResult;
      },
    });
  }

  function search(event) {
    event.preventDefault();
    // console.log("entered search");
    isSearch = true;
    current_filter = event.target[0].value;
    console.log(isSearch);

    fetchMore({
      variables: { page: null, filter: { name: current_filter } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
    console.log(isSearch);
  }
  console.log(data);
  const results = data.characters.results;
  const info = data.characters.info;

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <h1>Rick and Morty</h1>
      <div className={styles.searchForm}>
        <form
          onSubmit={(event) => {
            search(event);
          }}
        >
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
      <div className={styles.loadMore}>
        {info.next ? (
          <button
            onClick={() => loadMore(isSearch, current_filter)}
            className={styles.loadButton}
          >
            Load More
          </button>
        ) : null}
      </div>
    </>
  );
}
