import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllArtTypes, getArtVotes, getAllArtworks } from "../../services/art";
import { getCurrentEvent, getCountdown, getEndDate } from "../../services/events";
import art_vote from "../../../assets/art_vote.svg";
import line_arrow from "../../../assets/line_arrow.svg";


import "./vote-art.css";

export function meta() {
  return [
    { title: "Vote by Art Type - Abby" },
    { name: "description", content: "Browse and vote artworks by category" },
  ];
}

export async function clientLoader() {
  const artTypes = await getAllArtTypes();
  const art_Votes = await getArtVotes();
  const artworks = await getAllArtworks();
  const currentEvent = await getCurrentEvent();

  
  return { artTypes, art_Votes, artworks, currentEvent };
}

export default function VoteArt({ loaderData }) {
  const { artTypes, art_Votes, artworks, currentEvent } = loaderData;
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);
  const [countdown, setCountdown] = useState(getCountdown(getEndDate(currentEvent.startDate)));



useEffect(() => {
  const interval = setInterval(() => {
    setCountdown(getCountdown(getEndDate(currentEvent.startDate)));

  }, 1000);
  return () => clearInterval(interval);
}, [currentEvent.startDate]);

  

  const toggleDescription = (id) => {
    setVisibleDescriptionId((prevId) => (prevId === id ? null : id));
  };

 



  return (
    <main className="vote-art">
      <h1 className="visually-hidden">vote for art categories</h1>

      <article className="vote-art__info">
        <h2 className="visually-hidden">Choose a category to vote</h2>

        <div className="vote-art__illustration">
          <img src={art_vote} alt="vote art header" className="vote-art__header-image" />
        </div>

        <div className="vote-art__instructions">
          <p>
            You can cast exactly one vote in each category. Change your vote
            anytime before the deadline. The leaderboard updates in real time.
          </p>
        </div>

        <div className="vote-art__timer">
          <p className="vote-art__timer-label">Voting Ends in</p>
          <div className="vote-art__countdown">
            {/* <p><span>DD</span> days</p>
            <p><span>HH</span> h</p>
            <p><span>MM</span> min</p> */}
            <p><span>{countdown.days}</span> days</p>
            <p><span>{countdown.hours}</span> h</p>
            <p><span>{countdown.minutes}</span> min</p>
          </div>
          

          <Link to="/participate" className="vote-art__link">         
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.846e-08 9.09764L14 14L14 9.38047L2.65875 6.97643L14 4.57239L14 1.66948e-07L1.0905e-07 4.85522L5.846e-08 9.09764Z" fill="black"/>
            </svg>
            Back
          </Link>
        </div>
      </article>

      <article className="vote-art__categories">
        <h2 className="visually-hidden">Art Categories</h2>

        <ul className="vote-art__list">
          {artTypes.length === 0 ? (
            <li className="vote-art__empty">No art types available yet.</li>
          ) : (

            artTypes.map((type) => {

              const userId = 1;


              const votedArtIds = art_Votes
                .filter(vote => vote.userId === userId)
                .map(vote => vote.artId);


              const artworksInType = artworks.filter(art => art.artTypeId === type.id);


              const hasVoted = artworksInType.some(art => votedArtIds.includes(art.id));






              return (
                <li key={type.id} className="vote-art__item">
                  <div className="vote-art__item-header">
                    <div className="vote-art__item-message">
            
                      <p className="vote-art__item-subtitle">
                        {hasVoted ? `U voted for ${type.name}` : "*Don’t miss out"}
                      </p>

                      <p className="vote-art__item-title">
                        {hasVoted ? "See you at the party" : "vote now, Be heard"}
                      </p>
                    </div>
                    <div className="vote-art__item-image-wrapper">
                      <img src={line_arrow} alt="line_arrow" className="vote-art__item-image" />
                    </div>
                  </div>

                  <div className="vote-art__item-footer">
                    <Link
                      to={`/vote-art/${type.id}`}
                      className={`vote-art__button ${hasVoted ? "vote-art__button--voted" : ""}`}
                    >
                      {type.name}
                    </Link>

                    <button
                      onClick={() => toggleDescription(type.id)}
                      className="vote-art__info-button"
                      aria-label="More information"
                    >
                      <span className="vote-art__info-circle">i</span>
                    </button>
                  </div>

                  {visibleDescriptionId === type.id && (
                    <div className="vote-art__description-box">
                      <div className="vote-art__description-header">
                        <div className="small_box"></div>
                        <div className="big_box"></div>
                      </div>
                      <p className="vote-art__description">{type.description}</p>
                    </div>
                  )}
                </li>
              );
            })

          )}
        </ul>
      </article>
    </main>
  );
}














