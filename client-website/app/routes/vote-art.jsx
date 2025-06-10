import { Link } from "react-router";
import { getAllArtTypes } from "../services/art";
import "./vote-art.css"; 

export function meta() {
  return [
    { title: "Vote by Art Type - Abby" },
    { name: "description", content: "Browse and vote artworks by category" },
  ];
}

export async function clientLoader() {
  const artTypes = await getAllArtTypes(); //done
  return { artTypes };
}

export default function VoteArt({ loaderData }) {
  const { artTypes } = loaderData;

  return (
    <main className="vote-art-page">
      <div className="vote-art-page__container">
        <header className="vote-art-page__header">
          <h1 className="vote-art-page__title">Vote by Art Type</h1>
          <Link to="/" className="vote-art-page__link">Back to Home</Link>
        </header>

        <div className="vote-art-page__content">
          <ul className="art-types-list">
            {artTypes.length === 0 ? (
              <li className="art-types-list__empty">No art types available yet.</li>
            ) : (
              artTypes.map((type) => (
                <li key={type.id} className="art-types-list__item">
                  <div className="art-types-list__info">
                    <h2 className="art-types-list__name">{type.name}</h2>
                  </div>
                  <div className="art-types-list__actions">
                    <Link
                      to={`/vote-art/${type.id}`}
                      className="art-types-list__button"
                    >
                      See Artworks
                    </Link>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}
