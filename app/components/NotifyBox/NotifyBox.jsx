import { useState } from "react";
import "./NotifyBox.css";

const NotifyBox = ({ label, time, active }) => {
    const [notifyOpen, setNotifyOpen] = useState(false)
    const [subscribed, setSubscribed] = useState(false)

    return (
        <li className={active ? "notify-box" : "notify-box notify-box--not-active"}>
            <div className="notify-box__text">
                <p className="notify-box__label">{label}</p>
                <p className="notify-box__time">{time}</p>
            </div>
            { active && (
                notifyOpen ? (
                    subscribed ? (
                        <div className="notify-box__subscribed">
                            <p>Subscribed! <br /> New updates soon.</p>
                        </div>
                    ) : (
                        <form onSubmit={() => setSubscribed(true)}>
                            <label >
                                Email
                                <input type="email" placeholder="Your email address" required />
                            </label>
                            <button>
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24.5469 8.596L-0.000982285 0.000120997L-0.000982639 8.10009L19.885 12.3154L-0.000983007 16.5307L-0.000983358 24.548L24.5469 16.0347L24.5469 8.596Z" fill="black" />
                                </svg>
                            </button>
                        </form>
                    )
                ) : (
                    <button onClick={() => setNotifyOpen(true)} className="button button--blue notify-box__button">Notify Me</button>
                ) 
            )
            }
        </li>
    );
};

export default NotifyBox;
