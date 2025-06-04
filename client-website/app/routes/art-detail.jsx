import {getArtById} from "../services/media";
import { getUsers } from "../services/users";
import { getAllEvents } from "../services/events";
import { getAllArtTypes } from "../services/art";
import { Link } from "react-router";
import "./art-detail.css";

export async function clientLoader({ params }) {
  const art = await getArtById(params.id);
  const users = await getUsers();
  const events = await getAllEvents();
  const artTypes = await getAllArtTypes();

  return { art, users, events, artTypes };
}

export default function ArtDetail({loaderData}) {
  const { art, users, events, artTypes } = loaderData;

  const creator = users.find((u) => u.id === art.userId);
  const theme = events.find((e) => e.id === art.eventId);
  const tag = artTypes.find((t) => t.id === art.artTypeId);

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

        <div className="art-detail__media">
          {art.type === "video" ? (
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
    </main>
  );
}
