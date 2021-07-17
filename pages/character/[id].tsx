import Character from "../../components/character/character";
import Navbar from "../../components/navbar/navbar";
import { useRouter } from 'next/router';

export default function MyCharacter(props) {
  const router = useRouter()
  let id:string;
  if(typeof router.query.id === 'string') id = router.query.id;
  if(!id) id = 'rick-1';
  console.log(id);
  return (
    <Navbar>
      <Character params={{id: id}} />
    </Navbar>
  );
}
