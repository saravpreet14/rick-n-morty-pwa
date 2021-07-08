import Home from "../components/home/home";
import { signIn, signOut, useSession } from "next-auth/client";
import { useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Episodes from '../components/episodes/episodes';
import Widgets from '../components/widgets/widgets';
import styles from '../styles/Home.module.css';

let staticEpisodeData = null;

export default function SignInPage() {
  const [session, loading] = useSession();

  var authFunction;
  if (session) authFunction = signOut;
  else authFunction = signIn;

  const [episodeData, setEpisode] = useState(staticEpisodeData);

  // console.log(episodeData);

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>      
        <div 
          // style={{display: 'grid', gridTemplateColumns: '2fr 8fr', marginLeft: '1vw', marginRight: '3vw'}} 
          className={styles.partition}
        >
          <Episodes select={(data) => {staticEpisodeData=data; setEpisode(data);}} selected={episodeData ? episodeData.id : null} />
          {episodeData ? <Widgets data={episodeData} back={() => {staticEpisodeData=null; setEpisode(null);}} /> : <Home imageSize={{width: 300, height: 300}} buttonSize="large"/>}
        </div>
      </Navbar>
    </>
  );
}
