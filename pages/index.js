import Home from "./home.js";
import { signIn, signOut, useSession } from "next-auth/client";

export default function SignInPage() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={() => signOut()}>Sign out</button>
          <Home />
        </>
      )}
    </>
  );
}
