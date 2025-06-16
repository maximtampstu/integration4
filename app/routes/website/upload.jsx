import { addArt } from "../../services/art";
import { Form, Link, redirect } from "react-router";
import { useNavigation } from "react-router"
import { getCurrentUser } from "../../services/users";
import { getCurrentEvent } from "../../services/events";
import "./upload.css";
import uplaod_icon from "../../../assets/uplaod_icon.svg";
import upload_motion from "../../../assets/upload_motion.svg";
import { useState } from "react";
import arrow from "../../../assets/arrow.svg";
import BackButton from "../../components/BackButton/BackButton";


export async function clientLoader() {
  const currentUser = await getCurrentUser(); //done
  const currentEvent = await getCurrentEvent(); //done
  return { currentUser, currentEvent };
}

export async function clientAction({ request, params }) {
  const formData = await request.formData();
  const artTypeId = Number(params.id);

  const title = formData.get("title");
  const description = formData.get("description");
  const visibility = formData.get("visibility") === "on";
  const file = formData.get("file");

  if (!file || file.size === 0) {
    throw new Error("File is required");
  }

  const eventId = Number(formData.get("eventId"));
  const userId = Number(formData.get("userId"));

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", "media_upload_preset");
  uploadData.append("cloud_name", "dngqj5iyc");

  const res = await fetch("https://api.cloudinary.com/v1_1/dngqj5iyc/auto/upload", {
    method: "POST",
    body: uploadData,
  });

  const result = await res.json();
  const url = result.secure_url;

  const type = file.type.startsWith("audio/")
    ? "audio"
    : file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("image/")
        ? "image"
        : "unknown";

  const createdArt = await addArt({
    userId,
    title,
    description,
    visibility,
    url,
    type,
    eventId,
    artTypeId
  });

  return redirect(`/upload-success/${createdArt.id}`);
}

const Upload = ({ loaderData }) => {
  const { currentUser, currentEvent } = loaderData;
  let navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };


  return (
    <main className="upload-form">
      <h1 className="visually-hidden">Upload Your Artwork</h1>

      <div className="upload-form__header">
        <Link to="/upload" className="upload-form__back">
          {/* <img src={arrow} alt="arrow" className="upload-form__arrow" /> */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.846e-08 9.09764L14 14L14 9.38047L2.65875 6.97643L14 4.57239L14 1.66948e-07L1.0905e-07 4.85522L5.846e-08 9.09764Z" fill="black"/>
          </svg>

          Back
          {/* <BackButton /> */}
        </Link>
        <img src={upload_motion} alt="Upload header" className="upload-form__image" />

      </div>

      <article>
        <Form method="post" encType="multipart/form-data" className="media-form">
          <input type="hidden" name="userId" value={currentUser.id} />
          <input type="hidden" name="eventId" value={currentEvent.id} />

          <div className="media-form__file">
            {isSubmitting && <p className="media-form__uploading-message">Uploading...</p>}
            <div className="media-form__field-upload">
              <div className="media-form__upload-label">
                <label htmlFor="file" className="media-form__label-upload">Choose a file to upload</label>
                <img src={uplaod_icon} alt="Upload icon" className="media-form__upload-icon" />
              </div>
              <input type="file" id="file" name="file" className="media-form__input" style={{ display: "none" }} onChange={handleFileChange} />

            </div>
            <div className="media-form__filename">{fileName}</div>
          </div>

          <div className="media-form__fields">
            <div className="media-form__field-title">
              <label htmlFor="title" className="media-form__label-title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="media-form__input"
                placeholder="Artwork title"
                required
              />
            </div>

            <div className="media-form__field-description">
              <label htmlFor="description" className="media-form__label-description">Description</label>
              <textarea
                id="description"
                name="description"
                className="media-form__input"
                placeholder="Tell Abby what we’re seeing..."
              />
            </div>
          </div>


          <div className="media-form__actions">
            <button type="submit" className="media-form__button media-form__button--primary">
              Submit
            </button>
            <Link to="/" className="media-form__button media-form__button--secondary">

              Cancel
            </Link>
          </div>
          <div className="media-form__field-checkbox">
            <label className="media-form__label media-form__checkbox">
              <input type="checkbox" name="visibility"  required/>
              I own the rights & grant Abby a 1-month exhibition licence.
            </label>
          </div>
        </Form>
      </article>
    </main>
  );
};

export default Upload;



{/* <h2>Hi, {currentUser.username}</h2> */ }