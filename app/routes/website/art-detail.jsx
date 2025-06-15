import { getCurrentUser, getAllUsers, getUserById } from "../../services/users";
import { getEventById } from "../../services/events";
import { getArtById, getArtTypeById } from "../../services/art";
import { getFeedbackByArtId, addFeedback } from "../../services/feedback";
import { Link, useFetcher } from "react-router";
import "./art-detail.css";
import { useState } from "react";


export async function clientLoader({ params }) {
  const art = await getArtById(params.id); //done
  const users = await getAllUsers(); //done
  const event = await getEventById(art.eventId); //done
  const artType = await getArtTypeById(art.artTypeId); //done
  const feedback = await getFeedbackByArtId(art.id); //done
  const currentUserId = (await getCurrentUser()).id //done
  const creator = await getUserById(art.userId); //done

  return { art, users, event, artType, feedback, currentUserId, creator };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const artId = Number(data.get("artId"))
  const userId = Number(data.get("userId"))
  const feedback = data.get("feedback")
  await addFeedback(artId, userId, feedback)
}

export default function ArtDetail({ loaderData }) {
  const { art, users, event, artType, feedback, currentUserId, creator } = loaderData;
  const fetcher = useFetcher();

  const [commenting, setCommenting] = useState(false)
  const [comment, setComment] = useState("")

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    fetcher.submit({ artId: art.id, userId: currentUserId, feedback: comment }, { method: "post" });
    setCommenting(false);
    setComment("")
  }

  return (
    <main className="art-detail">
      <div className="art-detail__container">
        <Link to={`/previous-events/${art.eventId}`} className="art-detail__back">
          Back to Event Gallery
        </Link>

        <h1 className="art-detail__title">{art.title}</h1>
        <p className="art-detail__tag">{artType?.name || "Unknown Tag"}</p>
        <p className="art-detail__theme">{event?.name || "Untitled Event"}</p>

        <p className="art-detail__creator">
          <strong>Creator:</strong> {creator?.username}
        </p>

       
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
          <input type="hidden" name="artId" value={art.id} />
          <input type="hidden" name="userId" value={currentUserId} />
          {/* <input onClick={() => setCommenting(true)} type="text" name="feedback" required /> */}
          <input onClick={() => setCommenting(true)} onChange={(e) => setComment(e.target.value)} type="text" name="feedback" value={comment} required />
          {commenting && (
            <>
              <button type="button" onClick={() => setCommenting(false)}>Cancel</button>
              <button type="submit">Comment</button>
            </>
          )}
        </form>
        <ul>
          {feedback.length > 0 ? (feedback.map(feedbackItem => (
            <li key={feedbackItem.id}>
              <img src="#" alt="Avatar" />
              <p>{users.find((u) => u.id === Number(feedbackItem.userId)).username}</p>
              <p>{feedbackItem.feedback}</p>
            </li>
          ))) : (
            <li>No feedback available</li>
          )}
        </ul>
      </div>
    </main>
  );
}
