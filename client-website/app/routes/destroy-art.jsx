import { redirect } from "react-router";
import { deleteArt } from "../services/art";

export async function clientAction({ params }) {
    const artId = params.artId;
    await deleteArt(artId);
    return redirect("/my-gallery");
}