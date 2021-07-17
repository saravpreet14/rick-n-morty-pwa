import Navbar from "../components/navbar/navbar";
import { useRouter } from 'next/router';

export default function SignInPage() {
  const Router = useRouter();
  if(typeof window !== 'undefined') {
    Router.push('/characters');
  }
  return (
    <>
      <Navbar />
    </>
  );
}
