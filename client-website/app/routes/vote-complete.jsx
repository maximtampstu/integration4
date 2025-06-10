import { getArtById } from "../services/art";
import { getUserById } from "../services/users";
import { Link } from "react-router";

export async function clientLoader({ params }) {
  const art = await getArtById(params.artId); //done
  const creator = await getUserById(art.userId); //done
  return { art, creator };
}

export default function VoteComplete({ loaderData }) {
  const { art, creator } = loaderData;

  return (
    <main className="vote-complete-page">
      <div className="vote-complete-page__container">
        <h1 className="vote-complete-page__title">Thank You for Voting!</h1>
        <p className="vote-complete-page__text">
          You voted for <strong>{art.title}</strong> by {creator?.username}.
        </p>

        <div className="vote-complete-page__media">
          {art.url.endsWith(".mp3") ? (
            <audio controls style={{ width: "100%" }}>
              <source src={art.url} type="audio/mpeg" />
            </audio>
          ) : art.type === "video" ? (
            <video controls width="100%">
              <source src={art.url} type="video/mp4" />
            </video>
          ) : (
            <img src={art.url} alt={art.title} className="vote-complete-page__image" />
          )}
        </div>

        <Link to="/vote-art" className="vote-complete-page__button">
          Vote in Another Category
        </Link>
      </div>
    </main>
  );
}
