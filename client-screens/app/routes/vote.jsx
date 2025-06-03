import { Link } from "react-router";

const Vote = () => {

    return (
        <>
            <h1>Vote</h1>
            <ul>
                <li><Link to="/home">Back</Link></li>
                <li><Link to="/vote-theme">Vote for a Theme</Link></li>
                <li><Link to="/vote-art">Vote for Art</Link></li>
            </ul>
        </>
    );
};

export default Vote;