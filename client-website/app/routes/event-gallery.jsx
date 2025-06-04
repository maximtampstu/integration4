import { getArtByEvent } from "../services/media";
import { getUsers } from "../services/users";
import { Link } from "react-router";
import "./event-gallery.css";


export async function clientLoader({ params }) {
  const eventId = params.id;
  const artworks = await getArtByEvent(eventId);
  const users = await getUsers();
  return { artworks, eventId, users };
}

export default function CurrentEvent({loaderData}) {
  const { artworks, eventId, users } = loaderData;

   const getUsername = (userId) => {
    const user = users.find((u) => u.id === userId);
    console.log(user);
    return user?.username;
  };

  return (
    <main className="event-gallery">
      <div className="event-gallery__container">
        <header className="event-gallery__header">
          <h1 className="event-gallery__title">Gallery for Event #{eventId}</h1>
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
