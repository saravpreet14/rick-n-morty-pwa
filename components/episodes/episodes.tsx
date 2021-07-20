import Widgets from '../widgets/widgets';
import React, { ReactEventHandler, useEffect, useState } from 'react';
import styles from './episodes.module.css';
import { useQuery, gql } from "@apollo/client";
import Error from "../error/error";
import { CircularProgress } from '@material-ui/core';
import SearchBar from '../searchBar/searchBar';
import { KeyboardReturnOutlined, RedoOutlined } from '@material-ui/icons';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

var isSearch:boolean = false;
var static_filter:string = "";

export default function Episodes(props) {
    const [myFilter, setFilter] = useState(static_filter);

    const Episodes_data = gql`
        query Episodes($page: Int, $filter: FilterEpisode){
            episodes(page: $page, filter: $filter) {
                info { next},
                results {id, name, episode}
            },
        }
    `;

    const { loading, error, data, fetchMore } = useQuery(Episodes_data, {
        variables: {
            page: 1,
            filter: {}
        },
        errorPolicy: "ignore",
    });

    useEffect(() => {
        function loadMore() {
            if(!data || !data.episodes) return;
            const nextPage = data.episodes.info.next;
            if(!nextPage) return;
            fetchMore({
                variables: {page: nextPage, filter: {name: isSearch ? myFilter : ''}},
                updateQuery: (prevResult:{episodes: {results}}, { fetchMoreResult }) => {
                    fetchMoreResult.episodes.results = [
                      ...prevResult.episodes.results,
                      ...fetchMoreResult.episodes.results,
                    ];
                    return fetchMoreResult;
                },
            }).catch(error => null);
        }
        loadMore();
    }, [data]);

    // if (loading) return <div className={styles.spinner} >{/*<CircularProgress className={styles.progress} />*/}</div>;
    // if (error) return <Error />;  not needed as widgets error is sufficient
    if(error) return <div></div>;

    function search(query: string) {
        static_filter = query;
        isSearch = true;
        setFilter(query);
        fetchMore({
            variables: {page: null, filter: {name: query}},
            updateQuery: (prevResult:{episodes: {results}}, { fetchMoreResult }) => {
                fetchMoreResult.episodes.results = [
                  ...fetchMoreResult.episodes.results,
                ];
                return fetchMoreResult;
            },
        }).catch(error => null);
    }

    let episodesData = null;
    if(!loading) episodesData = data.episodes.results;

    return (
        <div className={styles.main}>
        {loading ? 
        <>
            <div className={styles.searchSkeleton} >
                <Skeleton count={1} height={50} />
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(key => (
                <div className={styles.listElementSkeleton} key={key}>
                    <Skeleton count={1} key={key} height={50} />
                </div>
            ))}
        </> : 
        <>
            <SearchBar isEpisode value={myFilter} change={(value: string) => setFilter(value)} search={(event: React.FormEvent<HTMLDivElement>) => { event.preventDefault(); search(event.target[0].value); }} placeholder="Search Episode Name"/>
            {episodesData.map(episode => {
                return (
                    <Link href={`/episode/${episode.id}`} passHref key={episode.id} >
                        <div className={[styles.listElement, props.selected === episode.id ? styles.active : ''].join(' ')} /*onClick={() => props.select(episodesData[Number(episode.id) - 1])}*/ key={episode.id}>
                            {`${episode.episode} - ${episode.name}`}
                        </div>
                    </Link>
                )
            })}
        </>}
        </div>
    );
}