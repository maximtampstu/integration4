import { Link } from "react-router";

const CurrentEvent = () => {

    return (
        <>
            <h1>Event Gallery</h1>
            <ul>
                <li><Link to="/art-detail">Art Detail</Link></li>
            </ul>
        </>
    );
};

export default CurrentEvent;