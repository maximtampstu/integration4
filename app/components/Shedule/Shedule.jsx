import { useState, useEffect } from "react";
import { Link } from "react-router"
import { getCountdown, getEndDate, getEventDay } from "../../services/events";

import "./Shedule.css"
const Shedule = ({ currentEvent }) => {

    const [popup, setPopup] = useState(false)
    const [sheduleOpen, setSheduleOpen] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false);
    const [countdown, setCountdown] = useState(getCountdown(currentEvent.startDate));

    const currentday = getEventDay(currentEvent.startDate)

    useEffect(() => {
        const interval = setInterval(() => {
            const startDate = new Date(currentEvent.startDate); // zorg dat dit een Date is
            startDate.setDate(startDate.getDate() + 17);
            setCountdown(getCountdown(startDate));
        }, 1000);

        return () => clearInterval(interval); // opschonen bij unmount
    }, [currentEvent.startDate]);

    return (
        <>
            <div className={`shedule ${hasInteracted ? (sheduleOpen ? "shedule--open" : "shedule--close") : ""}`}>
                <div className="shedule__top">
                    <div onClick={() => {
                                setSheduleOpen(!sheduleOpen);
                                setHasInteracted(true);
                            }} className="shedule__head">
                        <button>
                            <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.2559 0L0 33H11.5488L17.5589 6.26706L23.569 33L35 33L22.862 0L12.2559 0Z" fill="black" />
                            </svg>
                        </button>
                        <h2>Uploading Phase</h2>
                        <p className="shedule__countdown">{countdown.days}:{countdown.hours}:{countdown.minutes}.{countdown.seconds}</p>
                    </div>
                    <button onClick={() => setPopup(true)} className="shedule__info">i</button>
                </div>
                <div className="shedule__bottom">
                    <div className="schedule__bar">
                        <div style={{ width: `${(currentday / 28)*100}%`}} className="schedule__bar-fill"></div>
                    </div>
                    <ul className="schedule__list">
                        <li className={`schedule__item schedule__item--${0 < currentday ? "past" : ""}`}>
                            <h2>1</h2>
                            <p className="schedule__time">Week 1</p>
                            <p>Upload Start</p>
                        </li>
                        <li className={`schedule__item schedule__item--${6 < currentday ? "past" : ""}`}>
                            <h2>2</h2>
                            <p className="schedule__time">Week 2</p>
                        </li>
                        <li className={`schedule__item schedule__item--${13 < currentday ? "past" : ""}`}>
                            <h2>3</h2>
                            <p className="schedule__time">Week 3</p>
                            <p>Last Uploads</p>
                        </li>
                        <li className={`schedule__item schedule__item--${20 < currentday ? "past" : ""}`}>
                            <h2>4</h2>
                            <p className="schedule__time">Week 4</p>
                            <p>Voting</p>
                        </li>
                        <li className={`schedule__item schedule__item--${27 < currentday ? "past" : ""}`}>
                            <h2>P</h2>
                            <p className="schedule__time">Party</p>
                        </li>
                    </ul>
                </div>
            </div>
            {popup &&
                <div onClick={() => setPopup(false)} className="shedule-popup">
                    <div onClick={(e) => e.stopPropagation()} className="shedule-popup__content">
                        <div>
                            <h2>{currentday > 17 ? "Voting Phase" : "Uploading Phase"}</h2>
                            <button className="kiosk-character-button" onClick={() => setPopup(false)}>
                                <svg width="29" height="27" viewBox="0 0 29 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.858891 0.057103L9.79229 0.0571015L15.5493 13.2692L10.3983 13.2692L0.858891 0.057103Z" fill="black" />
                                    <path d="M28.1405 0.056986L19.2071 0.0569837L13.4507 13.2691L18.6018 13.2691L28.1405 0.056986Z" fill="black" />
                                    <path d="M0.858891 26.4813L9.79229 26.4814L15.5493 13.2692L10.3983 13.2692L0.858891 26.4813Z" fill="black" />
                                    <path d="M28.1405 26.4815L19.2071 26.4815L13.4507 13.2694L18.6018 13.2693L28.1405 26.4815Z" fill="black" />
                                </svg>
                            </button>
                        </div>
                        <p className="pop-up__info">{currentday > 17 ? "All the artworks have been submitted, now it’s your turn to speak up! Vote for your favorite piece, the one you'd love to see brought to life. Want to help shape the next event? Cast your vote for the next theme too!" : "Now it’s your moment to shine! Upload your artwork and show the world what you’ve got. Whether it’s bold, weird, beautiful or totally out there — we want to see it all. Ready to make your mark? Submit your piece now and be part of the creative wave!"}</p>
                        <Link onClick={() => setPopup(false)} className="kiosk-button kiosk-button--blue" to={`${currentday > 17 ? "/kiosk/vote" : "/kiosk/upload-info"}`}>{currentday > 17 ? "Vote" : "Upload"}</Link>
                    </div>
                </div>
            }
        </>
    );
};

export default Shedule;
