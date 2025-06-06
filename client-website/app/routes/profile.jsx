import { addMedia} from "../services/media";
import { Form, Link, redirect } from "react-router";
import { useNavigation } from "react-router"

const user = {
  id: 1,
  username: "Alex_the_King",
  email: "test@test.com",
  subscribed: true,
};



export async function clientAction({ request }) {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const visibility = formData.get("visibility") === "on";
  const file = formData.get("file");

  if (!file || file.size === 0) {
    throw new Error("File is required");
  }

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
  // const type = file.type.startsWith("video") ? "video" : "image";
  const type = file.type.startsWith("audio/")
  ? "music"
  : file.type.startsWith("video/")
  ? "motion graphic"
  : file.type.startsWith("image/")
  ? "digital art"
  : "physical art";


  await addMedia({
    userId: user.id,
    title,
    description,
    visibility,
    url,
    type,
    eventId: 1, // I am assuming it to the first event for now, it will chnage later based on what the theme id is
    artTypeId: 1, // this will be taken from the params or the url but for now i am assuming it to be 1
  });

  return redirect("/");
}

const Profile = () => {
  let navigation = useNavigation();
 const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <h2>Hi, {user.username}</h2>
      {/* <p>Email: {user.email}</p> */}
      
      {isSubmitting && <p>Uploading...</p>}
      <Form method="post" encType="multipart/form-data" className="media-form">
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

export default Profile;

