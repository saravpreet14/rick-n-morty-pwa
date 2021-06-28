import Link from "next/link";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflow: "hidden",
    marginTop: "6vh",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "90vw",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridTile: {
    padding: "1.5rem",
    borderRadius: "5%",
  },
  noData: {
    textSlign: 'center',
    fontSize: '2rem',
  }
}));

export default function TitlebarGridList(props) {
  const classes = styles();

  if (props.characters.length === 0) {

  }

  return (
    <div className={classes.root}>
        {props.characters.length === 0 ? 
            <h2 className={classes.noData}>Nothing to show</h2> : 
            <GridList className={classes.gridList}>
                {props.characters.map((character) => (
                <Link key={character.id} href={"/character/" + character.id} passHref>
                    <GridListTile className={classes.gridTile} key={character.id}>
                    <Image width='300' height='300' src={character.image} alt={character.name} />
                    <GridListTileBar title={character.name} />
                    </GridListTile>
                </Link>
                ))}
            </GridList>
        }
      
    </div>
  );
}
