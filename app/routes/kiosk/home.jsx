import { useState } from "react";
import { Link } from "react-router";
import { getCurrentEvent } from "../../services/events";
import homeImage from "../../../assets/kiosk-home-image.png";
import "./home.css"
import { getThemeVotes, getVotableThemes, getVotePercentages } from "../../services/theme";

export async function clientLoader() {
    const currentEvent = await getCurrentEvent();
    const themeVotes = await getThemeVotes();
    const votableThemes = await getVotableThemes()
    const votePercentages = getVotePercentages(themeVotes)
  return { votableThemes, votePercentages, currentEvent };
}

const Home = ({ loaderData = {} }) => {
  const { votableThemes, votePercentages, currentEvent } = loaderData
  const [uploadingPhase, setUploadingPhase] = useState(true)

  return (
    <div className={uploadingPhase === true ? "home__content" : "home__content home__content--vote"}>
      <div className="home__head">
        <h1 onClick={() => setUploadingPhase(!uploadingPhase)}>You @abby</h1>
      </div>
      {uploadingPhase === true ? (
        <img className="home__image" src={homeImage} alt="" />
      ) : (
        <div className="home__leaderboard">
          <h2>Theme Voting Leaderboard</h2>
          <ul className="vote-percentages">
            {votePercentages.map((item, index) => (
              <li key={index}>
                <h3>{votableThemes.find(theme => theme.id === item.themeId).name}</h3>
                <p>{item.percentage}%</p>
              </li>
            ))}
          </ul>
        </div>
      ) }
      <div className={uploadingPhase === true ? "home__info" : "home__info home__info--vote"}>
        {uploadingPhase === true ? 
          <p>Hey, you’re in the <span>uploading phase</span>, where your ABBY room begins. Don’t leave it empty: upload your work with the theme <span>{currentEvent.name}</span> and you might see your vision come to life at <span>ABBY’s party</span> in a few weeks!</p> 
          : <p>It’s <span>voting time</span>, boost your favourite Japanese Garden <span>artworks</span> and help choose the <span>next ABBY theme!</span></p>}
      </div>
      <ul className="home__buttons">
        <Link className="kiosk-button" to={uploadingPhase === true ? "/kiosk/upload-info" : "/kiosk/vote"}>{uploadingPhase === true ? "Shape ABBY" : "Vote Now"}</Link>
        <li><p>or</p></li>
        <div className="home__extra-buttons">
          <li><Link className="kiosk-button kiosk-button--sec kiosk-button--small" to="/kiosk/about">Discover Us</Link></li>
          <li><Link className="kiosk-button kiosk-button--sec kiosk-button--small" to="/kiosk/previous-event-gallery">See Previously@ABBY</Link></li>
        </div>
      </ul>
    </div>
  );
};

export default Home;
