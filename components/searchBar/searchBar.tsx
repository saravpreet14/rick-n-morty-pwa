import {
  makeStyles,
  IconButton,
  TextField,
  TextFieldClassKey,
} from "@material-ui/core";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

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

export default function SearchBar(props: {
  search: (event: React.FormEvent<HTMLFormElement>) => void,
  value: string,
}) {
  const classes = styles();

  const [value, setValue] = useState(props.value);
  console.log(props.value,value)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value, "count this");
    setValue(event.target.value);
  }

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
          value={value}
          onChange={handleChange}
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
