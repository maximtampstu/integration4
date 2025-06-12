import { useNavigate } from "react-router";
import "./BackButton.css";

const BackButton = ({ color }) => {
    const navigate = useNavigate();
    
    return (
        <button className={`back-button button button--${color}`} type="button" onClick={() => navigate(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.846e-08 9.09764L14 14L14 9.38047L2.65875 6.97643L14 4.57239L14 1.66948e-07L1.0905e-07 4.85522L5.846e-08 9.09764Z" fill="black" />
            </svg>
            <p>Back</p>
        </button>
    );
};

export default BackButton;
