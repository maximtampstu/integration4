import { Link } from "react-router";

const Home = () => {

    return (
        <>
            <h1>Home</h1>
            <ul>
                <li><Link to="/about">You@Abby</Link></li>
                <li><Link to="/current-event">Read More</Link></li>
                <li><Link to="/participate">Participate</Link></li>
                <li><Link to="/my-gallery">See Gallery</Link></li>
            </ul>
        </>
    );
};

export default Home;