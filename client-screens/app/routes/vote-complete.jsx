import { Link } from "react-router";

const VoteComplete = () => {

    return (
        <>
            <h1>Vote Complete</h1>
            <ul>
                <li><Link to="/home">Go Home</Link></li>
                <li><Link to="/vote-art">Vote for Art</Link></li>
            </ul>
        </>
    );
};

export default VoteComplete;