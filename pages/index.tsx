import Home from "../components/home/home";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../components/navbar/navbar";

export default function SignInPage() {
  const [session, loading] = useSession();

  var authFunction;
  if (session) authFunction = signOut;
  else authFunction = signIn;
  // console.log(session,authFunction);

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>
        <Home />
      </Navbar>
    </>
  );
}
