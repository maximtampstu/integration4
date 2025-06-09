import { Link } from "react-router";
import { getAllEvents } from "../services/media";
import { getEndDate, getCountDownToParty, getMonthAndDayString } from "../services/events";
import "./previous-events.css";

export function meta() {
  return [
    { title: "Previous Events - Abby" },
    { name: "description", content: "Browse past event galleries" },
  ];
}

export async function clientLoader() {
  const events = await getAllEvents();
  return { events };
}

export default function PreviousEvents({ loaderData }) {
  const { events } = loaderData;
  console.log(getCountDownToParty("2025-08-23"))

  console.log(events);
  return (
    <main className="events-page">
      <div className="events-page__container">
        <header className="events-page__header">
          <h1 className="events-page__title">Previous Events</h1>
          <Link to="/" className="events-page__link">Back to Home</Link>
        </header>

        <div className="events-page__content">
          <ul className="events-list">
            {events.length === 0 ? (
              <li className="events-list__empty">No events available yet.</li>
            ) : (
              events.map((event) => (
                <li key={event.id} className="events-list__item">
                  <div className="events-list__info">
                    <h2 className="events-list__name">{event.name}</h2>
                    <p className="events-list__description">{event.description}</p>
                    <p className="events-list__date">{getMonthAndDayString(event.startDate)} - {getMonthAndDayString(getEndDate(event.startDate))}</p>
                  </div>
                  <div className="events-list__actions">
                    <Link
                      to={`/previous-events/${event.id}`}
                      className="events-list__button"
                    >
                      See Gallery
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
