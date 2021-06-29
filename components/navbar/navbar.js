import styles from "./navbar.module.css";
import {
  CssBaseline,
  useScrollTrigger,
  Zoom,
  Typography,
  AppBar,
  Toolbar,
} from "@material-ui/core";

export default function navbar(props) {
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <h1 className={styles.siteName}>Rick and Morty</h1>
          <h1 className={styles.authButton} onClick={props.auth}>
            {props.isAuth ? "Logout" : "Sign In"}
          </h1>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {props.isAuth ? (
        props.children
      ) : (
        <>
          <br />
          <br />
          <br />
          <h1 className={styles.signInMessage}>Sign In to continue</h1>
        </>
      )}
    </>
  );
}
