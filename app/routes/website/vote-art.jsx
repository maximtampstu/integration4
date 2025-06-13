import { useState } from "react";
import { Link } from "react-router";
import { getAllArtTypes, getArtVotes, getAllArtworks } from "../../services/art";
import art_vote from "../../../assets/art_vote.svg";
import line_arrow from "../../../assets/line_arrow.svg";
import arrow from "../../../assets/arrow.svg";
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
  return { artTypes, art_Votes, artworks };
}

export default function VoteArt({ loaderData }) {
  const { artTypes, art_Votes, artworks } = loaderData;
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);

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
            <p><span>DD</span> days</p>
            <p><span>HH</span> h</p>
            <p><span>MM</span> min</p>
          </div>
          <Link to="/" className="vote-art__link">
            <img src={arrow} alt="arrow" className="vote-art__arrow" />
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
                      <p className="vote-art__item-subtitle">*Don’t miss out</p>
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














//<h2 className="art-types-list__name">{type.name}</h2>

//  <Link
//                       to={`/vote-art/${type.id}`}
//                       className="art-types-list__button"
//                     >
//                       See Artworks
//                     </Link>