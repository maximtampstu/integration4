import { Link } from "react-router";
import BackButton from "../../components/BackButton/BackButton";

const PreviousEventGallery = () => {

    return (
        <>
            <h1>Previous Event Gallery</h1>
            <ul>
                <li><BackButton /></li>
                <li><Link to="/kiosk/vote">Vote</Link></li>
            </ul>
        </>
    );
};

export default PreviousEventGallery;