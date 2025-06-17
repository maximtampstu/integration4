import { getUsersCurrentEventArt, getUsersPreviousEventsArt, getUserReceivedVotes, getUserUploadedArtCount, getAllArtTypes } from "../../services/art";
import {getEndDate, getPastEvents} from "../../services/events";
import { Link, Form } from "react-router";
import { useState, useEffect } from "react";
import { getCurrentEvent } from "../../services/events";
import { getCurrentUser } from "../../services/users";
import gallery_page_image from "../../../assets/gallery_page_image.svg";
import bin from "../../../assets/bin.svg";
import edit from "../../../assets/edit.svg";
import "./my-gallery.css"


export async function clientLoader() {
  const currentEvent = await getCurrentEvent(); 
  const currentUser = await getCurrentUser(); 
  const totalVotes = await getUserReceivedVotes(currentUser.id); 
  const artCount = await getUserUploadedArtCount(currentUser.id); 
  const allArtTypes = await getAllArtTypes(); 
  const pastEvents = await getPastEvents(); 
  

  const currentEventArt = await getUsersCurrentEventArt(currentEvent.id, currentUser.id); 
  const previousEventsArt = await getUsersPreviousEventsArt(currentEvent.id, currentUser.id); 
  // const totalVotes = await userVotes(currentUser.id); 

  return {
    currentEventArt,
    previousEventsArt,
    currentUser,
    totalVotes,
    artCount, 
    currentEvent,
    allArtTypes,
    pastEvents
  };
}

