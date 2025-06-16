import { getArtVotes, addArtVote, getCurrentEventSelectedArtByArtType, getArtTypeById } from "../../services/art";
import { getCurrentEvent } from "../../services/events";
import { getAllUsers, getCurrentUser } from "../../services/users";
import { useState } from "react";
import { Link, Form, redirect } from "react-router";
import arrow from "../../../assets/arrow.svg";
import art_vote_image from "../../../assets/art_vote_image.svg";
import "./art-category.css"

const BASE = import.meta.env.BASE_URL;

export async function clientLoader({ params }) {
  const artType = await getArtTypeById(Number(params.id));
  const currentEvent = await getCurrentEvent();
  const currentUser = await getCurrentUser();
  const users = await getAllUsers();
  const artVotes = await getArtVotes();
  const artworks = await getCurrentEventSelectedArtByArtType(currentEvent.id, artType.id); //done


  console.log('artVotes', artVotes)
  // console.log('artworks' , artworks)




  const votedArt = artworks.find((art) =>
    artVotes.some((vote) => vote.artId === art.id && vote.userId === currentUser.id)
  );

  return { artworks, artType, users, votedArt, currentUser };
}

export async function clientAction({ request }) {
  const data = await request.formData();
  const artId = Number(data.get("artId"));
  const userId = Number(data.get("userId"));
  await addArtVote(artId, userId);
  return redirect(`${BASE}vote-complete/${artId}`);
}

