import "./EventCardSliderHome.css";
import EventCardHome from "../EventCardHome/EventCardHome"
import { useRef } from 'react';

const EventCardSliderHome = ({ previousEvents }) => {
    const scrollRef = useRef(null);

    //I used AI to give me a start but then I worked further on that
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth; // scroll by container width
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="card-slider">
            <ul className="card-slider__cards" ref={scrollRef}>
                {previousEvents.map(event => (
                    <EventCardHome key={event.id} event={event} />
                ))}
            </ul>
            <div className="card-slider__buttons">
                <button onClick={() => scroll('left')} className="button button--sec button--sec--5px">
                    <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.9556 9.4271L6.25264 14.0001L30.9556 18.5749V27.2541L0.746002 17.9855V10.0147L30.9556 0.746094V9.4271Z" fill="black" />
                    </svg>
                </button>
                <button onClick={() => scroll('right')} className="button button--sec button--sec--5px">
                    <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.447615 9.4271L25.1506 14.0001L0.447615 18.5749V27.2541L30.6572 17.9855V10.0147L0.447615 0.746094V9.4271Z" fill="black" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default EventCardSliderHome;

