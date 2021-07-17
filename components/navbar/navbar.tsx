import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Image from 'next/image';
import React, { useState } from 'react';
import { isAuth, logout } from '../../lib/auth';
import Link from 'next/link';

export default function Navbar(props) {
  const Router = useRouter();
  const [auth, setAuth] = useState(false); 
  const [path, setPath] = useState('');
  if(typeof window !== 'undefined' && path !== Router.pathname) {
    setPath(Router.pathname);
    isAuth().then(isValid => {
      if(isValid) setAuth(true);
      else if(Router.pathname !== '/auth') Router.push('/auth');
    });
  }

  return (
    <div className={styles.main} >
      <div className={styles.head} >
        <div className={styles.icon} onClick={() => {
          if(Router.pathname === '/') Router.reload();
          else Router.push('/');
        }} >
          <Image src='/rickMorty.svg' width='70' height='70' alt="logo"/>
        </div>
        {auth ? (<span className={styles.navigation} >
          <Link href='/characters' passHref >
            <span className={[styles.navlink, path.indexOf('character') !== -1 ? styles.active : null].join(' ')} >Characters</span>
          </Link>
          <Link href='/episode/1' passHref >
            <span className={[styles.navlink, path.indexOf('episode') !== -1 ? styles.active : null].join(' ')} >Episodes</span>
          </Link>
        </span>): null}
        {auth ? (
          <span className={styles.icon} style={{float: 'right'}} onClick={() => logout().then(() => Router.push('/auth'))} >
            <Image src='/logout.svg' width='70' height='70' layout='responsive' alt="logout" />
          </span>
        ) : null}
      </div>
      <div className={styles.body} >{auth || path === '/auth' ? props.children : null }</div>
    </div>
  );
}