export default function VoteArtType({ loaderData }) {
  const { artworks, users, artType, votedArt, currentUser } = loaderData;
  // const [selectedArt, setSelectedArt] = useState(null);
  const [selectedArt, setSelectedArt] = useState(null); // currently selected
  const [confirmedArt, setConfirmedArt] = useState(null); // confirmed artId
  const [showConfirm, setShowConfirm] = useState(false); // popup trigger

  const selectedArtwork = artworks.find((art) => art.id === Number(selectedArt));


  // console.log(votedArt)

  // const handleSelect = (e) => {
  //   setSelectedArt(e.target.value);
  // };

  const handleVoteClick = (artId) => {
    setSelectedArt(artId);
    setShowConfirm(true);
    document.body.style.overflow = "hidden";
  };

  return (


    votedArt ? (


      <section className="vote-art-type__already-voted-section">
        <div className="already-voted__back">
          <Link to="/vote-art" className="back-button">
            <img src={arrow} alt="Back" className="back-button__arrow" />
            Back
          </Link>
        </div>
        <div className="already-voted__content">
          <div className="already-voted__text">
            <h2>You already have voted</h2>
            <div className="already-voted__info">
              <p>for</p>
              <p className="already-voted__name">"{votedArt.title}"</p>
            </div>
          </div>
          <Link className="button button--green" to="/vote-art">Vote Art</Link>
        </div>

      </section>

    )

      : (
        <main className="vote-art-type">


          <h1 className="visually-hidden">Vote for {artType.name}</h1>
          <article className="vote-art-type__intro">
            <h2 className="visually-hidden">Voting for {artType.name}</h2>

            <section className="vote-art-type__instructions">
              <h3 className="vote-art-type__headline"
                style={{
                  backgroundImage: `url(${art_vote_image})`,
                  backgroundPosition: "bottom",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >shape the {artType.name} </h3>
              <p className="vote-art-type__info">You can cast exactly one vote in each category. Change your vote anytime before the deadline.</p>


            </section>
            <section className="vote-art-type__countdown-box">
              <h3 className="visually-hidden">Voting Timer</h3>
              <p className="vote-art-type__timer-label">Voting Ends in</p>
              <div className="vote-art-type__countdown">
                <p><span>DD</span> days</p>
                <p><span>HH</span> h</p>
                <p><span>MM</span> min</p>
              </div>
              <Link to="/vote-art" className="vote-art__link">
                <img src={arrow} alt="arrow" className="vote-art__arrow" />
                Back
              </Link>
            </section>
            {/* <Link to="/vote-art" className="vote-art-type__back">Back to Types</Link> */}
          </article>

          <article className="vote-art-type__artworks">
            <h2 className="visually-hidden">Voting for {artType.name}</h2>
            <div className="vote-art-type__artworks-header">
              <h3 className="vote-art-type__artworks-heading">ArtWorks</h3>
              <p className="vote-art-type__artworks-info">Tap a card to preview the work, then lock in your vote to send it toward victory.</p>
            </div>

            <Form method="post" className="vote-art-type__form">
              <input type="hidden" name="userId" value={currentUser.id} />
              <div className="vote-art-type__grid">
                {artworks.map((art) => {
                  const creator = users.find((u) => u.id === art.userId);
                  return (
                    <div key={art.id} className="vote-art-type__card">





                      <div className="vote-art-type__media">
                        {art.url.endsWith(".mp3") ? (
                          <audio controls style={{ width: "100%" }} className="vote-art-type__audio">
                            <source src={art.url} type="audio/mpeg" />
                          </audio>
                        ) : art.type === "video" ? (
                          <video controls width="100%" className="vote-art-type__video">
                            <source src={art.url} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={art.url} alt={art.title} className="vote-art-type__image" />
                        )}
                      </div>

                      <div className="vote-art-type__details">
                        <div className="vote-art-type__text">
                          <p className="vote-art-type__card-title">{art.title}</p>
                          <p className="vote-art-type__card-creator">
                            <strong>@</strong>{creator?.username}
                          </p>
                        </div>
                        <div className="art-card-gallery__avatar">
                          {creator?.avatar === null ? (
                            <svg width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_828_2413)">
                                <path d="M14.5497 8.80082C14.5497 7.25126 13.2935 5.99508 11.7439 5.99507C10.1944 5.99507 8.93818 7.25124 8.93818 8.80082V9.19675H3.00293V8.80082C3.00293 3.97331 6.91643 0.0598145 11.7439 0.0598145C16.5714 0.0598262 20.4849 3.9733 20.4849 8.80082V9.19675H14.5497V8.80082Z" fill="#231F20" />
                                <path d="M3.00293 8.86553V8.4696H8.93818V8.86553C8.9382 10.4151 10.1944 11.6713 11.7439 11.6713C13.2935 11.6713 14.5497 10.415 14.5497 8.86553V8.4696H20.4849V8.86553C20.4849 13.693 16.5714 17.6065 11.7439 17.6065C6.91644 17.6065 3.00295 13.693 3.00293 8.86553Z" fill="#231F20" />
                                <path d="M18.0395 37.1339H5.7373V44.9037H18.0395V37.1339Z" fill="#231F20" />
                                <path d="M23.3276 44.9037H15.748L10.8633 18.5237H15.2338L23.3276 44.9037Z" fill="#231F20" />
                                <path d="M0.179688 44.9037H7.75937L12.644 18.5237H8.27352L0.179688 44.9037Z" fill="#231F20" />
                              </g>
                              <defs>
                                <clipPath id="clip0_828_2413">
                                  <rect width="23.5252" height="45" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          ) : (
                            <img className="vote-art-type__avatar-image" src={creator?.avatar} alt={`avatar of ${creator?.username}`} />
                          )}
                        </div>
                      </div>


                      <div className="vote-art-type__actions">
                        <Link to={`/art-detail/${art.id}`} className="vote-art-type__detail-link">View Details</Link>
                        <label className={`vote-art-type__radio-label ${confirmedArt == art.id ? "vote-art-type__confirmed" : ""}`}>
                          {/* <input
                            type="radio"
                            name="artId"
                            value={art.id}
                            onChange={handleSelect}
                            required
                            className="vote-art-type__radio-input"
                          /> Vote for this */}
                          <input
                            type="radio"
                            name="artId"
                            value={art.id}
                            checked={selectedArt == art.id}
                            onChange={() => handleVoteClick(art.id)}
                            required
                            className={`vote-art-type__radio-input ${confirmedArt == art.id ? "vote-art-type__confirmed" : ""}`}
                          /> {confirmedArt == art.id ? "Confirmed" : "lock in vote"}

                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <button type="submit" disabled={!selectedArt} className="vote-art-type__submit">
              Submit
            </button> */}
              <button
                type="submit"
                disabled={!confirmedArt}
                className="vote-art-type__submit"
              >
                Submit
              </button>

            </Form>
          </article>

          {showConfirm && (
            <div className="vote-art-type__popup">
              <div className="vote-art-type__popup-inner">
                <div className="vote-art-type__popup-message">
                  <p className="vote-art-type__popup-question">
                    Are you sure you want to vote for <strong>{selectedArtwork?.title}</strong>?
                  </p>
                  <p className="vote-art-type__popup-warning">*You won’t be able to recast your vote after it has been submitted </p>
                </div>

                <div className="vote-art-type__popup-buttons">
                  <button
                    type="button"
                    className="vote-art-type__popup-btn vote-art-type__popup-btn--yes"
                    onClick={() => {
                      setShowConfirm(false);
                      setConfirmedArt(selectedArt);
                      document.body.style.overflow = "";

                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="vote-art-type__popup-btn vote-art-type__popup-btn--no"
                    onClick={() => {
                      setShowConfirm(false);
                      setSelectedArt(null);
                      document.body.style.overflow = "";
                    }}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

      )

  );
}

{/* <h2 className="vote-art-type__title">Voting for {artType.name}</h2> */ }