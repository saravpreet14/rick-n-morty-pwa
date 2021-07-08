import Link from "next/link";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import customStyles from './characterList.module.css';

export default function TitlebarGridList(props: {
  characters: {
    id: string;
    name: string;
    image: string;
  }[];
  imageSize: {
    width: number;
    height: number;
  }
}) {
  const styles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      overflow: "hidden",
      marginTop: props.imageSize.height === 300 ? "6vh" : "2vh",
      backgroundColor: theme.palette.background.paper,
      fontSize: props.imageSize.height === 300 ? '1rem' : '0.6rem',
    },
    gridList: {
      // width: "90vw",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    gridTile: {
      margin: props.imageSize.height === 300 ? "1.5rem" : "0.5rem",
      height: `${props.imageSize.height}px`,
      borderRadius: "4%",
      overflow: "hidden",
      borderRight: '3px solid #fff',
      borderBottom: '3px solid #fff',
    },
    noData: {
      textSlign: "center",
      fontSize: "2rem",
    },
  }));
  const classes = styles();
  
  const styleProps={style: { width: "auto", height: "auto" }};

  return (
    <div className={classes.root}>
      {props.characters.length === 0 ? (
        <h2 className={classes.noData}>Nothing to show</h2>
      ) : (
        <GridList className={classes.gridList}>
          {props.characters.map((character) => (
            <Link
              key={character.id}
              href={
                "/character/" +
                character.name.replace(" ", "") +
                "-" +
                character.id
              }
              {...styleProps}
              passHref
            >
              <GridListTile className={[customStyles.gridTile, classes.gridTile].join(' ')} key={character.id}>
                <Image
                  width={props.imageSize.width}
                  height={props.imageSize.height}
                  src={character.image}
                  alt={character.name}
                />
                <GridListTileBar style={{height: props.imageSize.height === 300 ? '48px' : 'auto'}} title={<div style={{fontSize: props.imageSize.height === 300 ? '1rem' : '0.6rem'}}>{character.name}</div>} />
              </GridListTile>
            </Link>
          ))}
        </GridList>
      )}
    </div>
  );
}
