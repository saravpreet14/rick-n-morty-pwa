import Home from "../components/home/home";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../components/navbar/navbar";
import Episodes from '../components/episodes/episodes';

export default function SignInPage() {
  const [session, loading] = useSession();

  var authFunction;
  if (session) authFunction = signOut;
  else authFunction = signIn;
  // console.log(session,authFunction);

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>
      <div style={{display: 'grid', gridTemplateColumns: '2fr 8fr', marginLeft: '1vw', marginRight: '3vw'}} >
          <Episodes />
          <Home />
        </div>
      </Navbar>
    </>
  );
}
