import { Link } from "react-router";
import "./NotifyBox.css";

const NotifyBox = ({ label, time, active }) => {

    return (
        <li className={active ? "notify-box" : "notify-box notify-box--not-active"}>
            <div className="notify-box__text">
                <p className="notify-box__label">{label}</p>
                <p className="notify-box__time">{time}</p>
            </div>
            <button className="button button--blue notify-box__button">Notify Me</button>
        </li>
    );
};

export default NotifyBox;
