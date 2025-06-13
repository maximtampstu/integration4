import { Link } from "react-router";

const Participate = () => {

    return (
        <>
            <h1>Participate</h1>
            <ul>
                <li><Link to="/vote-theme">Vote Theme</Link></li>
                <li><Link to="/upload">Upload Art</Link></li>
                <li><Link to="/vote-art">Vote Art</Link></li>
            </ul>
        </>
    );
};

export default Participate;