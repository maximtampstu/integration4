import {getArtById} from "../services/media";
import { getUsers } from "../services/users";
import { getAllEvents } from "../services/events";
import { getAllArtTypes } from "../services/art";
import { getFeedbackByArtId, addFeedback } from "../services/feedback";
import { getCurrent } from "../services/current";
import { Link, useFetcher } from "react-router";
import "./art-detail.css";
import { useState } from "react";

export async function clientLoader({ params }) {
  const art = await getArtById(params.id);
  const users = await getUsers();
  const events = await getAllEvents();
  const artTypes = await getAllArtTypes();

  const feedback = await getFeedbackByArtId(art.id)
  const currentUserId = (await getCurrent()).userId

  return { art, users, events, artTypes, feedback, currentUserId };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const artId = data.get("artId")
  const userId = data.get("userId")
  const feedback = data.get("feedback")
  await addFeedback(artId, userId, feedback)
}

export default function ArtDetail({loaderData}) {
  const { art, users, events, artTypes, feedback, currentUserId } = loaderData;
  const fetcher = useFetcher();

  const creator = users.find((u) => u.id === art.userId);
  const theme = events.find((e) => e.id === art.eventId);
  const tag = artTypes.find((t) => t.id === art.artTypeId);

  const [commenting, setCommenting] = useState(false)
  const [comment, setComment] = useState("")

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    fetcher.submit({ artId: art.id, userId: currentUserId, feedback:comment }, { method: "post" });
    if (fetcher.state === "idle") {
      setCommenting(false);
      setComment("")
    }
  }

  return (
    <main className="art-detail">
      <div className="art-detail__container">
        <Link to={`/previous-events/${art.eventId}`} className="art-detail__back">
          Back to Event Gallery
        </Link>

        <h1 className="art-detail__title">{art.title}</h1>
        <p className="art-detail__tag">{tag?.name || "Unknown Tag"}</p>
        <p className="art-detail__theme">{theme?.name || "Untitled Event"}</p>

        <p className="art-detail__creator">
          <strong>Creator:</strong> {creator?.username}
        </p>

        {/* <div className="art-detail__media">
          {art.type === "video" ? (
            <video controls width="100%">
              <source src={art.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={art.url} alt={art.title} className="art-detail__image" />
          )}
        </div> */}

        <div className="art-detail__media">
        {art.url.endsWith(".mp3") ? (
            <audio controls style={{ width: "100%" }}>
            <source src={art.url} type="audio/mpeg" />
            Your browser does not support the audio tag.
            </audio>
        ) : art.type === "video" ? (
            <video controls width="100%">
            <source src={art.url} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        ) : (
            <img src={art.url} alt={art.title} className="art-detail__image" />
        )}
        </div>


        <p className="art-detail__description">{art.description}</p>
      </div>
      <div className="feedback">
        <form onSubmit={handleSubmitFeedback}>
          <label>Feedback</label>
          <input type="hidden" name="artId" value={art.id}/>
          <input type="hidden" name="userId" value={currentUserId}/>
          <input onClick={() => setCommenting(true)} onChange={(e) => setComment(e.target.value)} type="text" name="feedback" value={comment} required/>
          {commenting && (
            <>
              <button type="button" onClick={() => setCommenting(false)}>Cancel</button>
              <button type="submit">Comment</button>
            </>
          )}
        </form>
        <ul>
          {feedback.map(feedbackItem => (
            <li key={feedbackItem.id}>{feedbackItem.feedback}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
