import Widgets from '../widgets/widgets';
import { useState } from 'react';
import styles from './episodes.module.css';
import { useQuery, gql } from "@apollo/client";
import Spinner from "../spinner/spinner";
import Error from "../error/error";

export default function Episodes(props) {
  const Episodes_data = gql`
    query EpisodeQuery($ids: [ID!]!){
        episodesByIds(ids:$ids) {
            id, name, air_date, episode, created, characters{id, name}
        },
    }
  `;

    const ids:number[] = Array.from({length: 41}, (_, i) => i + 1)
    const { loading, error, data } = useQuery(Episodes_data, {
    variables: {
        ids: ids,
    },
    errorPolicy: "ignore",
    });
    // const [selectedEpisode, setEpisode] = useState(null);

    if (loading) return <Spinner />;
    if (error) return <Error />;
    
    const episodesData = data.episodesByIds;

    return (
        <div className={styles.main}>
            <br/><br/>
            {episodesData.map(episode => {
                return (
                    <div className={[styles.listElement, props.selected === episode.id ? styles.active : ''].join(' ')} onClick={() => props.select(episodesData[Number(episode.id) - 1])} key={episode.id}>
                        {`${episode.name} - ${episode.episode}`}
                    </div>
                )
            })}
            {/* { selectedEpisode !== null ? <Widgets data={episodesData[selectedEpisode]} close={() => setEpisode(null)} /> : null } */}
        </div>
    );
}