import Head from "next/head";
import { useRouter } from "next/router";

export default function Fallback() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>next-pwa example</title>
      </Head>
      <div>
        <h1>This is offline fallback page</h1>
        <h2>When offline, any route will fallback to this page</h2>
        <button type="button" onClick={() => router.reload()}>
          Click here to reload
        </button>
      </div>
    </>
  );
}
