// import { Form, Link, redirect, useNavigation } from "react-router";
// import { getArtById, updateArt } from "../../services/art";
// import { uploadMediaToCloudinary } from "../../services/media";


// export async function clientLoader({ params }) {
//   const art = await getArtById(Number(params.id));
//   return { art };
// }

// export async function clientAction({ request, params }) {
//   const formData = await request.formData();

//   const file = formData.get("media");
//   let url = formData.get("existingUrl");
//   let type = formData.get("type");


//   if (file && file.name) {
//     const uploaded = await uploadMediaToCloudinary(file);
//     url = uploaded.secure_url;

//     const extension = url.split(".").pop();
//     if (["mp4", "mov", "webm"].includes(extension)) {
//       type = "video";
//     } else if (["mp3", "wav", "ogg"].includes(extension)) {
//       type = "audio";
//     } else {
//       type = "image";
//     }
//   }

//   await updateArt({
//     id: Number(params.id),
//     title: formData.get("title"),
//     description: formData.get("description"),
//     url,
//     type,
//     artTypeId: Number(formData.get("artTypeId")),
//     eventId: Number(formData.get("eventId")),
//     userId: Number(formData.get("userId")),
//     visibility: formData.get("visibility") === "true",
//   }, params.id);

//   return redirect("/my-gallery");
// }

// export default function EditArt({ loaderData }) {
//   const { art } = loaderData;


//   let navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   if (!art) return <p>Artwork not found.</p>;

//   return (
//     <main className="edit-art-page">
//       <h1>Edit Artwork</h1>

//       {isSubmitting && <p>Uploading...</p>}
//       <Form method="post" encType="multipart/form-data">
//         <label>
//           Title:
//           <input name="title" defaultValue={art.title} required />
//         </label>

//         <label>
//           Description:
//           <textarea name="description" defaultValue={art.description} required />
//         </label>

//         <label>
//           Replace File:
//           <input
//             type="file"
//             name="media"
//             accept="image/*,audio/*,video/*"
//           />
//         </label>


//         <input type="hidden" name="existingUrl" value={art.url} />
//         <input type="hidden" name="type" value={art.type} />
//         <input type="hidden" name="artTypeId" value={art.artTypeId} />
//         <input type="hidden" name="eventId" value={art.eventId} />
//         <input type="hidden" name="userId" value={art.userId} />
//         <input type="hidden" name="visibility" value={art.visibility} />

//         <button type="submit">Update</button>
//         <Link to="/my-gallery">Cancel</Link>
//       </Form>

//     </main>
//   );
// }


import { Form, Link, redirect, useNavigation } from "react-router";
import { getArtById, updateArt } from "../../services/art";
import { uploadMediaToCloudinary } from "../../services/media";
import "./edit-art.css";
import arrow from "../../../assets/arrow.svg";
import edit_artwork from "../../../assets/edit_artwork.svg";

export async function clientLoader({ params }) {
  const art = await getArtById(Number(params.id));
  return { art };
}

export async function clientAction({ request, params }) {
  const formData = await request.formData();
  const file = formData.get("media");
  let url = formData.get("existingUrl");
  let type = formData.get("type");

  if (file && file.name) {
    const uploaded = await uploadMediaToCloudinary(file);
    url = uploaded.secure_url;

    const extension = url.split(".").pop();
    if (["mp4", "mov", "webm"].includes(extension)) {
      type = "video";
    } else if (["mp3", "wav", "ogg"].includes(extension)) {
      type = "audio";
    } else {
      type = "image";
    }
  }

  await updateArt({
    id: Number(params.id),
    title: formData.get("title"),
    description: formData.get("description"),
    url,
    type,
    artTypeId: Number(formData.get("artTypeId")),
    eventId: Number(formData.get("eventId")),
    userId: Number(formData.get("userId")),
    visibility: formData.get("visibility") === "true",
  }, params.id);

  return redirect(`${BASE}my-gallery`);
}

export default function EditArt({ loaderData }) {
  const { art } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!art) return <p>Artwork not found.</p>;

  return (
    <main className="edit-form">
      <h1 className="visually-hidden">Edit Your Artwork</h1>

      <div className="edit-form__header">
        <Link to="/my-gallery" className="edit-form__back">
          <img src={arrow} alt="Back arrow" className="edit-form__arrow" />
          Back
        </Link>
        <img src={edit_artwork} alt="edit_artwork" className="edit_artwork" />
      </div>

      <article>
        <Form method="post" encType="multipart/form-data" className="edit-form__form">
          <input type="hidden" name="existingUrl" value={art.url} />
          <input type="hidden" name="type" value={art.type} />
          <input type="hidden" name="artTypeId" value={art.artTypeId} />
          <input type="hidden" name="eventId" value={art.eventId} />
          <input type="hidden" name="userId" value={art.userId} />
          <input type="hidden" name="visibility" value={art.visibility} />

          {isSubmitting && <p className="edit-form__uploading-message">Uploading...</p>}

          <div className="edit-form__field">
            <label htmlFor="title" className="edit-form__label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={art.title}
              className="edit-form__input"
              required
            />
          </div>

          <div className="edit-form__field">
            <label htmlFor="description" className="edit-form__label">Description</label>
            <textarea
              id="description"
              name="description"
              defaultValue={art.description}
              className="edit-form__input"
              required
            />
          </div>

          <div className="edit-form__field">
            <label htmlFor="media" className="edit-form__label">Replace File</label>
            <input
              type="file"
              id="media"
              name="media"
              accept="image/*,audio/*,video/*"
              className="edit-form__input"
            />
          </div>

          <div className="edit-form__actions">
            <button type="submit" className="edit-form__button edit-form__button--primary">
              Update
            </button>
            <Link to="/my-gallery" className="edit-form__button edit-form__button--secondary">
              Cancel
            </Link>
          </div>
        </Form>
      </article>
    </main>
  );
}


