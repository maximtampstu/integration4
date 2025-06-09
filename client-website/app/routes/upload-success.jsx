import { getArtById } from "../services/media"; 
import { Link } from "react-router-dom";

export async function clientLoader({ params }) {
  const art = await getArtById(Number(params.id));
  return { art };
}


export default function UploadSuccess({loaderData}) {
  const { art } = loaderData;

  return (
    <div className="upload-success">
      <h2>Thank you for leaving your mark!</h2>
      <p>Your artwork <strong>{art.title}</strong> has been uploaded.</p>

      {art.type === "video" ? (
        <video controls width="300">
          <source src={art.url} />
        </video>
      ) : art.type === "audio" ? (
        <audio controls>
          <source src={art.url} />
        </audio>
      ) : (
        <img src={art.url} alt={art.title} width="300" />
      )}

      <div className="actions">
        <Link to="/upload">Upload More</Link>
        <Link to="/my-gallery">See Your Art</Link>
      </div>
    </div>
  );
}
