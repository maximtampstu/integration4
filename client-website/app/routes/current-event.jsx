import { Link } from "react-router";

const CurrentEvent = () => {

    return (
        <>
            <h1>Current Event</h1>
            <ul>
                <li><Link to="/participate">Participate</Link></li>
            </ul>
        </>
    );
};

export default CurrentEvent;