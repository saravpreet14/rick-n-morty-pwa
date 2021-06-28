import Link from "next/link";
import styles from "./character.module.css";

export default function Card(props) {
  return (
    <div className={styles.characterCard}>
      <Link href={props.url}>
        <a>
          <img src={props.image} alt={props.name} />
          <h3>{props.name}</h3>
        </a>
      </Link>
    </div>
  );
}
