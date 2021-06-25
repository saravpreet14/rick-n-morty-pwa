<<<<<<< HEAD
import Link from 'next/link';
import Image from 'next/image';

export default (props) => {
    return (
        <div>
            <Link href={props.url}>
                <a>
                    <img
                        src={props.image}
                    />
                    <h3>{props.name}</h3>
                </a>
            </Link>
        </div>
    );
}
=======
import Link from "next/link";
import Image from "next/image";

export default (props) => {
  console.log(props.image);
  return (
    <div>
      <Link href={props.url}>
        <a>
          <img src={props.image} />
          <h3>{props.name}</h3>
        </a>
      </Link>
    </div>
  );
};
>>>>>>> dd1a1213e5ecf98cbc9046fb2b658772d4369da3
