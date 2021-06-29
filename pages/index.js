import Home from "../components/home/home.js";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../components/navbar/navbar";

export default function SignInPage() {
  const [session, loading] = useSession();

  const authFunction = session ? signOut : signIn;

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>
        <Home />
      </Navbar>
    </>
  );
}
