import styles from './widgets.module.css';
import Link from 'next/link';
import Image from 'next/image'
import Home from '../home/home'
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery, gql } from "@apollo/client";
import Error from '../error/error';
import Forum from "../forum/forum";

export default function Widgets(props) {
    const params = props.params;
    const id = params.id.split("-").slice(-1)[0];

    const Episode_data = gql`
        query EpisodeById($ids: [ID!]!) {
            episodesByIds(ids: $ids) {
                id
                name
                episode
                created
                air_date
                characters {
                    id
                    name
                }
            }
        }
    `;
  const responseData = useQuery(Episode_data, {
    variables: { ids: id },
  });
  const { loading, error, data } = responseData;
  if (loading) return <div className={styles.spinner} ><CircularProgress /></div>;
  if (error) return <Error />;

    const EpisodeData = data.episodesByIds[0];
    
    return (
        <div className={styles.main}>
            <div className={styles.grid}>

                <div className={[styles.fixed, styles.cell1].join(' ')} >
                    <h2>{EpisodeData.name}</h2>
                    <p><strong>Season</strong>: {Number(EpisodeData.episode.slice(1, 3))}</p>
                    <p><strong>Episode</strong>: {Number(EpisodeData.episode.slice(-2))}</p>
                    <p><strong>Air Date</strong>: {EpisodeData.air_date}</p>
                </div>

                <div className={[styles.fixed, styles.cell2].join(' ')} >
                    Characters in the epsiode:
                    <br/>
                    <div className={styles.characterArea}>
                        {EpisodeData.characters.map(character => {
                            return (
                                <div className={styles.character} key = {character.id}>
                                    <Link href={
                                        "/character/" +
                                        character.name.replace(" ", "") +
                                        "-" +
                                        character.id
                                    
                                    }
                                    passHref>
                                        <Image width='80' height='80' src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`} alt={character.name} className={styles.icon} />
                                    </Link>
                                    <p className={styles.characterName} key={character.id}>{character.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={[styles.fixed, styles.cell3].join(' ')} >
                    <Home imageSize={{width: 100, height: 100}} buttonSize="small" isWidget />
                </div>

            <div className={[styles.fixed, styles.cell4].join(' ')} >
               <Forum/>
            </div>

                <div className={[styles.fixed, styles.cell5].join(' ')} >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
                </div>

                <div className={[styles.fixed, styles.cell6].join(' ')} >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
                </div>
            </div>
            <br/>
            <div className={styles.backButton}>
                <Link href='/' passHref>
                    <Button variant="contained" color="primary" size="large" onClick={props.back}>
                        <strong>Back</strong>
                    </Button>
                </Link>
            </div>
        </div>
    );
}