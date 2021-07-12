import Character from "../../components/character/character";
import { signIn, signOut, useSession } from "next-auth/client";
import Navbar from "../../components/navbar/navbar";
import { GetServerSideProps } from "next";
import Widgets from '../../components/widgets/widgets';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

export default function MyCharacter({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // console.log(props);
  const [session, loading] = useSession();
  var authFunction;
  if (session) authFunction = signOut;
  else authFunction = signIn;

  return (
    <>
      <Navbar auth={() => authFunction()} isAuth={session ? true : false}>
        <Widgets {...{ params }} />
      </Navbar>
    </>
  );
}
