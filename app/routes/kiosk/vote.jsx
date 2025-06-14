import { Link } from "react-router";
import BackButton from "../../components/BackButton/BackButton";
import voteTheme from "../../../assets/vote-theme.png";
import voteArt from "../../../assets/vote-art.png";

import "./vote.css"


const Vote = () => {

    return (
        <>  
            <h1 className="visually-hidden">Vote</h1>
            <div className="vote__head">
                <h2>Help Shape ABBY</h2>
                <BackButton/>
            </div>
            <div className="vote__item">
                <Link to="/kiosk/vote-theme">
                    <div>
                        <h3>Vote Theme</h3>
                        <img src={voteTheme} alt="" />
                    </div>
                </Link>
                <p>Want to help shape the next event? Cast your vote for the next theme!</p>
            </div>
            <div className="vote__item vote__item--blue">
                <Link to="/kiosk/vote-art">
                    <div>
                        <h3>Vote Art</h3>
                        <img src={voteArt} alt="" />
                    </div>
                </Link>
                <p>Vote for your favourite piece, the one you'd love to see brought to life. </p>
            </div>
        </>
    );
};

export default Vote;