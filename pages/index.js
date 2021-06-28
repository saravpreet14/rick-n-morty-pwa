import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "../components/characterCard/characterCard";
import { useQuery, gql } from "@apollo/client";
import SearchBar from '../components/searchBar/searchBar';
import CharacterList from '../components/characterList/characterList';

var isSearch = false;
var current_filter = "";
export default function Home() {
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
          image
        }
      }
    }
  `;

  const { loading, error, data, fetchMore } = useQuery(Characters_data, {
    variables: { page: 1, filter: {} },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  function loadMore(isSearch, current_filter) {
    const nextPage = data.characters.info.next;
    var variables = { page: nextPage, filter: {} };
    if (isSearch) {
      variables = { page: nextPage, filter: { name: current_filter } };
    }

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
    isSearch = true;
    current_filter = event.target[0].value;
    console.log(isSearch);

    fetchMore({
      variables: { page: null, filter: { name: current_filter } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return fetchMoreResult;
      },
    });
  }
  const results = data.characters.results;
  const info = data.characters.info;

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
      </Head>
      <h1>Rick and Morty</h1>
      <SearchBar search={(event) => search(event)} />
      <CharacterList characters={results} />
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
