import { getArtById } from "../../services/art";
import { getUserById } from "../../services/users";
import { Link } from "react-router";
import "./vote-complete.css"

export async function clientLoader({ params }) {
  const art = await getArtById(params.artId);
  const creator = await getUserById(art.userId);
  return { art, creator };
}

export default function VoteComplete({ loaderData }) {
  const { art, creator } = loaderData;

  return (

    <main className="vote-complete-page">
    <section className="vote-complete-page__container">
        <h1 className="visually-hidden">Your vote's in</h1>
        <div className="vote-complete-page_content">
          <h2 className="vote-complete-page__title">Your vote's in</h2>
          <div className="vote-complete-page__result">
            <p className="vote-complete-page__art-title"> <span className="title">{art.title}</span> by <span className="name">{creator?.username}</span></p>
            
            <p className="vote-complete-page__info">
              just dove into the lead—get back any time to switch your pick before the buzzer.
            </p>
          </div>
        </div>
        <Link to="/vote-art" className="vote-complete-page__button">
          Another Category
        </Link>
    </section>
</main>
  );
}