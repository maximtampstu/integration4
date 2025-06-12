import { useState } from "react";
import { Link } from "react-router";
import { getAllArtTypes } from "../services/art";
import art_vote from "../../assets/art_vote.svg";
import line_arrow from "../../assets/line_arrow.svg";
import arrow from "../../assets/arrow.svg";
import "./vote-art.css";

export function meta() {
  return [
    { title: "Vote by Art Type - Abby" },
    { name: "description", content: "Browse and vote artworks by category" },
  ];
}

export async function clientLoader() {
  const artTypes = await getAllArtTypes();
  return { artTypes };
}

export default function VoteArt({ loaderData }) {
  const { artTypes } = loaderData;
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
            <p><span>MM</span> m</p>
          </div>
          <Link to="/" className="vote-art__link">Back to Home</Link>
        </div>
      </article>

      <article className="vote-art__categories">
        <h2 className="visually-hidden">Art Categories</h2>

        <ul className="vote-art__list">
          {artTypes.length === 0 ? (
            <li className="vote-art__empty">No art types available yet.</li>
          ) : (
            artTypes.map((type) => (
              <li key={type.id} className="vote-art__item">
                <div className="vote-art__item-header">
                  <div className="vote-art__item-message">
                    <p className="vote-art__item-subtitle">*Don’t miss out</p>
                    <p className="vote-art__item-title">vote now, Be heard</p>
                  </div>
                  <div className="vote-art__item-image-wrapper">
                    <img src="" alt="" className="vote-art__item-image" />
                  </div>
                </div>

                <div className="vote-art__item-footer">
                  <Link
                    to={`/vote-art/${type.id}`}
                    className="vote-art__button"
                  >
                    {type.name}
                  </Link>

                  <button
                    onClick={() => toggleDescription(type.id)}
                    className="vote-art__info-button"
                    aria-label="More information"
                  >
                    i
                  </button>
                </div>

                {visibleDescriptionId === type.id && (
                  <p className="vote-art__description">{type.description}</p>
                )}
              </li>
            ))
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