import { redirect } from "react-router";
import { deleteArt } from "../../services/art";
import { deleteArtFeedback } from "../../services/feedback";

export async function clientAction({ params }) {
    const artId = params.artId;
    await deleteArtFeedback(artId)
    await deleteArt(artId);
    return redirect(`/my-gallery`);
}