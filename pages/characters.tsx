import Navbar from '../components/navbar/navbar';
import Home from '../components/home/home';

export default function characters(props) {
    return (
        <Navbar>
            <Home imageSize={{width: 300, height: 300}} buttonSize="large" isWidget={false} placeholder="Search Character Name" />
        </Navbar>
    )
}