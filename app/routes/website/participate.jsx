import { useState } from "react";
import { getCurrentEvent, getDateString, getEndDate } from "../../services/events"
import ParticipateCard from "../../components/ParticipateCard/ParticipateCard";
import "./participate.css";

export async function clientLoader() {
    const currentEvent = await getCurrentEvent()
    const partyDay = await getDateString(await getEndDate(currentEvent.startDate))
    return { currentEvent, partyDay };
}

const Participate = ({loaderData}) => {
    const { currentEvent, partyDay } = loaderData
    const [popup, setPopup] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false);
    const [message, setMessage] = useState("")

    return (
        <>
            <div className="heading">
                <h1>Participate</h1>
                <p>Make your choice based on the active options</p>
            </div>
            <ul className="participation-list">
                <ParticipateCard label="Upload your work" eventStart={currentEvent.startDate} phaseStart={0} phaseEnd={18} active={true} path="/upload" color="orange" text="Make your piece, music set, motion graphic, digital/physical art, or performance idea. Describe your idea in a few words. You can edit until the upload gate closes."/>
                <ParticipateCard label="Vote Theme" eventStart={currentEvent.startDate} phaseStart={21} phaseEnd={26} active={false} path="/vote-theme" color="blue" text="Look through the theme ideas. Choose the one you want to shape Abby with next event"/>
                <ParticipateCard label="Vote Art" eventStart={currentEvent.startDate} phaseStart={21} phaseEnd={26} active={false} path="/vote-art" color="blue" text="Browse the submissions. Pick the piece, set, graphic, or performance you want to see win. So help shape Abby"/>
            </ul>
            <div className={`question ${hasInteracted ? (popup ? "question--open" : "question--close") : ""}`}>
                <button onClick={() => {
                    setPopup(!popup);
                    setHasInteracted(true);
                }} className="question__button">
                    <svg className={popup && "question__svg--open"} width="56" height="26" viewBox="0 0 56 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.583 8.74268L4.67871 12.8696L24.5459 17.1733L24.5098 25.2739L0 16.5679L0.0332031 9.12939L24.6191 0.726074L24.583 8.74268ZM55.2412 8.74268L35.3369 12.8696L55.2041 17.1733L55.168 25.2739L30.6582 16.5679L30.6914 9.12939L55.2773 0.726074L55.2412 8.74268Z" fill="black" />
                    </svg>
                </button>
                <div className="question__popup">
                    <h2>{currentEvent.name}</h2>
                    <p className="question__date">{partyDay}</p>
                    <p>Will you be there?</p>
                    <div className="question__buttons">
                        <button className={`question__left-button ${message === "" ? "" : "visually-hidden"}`} onClick={() => setMessage("Maybe next time...")}>
                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6064 2.12109L7.4248 5.30176L10.6084 8.48535L8.4873 10.6064L5.30371 7.42285L2.12109 10.6064L0 8.48535L3.18262 5.30176L0.00195312 2.12109L2.12305 0L5.30371 3.18066L8.48535 0L10.6064 2.12109Z" fill="white" />
                            </svg> 
                        </button>
                        <button className={message === "" ? "" : "visually-hidden"} onClick={() => setMessage("See you there!")}>
                            <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6055 2.12109L6.92285 8.80273L6.93262 8.8125L4.81152 10.9336L0.0253906 6.14746L2.14648 4.02637L4.80176 6.68164L11.4844 0L13.6055 2.12109Z" fill="black" />
                            </svg>
                        </button>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Participate;