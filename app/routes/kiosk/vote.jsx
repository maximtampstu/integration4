import { Link } from "react-router";
import BackButton from "../../components/BackButton/BackButton";

const Vote = () => {

    return (
        <>
            <h1>Vote</h1>
            <BackButton/>
            <ul>
                <li><Link to="/kiosk/vote-theme">Vote for a Theme</Link></li>
                <li><Link to="/kiosk/vote-art">Vote for Art</Link></li>
            </ul>
        </>
    );
};

export default Vote;