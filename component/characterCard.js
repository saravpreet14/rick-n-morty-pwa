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