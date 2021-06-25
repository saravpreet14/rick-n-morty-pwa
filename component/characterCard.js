import Link from "next/link";
import Image from "next/image";

export default (props) => {
  return (
    <div>
      <Link href={props.url}>
        <a>
          <Image src={props.image} alt="" width="300" height="300" />
          <h3>{props.name}</h3>
        </a>
      </Link>
    </div>
  );
};
