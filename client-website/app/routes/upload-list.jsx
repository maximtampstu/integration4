import { useState } from "react";
import { Link } from "react-router";
import { getAllArtTypes } from "../services/art";
import upload_list from "../../assets/upload_list.svg"; 
import "./upload-list.css";

export async function clientLoader() {
  const artTypes = await getAllArtTypes();
  return { artTypes };
}

export default function UploadList({ loaderData }) {
  const { artTypes } = loaderData;
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);

  const toggleDescription = (id) => {
    setVisibleDescriptionId((prevId) => (prevId === id ? null : id));
  };

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
          <p><span>DD</span> days</p>
          <p><span>HH</span> h</p>
          <p><span>MM</span> min</p>
        </div>
        
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
