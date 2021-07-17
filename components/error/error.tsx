import styles from "../navbar/navbar.module.css";
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

export default function Error() {
  const Router = useRouter();
  return (
    <div>
      <br />
      <br />
      <br />
      <h1 className={styles.signInMessage}>Error Fetching Data</h1>
      <div style={{display: 'flex', justifyContent: 'center'}} >
      <Button variant="contained" color="primary" size="large" onClick={() => Router.reload()}>Retry</Button>
      </div>
    </div>
  );
}