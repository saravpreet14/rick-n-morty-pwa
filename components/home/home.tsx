import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useQuery, gql } from "@apollo/client";
import React, { useState, useRef, useEffect } from "react";
import SearchBar from "../searchBar/searchBar";
import CharacterList from "../charList/characterList";
import { Button, CircularProgress } from "@material-ui/core";
import Error from '../error/error';
import Skeleton from 'react-loading-skeleton';
import { getEventListener } from "events";
import next from "next";

interface characterData {
    id: string;
    name: string;
    image: string;
}

var isSearch:boolean = false;
var static_filter:string = "";
var nextPageToLoaded = 2;
var pageLoaded = false;
var lastSearch = false;

export default function Home(props:{imageSize:{width: number, height: number}, buttonSize:'small'|'medium'|'large', isWidget: boolean, placeholder:string}) {
  const trackScrolling = (event) => {
    var element = event.target;
    // console.log(element.scrollHeight, element.scrollTop, element.clientHeight)
    if (element.scrollHeight - element.scrollTop - 1580 <= element.clientHeight) {
      loadMore();
      // console.log('scrolled')
    }
  }
  // useEffect(() => {
  //   const page = document.querySelector('#scroll');
  //   if(page) {
  //     page.removeEventListener('scroll', trackScrolling);
  //     page.addEventListener('scroll', trackScrolling);
  //   }
  // })

  // useEffect(() => {
  //   if(pageLoaded) {
  //     console.log('effect')
  //     document.querySelector('#scroll').addEventListener('scroll', trackScrolling);
  //   }
  // }, [pageLoaded])

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

  var [my_filter, set_filter] = useState(static_filter);
  var [lastSearch, set_lastSearch] = useState(false);

  var { loading, error, data, fetchMore } = useQuery(Characters_data, {
    variables: { page: 1, filter: {} },
    errorPolicy: "ignore",
  });
  // console.log(data)

  useEffect(() => {
    const page = document.querySelector('#scroll');
    if(data && !loading && !error && !lastSearch && page) {
      // console.log(data)
      page.addEventListener('scroll', trackScrolling, true);
    }
  }, [data])
  
  if (loading) {
    return (
      <div className={styles.skeletonHome} >
        <div className={styles.skeletonSearch} >
          <Skeleton count={1} height={50} />
        </div>
        <div className={styles.skeletonList} style={props.isWidget ? {margin: '0 20px'} : null} >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((t) => (
            <div className={styles.skeletonImage} style={props.isWidget ? {margin: '0.8rem'} : null} key={t} >
              <Skeleton height={props.isWidget ? 175 : 350} width={props.isWidget ? 150 : 300} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (error) return <Error />;

  if(!loading && !error) pageLoaded = true;

  function loadMore() {
    set_lastSearch(false);
    const nextPage = nextPageToLoaded ;//data.characters.info.next;
    if(nextPage === null) return;
    // console.log('removed', document.querySelector('#scroll').childElementCount)
    document.querySelector('#scroll').removeEventListener('scroll', trackScrolling, true);
    // console.log(data.characters.info)
    var variables = { page: nextPage, filter: {} };
    if (isSearch) {
      variables = { page: nextPage, filter: { name: static_filter } };
    }

    fetchMore({
      variables: variables,

      updateQuery: (prevResult:{characters: {results: characterData[]}}, { fetchMoreResult }) => {
        if(fetchMoreResult.characters) {
          nextPageToLoaded = fetchMoreResult.characters.info.next;
          fetchMoreResult.characters.results = [
            ...prevResult.characters.results,
            ...fetchMoreResult.characters.results,
          ];
        }
        return fetchMoreResult;
      },
    })
    // .then(() => {console.log('added'); document.querySelector('#scroll').addEventListener('scroll', trackScrolling)})
    .catch(error => null);
  }

  function handleSearchChange(value: string) {
    // document.querySelector('#scroll').removeEventListener('scroll', trackScrolling);
    set_filter(value);
  }

  function search(query: string): void {
    set_lastSearch((static_filter === '' || query === ''));// && nextPageToLoaded !== null);
    // set_remove(prev => prev+1);
    // console.log('removed search', document.querySelector('#scroll').childElementCount)
    // document.querySelector('#scroll').removeEventListener('scroll', trackScrolling, true);
    // removeListener();
    isSearch = query !== '';
    static_filter = query;
    set_filter(query);
    
    fetchMore({
      variables: { page: 1, filter: { name: query } },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if(fetchMoreResult.characters) nextPageToLoaded = fetchMoreResult.characters.info.next;
        return fetchMoreResult;
      },
    })
    // .then(() => {console.log('added search'); document.querySelector('#scroll').addEventListener('scroll', trackScrolling);})
    .catch(error => null)
  }

  const results: characterData[] = data.characters ? data.characters.results : [];
  const info: {
    prev: number | string;
    next: number | string;
  } = data.characters ? data.characters.info : { prev: null, next: null };

  return (
    <div id="scroll" className={props.isWidget ? styles.homeWidget : styles.homeMain} >
      <Head>
        <title>Rick and Morty</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar isWidget={props.isWidget} search={(event: React.FormEvent<HTMLDivElement>) => {event.preventDefault(); search(event.target[0].value)}} value={my_filter} change={(value:string) => handleSearchChange(value)} placeholder={props.placeholder}/>
        
      <div className={styles.loadMore}>
        {isSearch ? (
          <Button
            variant="contained"
            color="primary"
            size={props.buttonSize}
            onClick={() => search("")}
          >
            All characters
          </Button>
        ) : null}
      </div>
      <CharacterList characters={results} imageSize={props.imageSize} isWidget={props.isWidget}/>
      <div className={styles.loadMore}>
        {info.next ? (
          <div className={styles.skeletonList} style={props.isWidget ? {margin: '0 20px'} : null} >
            {[1, 2, 3, 4].map((t) => (
              <div className={styles.skeletonImage} style={props.isWidget ? {margin: '0.8rem'} : null} key={t} >
                <Skeleton height={props.isWidget ? 175 : 350} width={props.isWidget ? 150 : 300} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

