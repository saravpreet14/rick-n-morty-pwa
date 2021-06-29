import { makeStyles, IconButton, TextField } from "@material-ui/core";
import { PinDropSharp } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const styles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
  },
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    "-webkit-box-align": "center",
    alignItems: "center",
    "-webkit-box-pack": "center",
    justifyContent: "center",
  },
}));

export default function SearchBar(props) {
  const classes = styles();
  // const [value, setValue] = useState(props.value);

  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={props.search}
      >
        <TextField
          label="Search"
          id="outlined-size-normal"
          variant="outlined"
          style={{ width: "20rem" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon fontSize="large" />
        </IconButton>
      </form>
    </div>
  );
}
