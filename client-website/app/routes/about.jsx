import { Link } from "react-router";

const About = () => {

    return (
        <>
            <h1>About</h1>
            <ul>
                <li><Link to="/participate">Participate</Link></li>
                <li><Link to="/event-gallery">Previous Event Gallery</Link></li>
                <li><Link to="/previous-events">See All Events</Link></li>
            </ul>
        </>
    );
};

export default About;