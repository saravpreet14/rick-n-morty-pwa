import {
  IconButton,
  Paper,
  InputBase,
} from "@material-ui/core";
import { Search, ArrowBackIosRounded } from "@material-ui/icons";
import React from "react";
import customStyles from './search.module.css';

export default function SearchBar(props: {
  search: (event: React.FormEvent<HTMLDivElement>) => void,
  value: string,
  change: (string) => void,
  placeholder: string,
  isEpisode?: boolean,
  isWidget?: boolean,
}) {

  return (
    <div className={customStyles.body} style={props.isEpisode ? {backgroundColor: 'lightblue'} : props.isWidget ? {backgroundColor: 'white'} : null} >
      {/* <IconButton onClick={() => window.history.back() } className={customStyles.iconBack} style={{backgroundColor: 'white', borderRadius: '2px', padding: '2px'}} aria-label="menu">
        <ArrowBackIosRounded />Back
      </IconButton> */}
      <Paper component="form" className={customStyles.main} onSubmit={props.search} style={props.isEpisode ? {width: '100%'} : null} >
        <InputBase
          className={customStyles.searchArea}
          placeholder={props.placeholder}
          onChange={(event) => props.change(event.target.value)}
          value={props.value}
        />
        {/* <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton> */}
        <div className={customStyles.icon} >
          <Search />
        </div>
      </Paper>
    </div>
  );
}
