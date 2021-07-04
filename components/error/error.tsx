import styles from "../navbar/navbar.module.css";
import Router from 'next/router';
import { Button } from '@material-ui/core';

export default function error() {
  return (
    <>
      <br />
      <br />
      <br />
      <h1 className={styles.signInMessage}>Error Fetching Data</h1>
      <div style={{display: 'flex', justifyContent: 'center'}} >
      <Button variant="contained" color="primary" size="large" onClick={() => Router.reload()}>Retry</Button>
      </div>
    </>
  );
}