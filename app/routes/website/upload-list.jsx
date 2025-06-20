import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getAllArtTypes } from "../../services/art";
import upload_list from "../../../assets/upload_list.svg";
import { useNavigate } from "react-router";
import "./upload-list.css";
import { getCurrentEvent, getEndUploadingDate, getCountdown } from "../../services/events";

export async function clientLoader() {
  const artTypes = await getAllArtTypes();
  const currentEvent = await getCurrentEvent();
  return { artTypes, currentEvent };
}

export default function UploadList({ loaderData }) {
  const { artTypes, currentEvent } = loaderData;
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);
  const [countdown, setCountdown] = useState(getCountdown(getEndUploadingDate(currentEvent.startDate)));
  const navigate = useNavigate();
  const toggleDescription = (id) => {
    setVisibleDescriptionId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(getEndUploadingDate(currentEvent.startDate)));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEvent.startDate]);


  return (
    <main className="upload-art">
      <h1 className="visually-hidden">Upload Art by Category</h1>


      <div className="upload-art__illustration">
        <img src={upload_list} alt="upload art header" className="upload-art__header-image" />
      </div>


      <section className="upload-art__instructions">
        <p>Pick the category that fits your work. You can add more pieces later.</p>
      </section>


      <section className="upload-art__timer">
        <p className="upload-art__timer-label">Uploading Ends in</p>
        <div className="upload-art__countdown">
          
           <p><span>{countdown.days}</span> days</p>
          <p><span>{countdown.hours}</span> h</p>
          <p><span>{countdown.minutes}</span> min</p>
        </div>
        <button to="/" onClick={() => navigate(-1)} className="upload-form__button">         
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.846e-08 9.09764L14 14L14 9.38047L2.65875 6.97643L14 4.57239L14 1.66948e-07L1.0905e-07 4.85522L5.846e-08 9.09764Z" fill="black"/>
          </svg>
          Back
        </button>

      </section>


      <section className="upload-art__categories">
        <ul className="upload-art__list">
          {artTypes.map((type) => (
            <li key={type.id} className="upload-art__item">
              <div className="upload-art__item-footer">
                <Link to={`/upload/${type.id}`} className="upload-art__button">
                  {type.name}
                </Link>
                <button
                  onClick={() => toggleDescription(type.id)}
                  className="upload-art__info-button"
                  aria-label="More information"
                >
                  <span className="upload-art__info-circle">i</span>
                </button>
              </div>

              {visibleDescriptionId === type.id && (
                <div className="upload-art__description-box">
                  <div className="upload-art__description-header">
                    <div className="small_box"></div>
                    <div className="big_box"></div>
                  </div>
                  <p className="upload-art__description">{type.description}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
