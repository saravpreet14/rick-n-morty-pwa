import Widgets from '../../components/widgets/widgets';
import Navbar from "../../components/navbar/navbar";
import { useRouter } from 'next/router';
import Episodes from '../../components/episodes/episodes';
import styles from '../../styles/Home.module.css';

export default function MyCharacter(props) {
  const router = useRouter()
  let id:string;
  if(typeof router.query.id === 'string') id = router.query.id;
  if(!id) id = '1';
  console.log(id);

  return (
    <Navbar>
      <div className={styles.partition} >
        <Episodes selected={id} placeholder="Search Episode Name"/>
        <Widgets params={{id: id}} />
      </div>
    </Navbar>
  );
}
