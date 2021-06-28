import Link from "next/link";
import styles from "./character.module.css";
import Image from "next/image";

export default function Card(props) {
  return (
    <div className={styles.characterCard}>
      <Link href={props.url}>
        <a>
          <Image src={props.image} alt={props.name} width="300" height="300" />
          <h3>{props.name}</h3>
        </a>
      </Link>
    </div>
  );
}
