import { getArtVotes, addArtVote, getCurrentEventSelectedArtByArtType, getArtTypeById } from "../services/art";
import { getCurrentEvent } from "../services/events";
import { getAllUsers, getCurrentUser } from "../services/users";
import { useState } from "react";
import { Link, Form, redirect } from "react-router";

export async function clientLoader({ params }) {
  const artType = await getArtTypeById(Number(params.id)); //done
  const currentEvent = await getCurrentEvent(); //done
  const currentUser = await getCurrentUser(); //done
  const users = await getAllUsers(); //done
  const artVotes = await getArtVotes(); //done
  const artworks = await getCurrentEventSelectedArtByArtType(currentEvent.id, artType.id); //done

  const votedArt = artworks.find((art) =>
    artVotes.some((vote) => vote.artId === art.id && vote.userId === currentUser.id)
  );

  return { artworks, artType, users, votedArt, currentUser };
}

export async function clientAction({ request }) {
  const data = await request.formData();
  const artId = Number(data.get("artId"));
  const userId = Number(data.get("userId"));
  await addArtVote(artId, userId);
  return redirect(`/vote-complete/${artId}`);
}

export default function VoteArtType({ loaderData }) {
  const { artworks, users, artType, votedArt, currentUser } = loaderData;
  const [selectedArt, setSelectedArt] = useState(null);

  const handleSelect = (e) => {
    setSelectedArt(e.target.value);
  };

  return (
    <main className="vote-art-type">
      <div className="vote-art-type__container">
        <h1 className="vote-art-type__title">Voting for {artType.name}</h1>
        <Link to="/vote-art" className="vote-art-type__back">← Back to Types</Link>

        {votedArt ? (
          <p>You’ve already voted for: <strong>{votedArt.title}</strong></p>
        ) : (
          <Form method="post">
            <input type="hidden" name="userId" value={currentUser.id} />
            <div className="vote-art-type__grid">
              {artworks.map((art) => {
                const creator = users.find((u) => u.id === art.userId);
                return (
                  <div key={art.id} className="vote-art-type__card">
                    <h2 className="vote-art-type__card-title">{art.title}</h2>
                    <p className="vote-art-type__card-creator">
                      <strong>Creator:</strong> {creator?.username}
                    </p>

                    <label>
                      <input
                        type="radio"
                        name="artId"
                        value={art.id}
                        onChange={handleSelect}
                        required
                      /> Vote for this
                    </label>

                    {art.url.endsWith(".mp3") ? (
                      <audio controls style={{ width: "100%" }}>
                        <source src={art.url} type="audio/mpeg" />
                      </audio>
                    ) : art.type === "video" ? (
                      <video controls width="100%">
                        <source src={art.url} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={art.url} alt={art.title} className="vote-art-type__image" />
                    )}

                    <p className="vote-art-type__description">{art.description}</p>
                    <Link to={`/art-detail/${art.id}`} className="vote-art-type__detail-link">View Details</Link>
                  </div>
                );
              })}
            </div>

            <button type="submit" disabled={!selectedArt} className="vote-art-type__submit">
              Submit Vote
            </button>
          </Form>
        )}
      </div>
    </main>
  );
}