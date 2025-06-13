import { Link } from "react-router";
import "./EventCardHome.css";
import hipHopCultureThumbnail from "/hip-hop-culture-thumbnail.png"
import { getEndDate, getMonthAndDayString } from "../../services/events";

const EventCardHome = ({ item }) => {
    return (
        <li className="event-card-home">
            <div className="event-card-home__info">
                <img src={item.thumbnail || hipHopCultureThumbnail} alt="Event thumbnail" />
                <div className="event-card-home__text">
                    <h3 className="event-card-home__title">
                        {item.name.split(" ").map((word, index) => (
                            <span key={index}>{index > 0 ? " " : ""}{word}</span>
                        ))}
                    </h3>
                    <div className="evnet-card-home__date">
                        <p>{getMonthAndDayString(item.startDate)}</p>
                        <svg width="31" height="14" viewBox="0 0 31 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.9462 0.95734L13.9462 4.91461L0.173464 7.46484L0.173462 5.18305L13.9462 0.95734Z" fill="black" />
                            <path d="M13.9462 13.0427L13.9462 9.08539L0.173464 6.53516L0.173462 8.81695L13.9462 13.0427Z" fill="black" />
                            <path d="M16.814 0.95734L16.814 4.91461L30.5867 7.46484L30.5867 5.18305L16.814 0.95734Z" fill="black" />
                            <path d="M16.814 13.0427L16.814 9.08539L30.5867 6.53516L30.5867 8.81695L16.814 13.0427Z" fill="black" />
                        </svg>
                        <p>{getMonthAndDayString(getEndDate(item.startDate))}</p>
                    </div>
                </div>
            </div>
            <Link className="button button--yellow" to={`/event-gallery/${item.id}`}>See Gallery</Link>
        </li>
    );
};

export default EventCardHome;
