import { getCurrentUser, getAllUsers, getUserById } from "../../services/users";
import { getEventById } from "../../services/events";
import { getArtById, getArtTypeById, getUserReceivedVotes, getArtByEventId } from "../../services/art";
import { getFeedbackByArtId, addFeedback } from "../../services/feedback";
import arrow from "../../../assets/arrow.svg";
import dots from "../../../assets/dots.svg";
import { Link, useFetcher } from "react-router";
import "./art-detail.css";
import { useState } from "react";
import { getCurrentEvent } from "../../services/events";


export async function clientLoader({ params }) {
  const art = await getArtById(params.id); //done
  const users = await getAllUsers(); //done
  const event = await getEventById(art.eventId); //done
  const artType = await getArtTypeById(art.artTypeId); //done
  const feedback = await getFeedbackByArtId(art.id); //done
  const currentUserId = (await getCurrentUser()).id //done
  const creator = await getUserById(art.userId); //done
  const currentUser = await getCurrentUser(); 
  const totalVotes = await getUserReceivedVotes(currentUser.id); 
  const currentEvent = await getCurrentEvent(); 

  const allArtInCategory = await getArtByEventId(event.id);


  return { art, users, event, artType, feedback, currentUserId, creator, currentUser, totalVotes, currentEvent, allArtInCategory };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const artId = Number(data.get("artId"))
  const userId = Number(data.get("userId"))
  const feedback = data.get("feedback")
  await addFeedback(artId, userId, feedback)
}

