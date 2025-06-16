import { redirect } from "react-router";
import { deleteArt } from "../../services/art";

const BASE = import.meta.env.BASE_URL;

export async function clientAction({ params }) {
    const artId = params.artId;
    await deleteArt(artId); //done
    return redirect(`${BASE}my-gallery`);
}