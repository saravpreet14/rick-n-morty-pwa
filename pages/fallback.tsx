import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";
import styles from "../styles/Fallback.module.css";

export default function Fallback() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <div>
        <h1 style={{display: 'flex', justifyContent: 'center'}} >You are offline</h1>
        <p>The page will automatically reload once the connection is re-established. Click the button below to try reloading manually.</p>
        <button style={{display: 'flex', justifyContent: 'center'}}
            onClick={() => router.reload()}
          >
            Reload
        </button>
        <main className={styles.main}>
        <div className={styles.profile}>
        <div className={styles.profile_details}>
          <h2 className={styles.character_details}>Fun Facts about Rick and Morty Show!</h2>
          <li>The show was inspired by roiland&apos;s vulgar take on back to the future.</li>
          <li>The show&apos;s theme song owes a lot to doctor who and farscape.</li>
          <li>Dan harmon has a theory on what&apos;s in rick&apos;s flask, but we&apos;ll never know why he drinks.</li>
          <li>&apos;Buffy the vampire slayer&apos; inspired one of the series most beloved episodes &quot;Total Rickall&quot;.</li>
          <li>Rick&apos;s catchphrase &quot;wubba lubba dub dub&quot; was a complete accident.</li>
          <li>The show&apos;s pilot was written in just a few hours.</li>
          <li>One of the show&apos;s most odd character, Bird Person, is not that odd as many fans think, it is actually a parody of The Hawk from Buck Rogers.</li>
        </div>
        </div>
        </main>
      </div>
    </>
  );
}
