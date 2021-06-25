import Link from "next/link";
import Image from "next/image";

export default function Card(props) {
  return (
    <div>
      <Link href={props.url}>
        <a>
          <Image src={props.image} alt="" layout="fill" />
          <h3>{props.name}</h3>
        </a>
      </Link>
    </div>
  );
}
