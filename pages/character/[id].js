import Character from "../../components/character/character";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../../components/navbar/navbar";

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default function MyCharacter(props) {
  const [session, loading] = useSession();
  const authFunction = session ? signOut : signIn;

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>
        <Character {...props} />
      </Navbar>
    </>
  );
}