export default function ArtDetail({ loaderData }) {
  const { art, users, event, artType, feedback, currentUserId, creator, currentUser, totalVotes, currentEvent, allArtInCategory } = loaderData;
  const fetcher = useFetcher();

  const [commenting, setCommenting] = useState(false)
  const [comment, setComment] = useState("")
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => setShowDescription(prev => !prev);

  console.log(allArtInCategory)

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    fetcher.submit({ artId: art.id, userId: currentUserId, feedback: comment }, { method: "post" });
    setCommenting(false);
    setComment("")
  }

  return (
    <main className="art-detail">
      <h1 className="visually-hidden"> at detail page</h1>

      <article className="art-detail__section">
        <h2 className="visually-hidden"> art detail section</h2>
        <section className="art-detail__header">
            <h3 className="visually-hidden"> detail header</h3>
            <Link to={`/my-gallery`} 
              className={`art-detail__back ${art.url.endsWith(".mp3") ? "art-detail__back--audio" : ""}`}
            >
              {/* <img src={arrow} alt="Back arrow" className="art-detail__arrowing" /> */}
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 9.09764L14.5 14L14.5 9.38047L3.15875 6.97643L14.5 4.57239L14.5 1.66948e-07L0.5 4.85522L0.5 9.09764Z" fill="black"/>
              </svg>

              Back 
            </Link>
            <div className="art-detail__media">
              {art.url.endsWith(".mp3") ? (
                <audio controls style={{ width: "100%" }} className="art-detail__audio">
                  <source src={art.url} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              ) : art.type === "video" ? (
                <video controls width="100%" className="art-detail__video">
                  <source src={art.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img src={art.url} alt={art.title} className="art-detail__image" />
              )}
            </div>
        </section>


        <section className="art-detail__meta">
          <h3 className="visually-hidden">art detail meta</h3>
          <div className="art-detail__meta-info">
            <div className="art-detail__meta-group">
              <p className="art-detail__title">{art.title}</p>
              <p className="art-detail__creator">
                by<span> @{creator?.username}</span> 
              </p>
            </div>  
            <div className="art-detail__meta-group">
              <p className="art-detail__tag">{artType?.name || "Unknown Tag"}</p>
            </div>
          </div>  


          <div className="art-detail__meta-extra">
            <div className="art-detail__theme-block">
              <img src={arrow} alt="arrow" className="art-detail__icon" />
              {/* <p className="art-detail__theme">published for <span>{event?.name || "Untitled Event"}</span></p> */}
              <p className="art-detail__theme">
                published for{" "}
                <Link to={`/event-gallery/${event?.id}`} className="art-detail__theme-link">
                  <span>{event?.name || "Untitled Event"}</span>
                </Link>
              </p>

            </div>

            <div className="art-detail__votes-block">
              <img src={arrow} alt="arrow"  className="art-detail__icon"/>
              <p className="art-detail__votes"><span>{totalVotes}</span> votes</p>
            </div>
          </div>  

        </section>

        <section className={`art-detail__description-block ${showDescription ? "open" : ""}`}>
          <h3 className="visually-hidden"> art description </h3>
            <div
              className="art-detail__description-toggle"
              onClick={toggleDescription}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleDescription()}
            >
              <p className="art-detail__toggle-text">
                {showDescription ? "Hide description" : "Read description"}
              </p>
              <img
                src={arrow}
                alt=""
                className={`art-detail__arrow ${showDescription ? "rotated" : ""}`}
                aria-hidden="true"
              />
            </div>

            {showDescription && (
              <p className="art-detail__description">{art.description}</p>
            )}
        </section>
      </article>


      <section className="art-detail__feedback">
        <h2 className="visually-hidden">feedback</h2>

        <section className="art-detail__feedback-form-block">
          <h3 className="art-detail__feedback-title">feedback</h3>
          <form onSubmit={handleSubmitFeedback} className="art-detail__feedback-form">
            <label className="visually-hidden">Feedback</label>
            <input type="hidden" name="artId" value={art.id} />
            <input type="hidden" name="userId" value={currentUserId} />

            <div className="art-detail__feedback-icon">
              <svg className="" width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
            <div className="art-detail__feedback-controls">
              <input onClick={() => setCommenting(true)} onChange={(e) => setComment(e.target.value)} type="text" name="feedback" value={comment} required placeholder="leave a comemnt" />
              <button type="submit">
                <img src={arrow} alt="Back arrow" className="art-detail-form__arrow" />
              </button>
            </div>
            
          </form>
        </section>

        <section className="art-detail__feedback-list-section">
          <h3 className="visually-hidden">feedback list</h3>
            <div className="art-detail__feedback-count">{feedback.length}
              <p>{feedback.length > 1 ? 'comments' : 'comment'}</p>
            </div>
          <ul className="art-detail__feedback-list">
            {feedback.length > 0 ? (feedback.map(feedbackItem => (
              <li key={feedbackItem.id} className="art-detail__feedback-item">
                <div className="art-detail__feedback-avatar">
                    {currentUser?.avatar === null ? (
                        <svg className="" width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <img className="art-detail__avatar-img" src={currentUser?.avatar} alt={`avatar of ${currentUser?.username}`} />
                    )}
                </div>
                <div className="art-detail__feedback-content">
                  <img src={arrow} alt="arrow" className="art-detail__feedback-arrow" />
                  <p className="art-detail__feedback-text">{feedbackItem.feedback}</p>
                  <img className="art-detail__feedback-dots" src={dots} alt="arrow" />
                </div>
              </li>
            ))) : (
              <li className="art-detail__feedback-empty">No feedback available</li>
            )}
          </ul>
        </section>
      </section>


      <section className="art-detail__related">
        <h2 className="art-detail__related-title">in this category</h2>
        <section className="art-grid">
          {allArtInCategory.map((art) => {
            const creator = users.find((u) => u.id === art.userId);

            return (
              <div key={art.id} className="art-card">
                <div className="art-card__media">
                  {art.url.endsWith(".mp3") || art.type === "music" ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={art.url} type="audio/mpeg" />
                    </audio>
                  ) : art.type === "video" ? (
                    <video controls width="100%">
                      <source src={art.url} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={art.url} alt={art.title} className="art-card__image" />
                  )}
                </div>

                <div className="art-card__info">
                  <div className="art-card__creator-avatar">
                    {creator?.avatar ? (
                      <img src={creator.avatar} alt={`avatar of ${creator.username}`} className="art-card__avatar-img" />
                    ) : (
                      <svg width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_828_2413)">
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
                    )}
                  </div>

                  <div className="art-card__text">
                    <p className="art-card__title">{art.title}</p>
                    <p className="art-card__username">@{creator?.username || "unknown"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        <section className="art-grid">
          {allArtInCategory.map((art) => {
            const creator = users.find((u) => u.id === art.userId);

            return (
              <div key={art.id} className="art-card">
                <div className="art-card__media">
                  {art.url.endsWith(".mp3") || art.type === "music" ? (
                    <audio controls style={{ width: "100%" }}>
                      <source src={art.url} type="audio/mpeg" />
                    </audio>
                  ) : art.type === "video" ? (
                    <video controls width="100%">
                      <source src={art.url} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={art.url} alt={art.title} className="art-card__image" />
                  )}
                </div>

                <div className="art-card__info">
                  <div className="art-card__creator-avatar">
                    {creator?.avatar ? (
                      <img src={creator.avatar} alt={`avatar of ${creator.username}`} className="art-card__avatar-img" />
                    ) : (
                      <svg width="24" height="45" viewBox="0 0 24 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_828_2413)">
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
                    )}
                  </div>

                  <div className="art-card__text">
                    <p className="art-card__title">{art.title}</p>
                    <p className="art-card__username">@{creator?.username || "unknown"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </section>

    </main>
  );
}
