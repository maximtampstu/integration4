import { addArt } from "../services/art";
import { Form, Link, redirect } from "react-router";
import { useNavigation } from "react-router"
import { getCurrentUser } from "../services/users";
import { getCurrentEvent } from "../services/events";

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

  return (
    <>
      <h2>Hi, {currentUser.username}</h2>
      {/* <p>Email: {currentUser.email}</p> */}

      {isSubmitting && <p>Uploading...</p>}
      <Form method="post" encType="multipart/form-data" className="media-form">
        <input type="hidden" name="userId" value={currentUser.id} />
        <input type="hidden" name="eventId" value={currentEvent.id} />
        <div className="media-form__field">
          <label htmlFor="title" className="media-form__label">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="media-form__input"
            placeholder="Enter title"
            required
          />
        </div>

        <div className="media-form__field">
          <label htmlFor="description" className="media-form__label">Description</label>
          <textarea
            id="description"
            name="description"
            className="media-form__input"
            placeholder="Enter description"
          />
        </div>

        

        <div className="media-form__field">
          <label className="media-form__label">
            <input type="checkbox" name="visibility" />
              I own the rights and grant Abby a 1-month exhibition licence.
            </label>
        </div>

        <div className="media-form__field">
          <label htmlFor="file" className="media-form__label">Upload File</label>
          <input type="file" id="file" name="file" className="media-form__input" />
        </div>

        <div className="media-form__actions">
          <button type="submit" className="media-form__button media-form__button--primary">
            Submit
          </button>
          <Link to="/" className="media-form__button media-form__button--secondary">
            Cancel
          </Link>
        </div>
      </Form>
    </>
  );
};

export default Upload;