import { getArtByEventId } from "../services/art";
import { getAllUsers } from "../services/users";
import { getEventById } from "../services/events";
import { Link } from "react-router";
import "./event-gallery.css";

export async function clientLoader({ params }) {
  const artworks = await getArtByEventId(params.id); //done
  const event = await getEventById(params.id); //done
  const users = await getAllUsers(); //done
  return { artworks, event, users };
}

export default function CurrentEvent({loaderData}) {
  const { artworks, event, users } = loaderData;

  const getUsername = (userId) => {
    const user = users.find((u) => u.id === userId);
    console.log(user);
    return user?.username;
  };

  return (
    <main className="event-gallery">
      <div className="event-gallery__container">
        <header className="event-gallery__header">
          <h1 className="event-gallery__title">Gallery for Event: {event.name}</h1>
          <Link to="/previous-events" className="event-gallery__back">
            Back to Events
          </Link>
        </header>

        <div className="event-gallery__content">
          {artworks.length === 0 ? (
            <p className="event-gallery__empty">No artworks submitted for this event yet.</p>
          ) : (
            <ul className="event-gallery__list">
              {artworks.map((art) => (
                <li key={art.id} className="event-gallery__item">
                  <div className="event-gallery__info">
                    <h2>{art.title}</h2>
                    <p className="event-gallery__user">Uploaded by: {getUsername(art.userId)}</p>
                    <Link
                      to={`/art-detail/${art.id}`}
                      className="event-gallery__link"
                    >
                      View Details
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
