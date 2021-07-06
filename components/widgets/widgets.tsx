import styles from './widgets.module.css';
import Link from 'next/link';
import Image from 'next/image'

export default function Widgets(props) {

    const data = props.data;
    // console.log(data);
    
    return (
        <>
            <div className={styles.main} onClick={props.close}></div>

            <div className={[styles.fixed, styles.cell1].join(' ')} >
                <h2>{data.name}</h2>
                <p><strong>Season</strong>: {Number(data.episode.slice(1, 3))}</p>
                <p><strong>Episode</strong>: {Number(data.episode.slice(-2))}</p>
                <p><strong>Air Date</strong>: {data.air_date}</p>
            </div>

            <div className={[styles.fixed, styles.cell2].join(' ')} >
                Characters in the epsiode:
                <br/>
                <div className={styles.characterArea}>
                    {data.characters.map(character => {
                        return (
                            <div className={styles.character} key = {character.id}>
                                <Link href={
                                    "/character/" +
                                    character.name.replace(" ", "") +
                                    "-" +
                                    character.id
                                  
                                }
                                passHref>
                                    <Image width='80' height='80' src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`} className={styles.icon} />
                                </Link>
                                <p className={styles.characterName} key={character.id}>{character.name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={[styles.fixed, styles.cell3].join(' ')} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
            </div>

            <div className={[styles.fixed, styles.cell4].join(' ')} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
            </div>

            <div className={[styles.fixed, styles.cell5].join(' ')} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
            </div>

            <div className={[styles.fixed, styles.cell6].join(' ')} >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab corrupti reprehenderit ipsam quasi error minima praesentium, odit eveniet quaerat nesciunt quibusdam, fugiat sunt aspernatur asperiores doloremque a nemo distinctio voluptatem.
            </div>
        </>
    );
}