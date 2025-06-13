import { getArtById } from "../../services/art";
import { Link } from "react-router-dom";
import "./upload-success.css";
import fish from "../../../assets/fish.svg";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { useState } from "react";

export async function clientLoader({ params }) {
  const art = await getArtById(Number(params.id)); //done
  return { art };
}

export default function UploadSuccess({ loaderData }) {
  const { art } = loaderData;
  const { width, height } = useWindowSize();

  const [runConfetti, setRunConfetti] = useState(true);

  return (
    <main className="upload-success-page">

      {runConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          run={runConfetti}
        />
      )}
      <h1 className="visually-hidden">Upload Success</h1>
      <article className="upload-success__content">
        <h2 className="upload-success__heading"
          style={{
            backgroundImage: `url(${fish})`,
            backgroundPosition: "bottom",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >Thank you for leaving your mark!</h2>
        <p className="upload-success__message">Your artwork <strong>{art.title}</strong> is safely in the mix—check back anytime to see how it’s doing.</p>

        <div className="upload-success__frame">
          {art.type === "video" ? (
            <video controls className="upload-success__media">
              <source src={art.url} />
            </video>
          ) : art.type === "audio" ? (
            <audio controls className="upload-success__media">
              <source src={art.url} />
            </audio>
          ) : (
            <img src={art.url} alt={art.title} className="upload-success__media" />
          )}
        </div>

      </article>
      <div className="upload-success__actions">
        <Link to="/upload" className="upload-success__link upload-success__link-more">Upload More</Link>
        <Link to="/my-gallery" className="upload-success__link upload-success__link-seeArt">See Your Art</Link>
      </div>
    </main>
  );
}
