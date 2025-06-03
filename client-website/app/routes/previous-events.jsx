import { Link } from "react-router";

const PreviousEvents = () => {

    return (
        <>
            <h1>Previous Events</h1>
            <ul>
                <li><Link to="/event-gallery">See Gallery</Link></li>
            </ul>
        </>
    );
};

export default PreviousEvents;