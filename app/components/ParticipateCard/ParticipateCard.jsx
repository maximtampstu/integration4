import { useNavigate, Link } from "react-router";
import "./ParticipateCard.css";
import { useState } from "react";
import { getPhaseStatus } from "../../services/events";

const ParticipateCard = ({ label, eventStart, phaseStart, phaseEnd, active, path, color, text }) => {
    const [popup, setPopupState] = useState(false);

    const openPopup = () => {
        document.body.style.overflow = "hidden";
        setPopupState(true);
    };

    const closePopup = () => {
        document.body.style.overflow = "";
        setPopupState(false);
    };

    return (
        <>
            <li className={`participate-card participate-card--${color} ${active === true ? "" : "participate-card--disabled"}`}>
                <div className="participate-card__card">
                    <button onClick={openPopup}>i</button>
                    <Link to={path}>
                        <h2>{label}</h2>
                        <p>{getPhaseStatus(eventStart, phaseStart, phaseEnd)}</p>
                    </Link>
                </div>
            </li>
            {popup &&
                <div onClick={closePopup} className="participate-card__pop-up">
                    <div onClick={e => e.stopPropagation()} className="pop-up__content">
                        <button onClick={closePopup}>x</button>
                        <p>{text}</p>
                    </div>
                </div>
            }
        </>
    );
};

export default ParticipateCard;