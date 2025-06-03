import { Link } from "react-router";

const About = () => {

    return (
        <>
            <h1>About</h1>
            <ul>
                <li><Link to="/home">Back</Link></li>
                <li><Link to="/previous-event-gallery">Previous Event Gallery</Link></li>
            </ul>
        </>
    );
};

export default About;