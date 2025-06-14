import { useState } from "react";
import { Link } from "react-router";
import { getCurrentEvent } from "../../services/events";
import homeImage from "../../../assets/kiosk-home-image.png";
import "./home.css"

export async function clientLoader() {
    const currentEvent = await getCurrentEvent();

  return { currentEvent };
}

const Home = ({ loaderData }) => {
  const { currentEvent } = loaderData
  const [uploadingPhase, setUploadingPhase] = useState(true)

  return (
    <div className="home__content">
      <div className="home__head">
        <h1 onClick={() => setUploadingPhase(!uploadingPhase)}>You @abby</h1>
      </div>
      <img className="home__image" src={homeImage} alt="" />
      {uploadingPhase === true ? 
        <p className="home__info">Hey, you’re in the <span>uploading phase</span>, where your ABBY room begins. Don’t leave it empty: upload your work with the theme <span>{currentEvent.name}</span> and you might see your vision come to life at <span>ABBY’s party</span> in a few weeks!</p> 
        : <p className="home__info">Hey, you’re in the uploading phase, where your ABBY room begins. Don’t leave it empty: upload your work with the theme {currentEvent.name} and you might see your vision come to life at ABBY’s party in a few weeks!</p>}
      <ul>
        <li>{uploadingPhase === true ? <Link className="kiosk-button" to="/kiosk/upload-info">Upload</Link>
          : <Link className="kiosk-button" to="/kiosk/vote">Vote</Link>}</li>
        <li><p>or</p></li>
        <div className="home__buttons">
          <li><Link className="kiosk-button kiosk-button--sec kiosk-button--small" to="/kiosk/about">Discover Us</Link></li>
          <li><Link className="kiosk-button kiosk-button--sec kiosk-button--small" to="/kiosk/previous-event-gallery">See Previously@ABBY</Link></li>
        </div>
      </ul>
    </div>
  );
};

export default Home;