export default function CurrentEvent({ loaderData }) {
  const { currentEventArt, previousEventsArt, currentUser, totalVotes, artCount, currentEvent, allArtTypes, pastEvents } = loaderData;

  console.log("currentEventArt:", currentEventArt);


  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [artIdToDelete, setArtIdToDelete] = useState("");

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    setArtIdToDelete(e.target.artId.value);
    setShowConfirmationPopup(true);
  }

  useEffect(() => {
  document.body.style.overflow = showConfirmationPopup ? "hidden" : "";
}, [showConfirmationPopup]);


  return (
    <main className="current-event">
      <h1 className="visually-hidden">Current Event Artworks</h1>
      <article className="current-event__intro">
         <h2 className="current-event__headline"
            style={{
              backgroundImage: `url(${gallery_page_image})`,
              backgroundPosition: "bottom",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >my gallery</h2>
          <p className="current-event__subtext">Your submissions, status chips and quick actions - all in one place.</p>
                  
      </article>

      <article className="current-event__profile">
        <h2 className="visually-hidden">User Info</h2>
        <section className="current-event__user">
          <h3></h3>
          <div className="current-event__avatar">
            {currentUser?.avatar === null ? (
                <svg className="current-event__avatar-placeholder" width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <img className="current-event__avatar-img" src={currentUser?.avatar} alt={`avatar of ${currentUser?.username}`} />
            )}
          </div>
          <section className="current-event__user-info">
            <h4 className="visually-hidden">User Profile</h4>
            <div className="current-event__username-box">
              <p className="current-event__username">@{currentUser.username}</p>
              <Link to='/' className="current-event__edit-link">edit profile</Link>
            </div>

            <div className="current-event__stats">
              <div className="current-event__stat">active uploads <p>{artCount}</p></div>
              <div className="current-event__stat">total votes <p>{totalVotes}</p></div>
            </div>
          </section>
        </section>

        

      </article>


     

      <section className="current-event__uploads">
        <h3 className="current-event__uploads-title">uploaded items</h3>
        <div className="current-event__uploads-wrapper">
            <section className="current-event__upload-section">
              <h5 className="current-event__section-title">current Event</h5>
              {currentEventArt.length > 0 ? (
                // currentEventArt.map((art) => {
                  [...currentEventArt].reverse().map((art) => {
                  const isAudio = art?.url?.endsWith(".mp3");
                  const isVideo = art?.type === "video";
                  return (
                    <div key={art.id} className="art-card">
                      <div className="art-card__info">
                        <p className="art-card__event-name">{currentEvent.name}</p>
                        <p className="art-card__type">
                          {allArtTypes.find(type => type.id === art.artTypeId)?.name}
                        </p>
                      </div>
                      

                    <div>
                      <div className="art-card__media">
                        {isAudio ? (
                          <audio controls>
                            <source src={art.url} type="audio/mpeg" />
                          </audio>
                        ) : isVideo ? (
                          <video controls width="100%">
                            <source src={art.url} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={art.url} alt={art.title} width="300" />
                        )}
                      </div>
                      {/* <div className="art-card__details">
                        <p className="art-card__title">{art.title}</p>
                        <p className="art-card__description">{art.description}</p>
                        <div>
                          <Link to={`/art-detail/${art.id}`} className="">detail</Link> 
                          <div>
                            <form onSubmit={handleSubmitDelete}>
                              <input type="hidden" name="artId" value={art.id} />
                              <button type="submit" className="delete-button">
                                <img src={bin} alt="" />
                              </button>
                            </form>
                            <Link to={`/edit-art/${art.id}`} className="art-card__edit">
                              <img src={edit} alt="" />
                            </Link>
                          </div>
                        </div>
                      </div> */}
                       <div className="art-card__details">
                          <div className="art-card__details-info">
                            <p className="art-card__title">{art.title}</p>
                            <p className="art-card__description">{art.description}</p>
                          </div>
                          
                          <div className="art-card__actions">
                            <div className="art-card__actions-detailButton">
                            <Link to={`/art-detail/${art.id}`} className="art-card__link">Detail</Link> 
                            </div>
                            
                            <div className="art-card__action-buttons">
                              <form onSubmit={handleSubmitDelete} className="art-card__delete-form">
                                <input type="hidden" name="artId" value={art.id} />
                                <button type="submit" className="art-card__delete-button">
                                  <img src={bin} alt="Delete" />
                                </button>
                              </form>
                              <Link to={`/edit-art/${art.id}`} className="art-card__edit-button">
                                <img src={edit} alt="Edit" />
                              </Link>
                            </div>
                          </div>
                        </div>

                    </div>


                    </div>
                  );
                })
              ) : (
                <div className="current-event__empty">
                        <p>This space is waiting for your vision! Upload your piece before {getEndDate(currentEvent.startDate)} to take part in the {currentEvent.name} cycle.</p>
                  <Link to="/upload-list" className="current-event__upload-link">upload</Link>
                </div>
              )}
             
            </section>

            {/* <section>
              <h5>previous events</h5>
              {previousEventsArt.length > 0 ? (
                previousEventsArt.map((art) => {
                  const isAudio = art?.url?.endsWith(".mp3");
                  const isVideo = art?.type === "video";
                  const event = pastEvents.find(e => e.id === art.eventId);
                  const artType = allArtTypes.find(type => type.id === art.artTypeId);

                  return (
                    <div key={art.id} className="art-card">
                      <div>
                        <p>{event?.name}</p> 
                        <p>{artType?.name}</p> 
                      </div>

                      

                      <div>
                        <div>
                          {isAudio ? (
                            <audio controls>
                              <source src={art.url} type="audio/mpeg" />
                            </audio>
                          ) : isVideo ? (
                            <video controls width="300">
                              <source src={art.url} type="video/mp4" />
                            </video>
                          ) : (
                            <img src={art.url} alt={art.title} width="300" />
                          )}

                        </div>
                        <div>
                          <h3>{art.title}</h3>
                          <p>{art.description}</p>  
                          <Link to={`/art-detail/${art.id}`} className="">detail</Link>
                        </div>
                      </div>


                    </div>
                  );
                })
              ) : (
                <p>You have no artworks in previous events</p>
              )}
            </section> */}

            <section className="current-event__upload-section">
              <h5 className="current-event__section-title">previous events</h5>
              {previousEventsArt.length > 0 ? (
                previousEventsArt.map((art) => {
                  const isAudio = art?.url?.endsWith(".mp3");
                  const isVideo = art?.type === "video";
                  const event = pastEvents.find(e => e.id === art.eventId);
                  const artType = allArtTypes.find(type => type.id === art.artTypeId);

                  return (
                    <div key={art.id} className="art-card">
                      <div className="art-card__info">
                        <p className="art-card__event-name">{event?.name}</p>
                        <p className="art-card__type">{artType?.name}</p>
                      </div>
                        <div>
                          <div className="art-card__media">
                            {isAudio ? (
                              <audio controls className="art-card__audio">
                                <source src={art.url} type="audio/mpeg" />
                              </audio>
                            ) : isVideo ? (
                              <video controls width="100%" className="art-card__video">
                                <source src={art.url} type="video/mp4" />
                              </video>
                            ) : (
                              <img src={art.url} alt={art.title} width="300" className="art-card__image" />
                            )}
                          </div>
                          <div className="art-card__details">
                            <h3 className="art-card__title">{art.title}</h3>
                            <p className="art-card__description">{art.description}</p>
                            <Link to={`/art-detail/${art.id}`} className="art-card__detail-link">detail</Link>
                          </div>
                        </div>
                    </div>
                  );
                })
              ) : (
                <p className="current-event__empty-msg">You have no artworks in previous events</p>
              )}
            </section>
        </div>

      </section>

      


      {/* <Link to="/">Back to Home</Link> */}

   
      
      {showConfirmationPopup && (
  <div className="popup">
    <div className="popup__inner">
      <div className="popup__message">
        <p className="popup__question">Are you sure you want to delete this artwork?</p>
      </div>

      <div className="popup__buttons">
        <Form method="post" action={`/destroy-art/${artIdToDelete}`} onSubmit={() => setShowConfirmationPopup(false)} >
          <button type="submit" className="popup__btn popup__btn--yes">Yes, Delete</button>
        </Form>
        <button
          type="button"
          className="popup__btn popup__btn--no"
          onClick={() => setShowConfirmationPopup(false)}
        >
          No, keep
        </button>
      </div>
    </div>
  </div>
)}

    </main>
  );
}
