import { getCurrentEventData, getArtVotes, addArtVote } from "../services/art";
import { getArtById } from "../services/media";
import { getUsers } from "../services/users";
import { Link, Form, redirect } from "react-router";



export async function clientLoader({ params }) {
  const { id } = params;
  const current = await getCurrentEventData();
  const users = await getUsers();
  const artVotes = await getArtVotes();
  const userId = 1; 

  const artEntry = current.art.find((item) => item.artTypeId === Number(id));
  if (!artEntry) throw new Error("No art found for this type");

  const artPromises = artEntry.artIds.map((artId) => getArtById(artId));
  const artworks = await Promise.all(artPromises);

  
  const votedArt = artworks.find((art) =>
    artVotes.some((vote) => vote.artId === art.id && vote.userId === userId)
  );

  return { artworks, artTypeId: id, users, votedArt };
}

export async function clientAction({ request }) {
  const data = await request.formData();
  const artId = Number(data.get("artId"));
  const userId = 1; 
  await addArtVote({ artId, userId });
  return redirect(`/vote-complete/${artId}`);
}

import { useState } from "react";

export default function VoteArtType({ loaderData }) {
  const { artworks, users, artTypeId, votedArt } = loaderData;
  const [selectedArt, setSelectedArt] = useState(null);

  const handleSelect = (e) => {
    setSelectedArt(e.target.value);
  };

  return (
    <main className="vote-art-type">
      <div className="vote-art-type__container">
        <h1 className="vote-art-type__title">Artworks for Art Type #{artTypeId}</h1>
        <Link to="/vote-art" className="vote-art-type__back">← Back to Types</Link>

        {votedArt ? (
          <p>You’ve already voted for: <strong>{votedArt.title}</strong></p>
        ) : (
          <Form method="post">
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



// export default function VoteArtType({ loaderData }) {
//   const { artworks, users, artTypeId } = loaderData;

//   return (
//     <main className="vote-art-type">
//       <div className="vote-art-type__container">
//         <h1 className="vote-art-type__title">Artworks for Art Type #{artTypeId}</h1>
//         <Link to="/vote-art" className="vote-art-type__back">← Back to Types</Link>

//         <div className="vote-art-type__grid">
//           {artworks.map((art) => {
//             const creator = users.find((u) => u.id === art.userId);
//             return (
//               <div key={art.id} className="vote-art-type__card">
//                 <h2 className="vote-art-type__card-title">{art.title}</h2>
//                 <p className="vote-art-type__card-creator">
//                   <strong>Creator:</strong> {creator?.username}
//                 </p>
//                 {art.url.endsWith(".mp3") ? (
//                   <audio controls style={{ width: "100%" }}>
//                     <source src={art.url} type="audio/mpeg" />
//                   </audio>
//                 ) : art.type === "video" ? (
//                   <video controls width="100%">
//                     <source src={art.url} type="video/mp4" />
//                   </video>
//                 ) : (
//                   <img src={art.url} alt={art.title} className="vote-art-type__image" />
//                 )}
//                 <p className="vote-art-type__description">{art.description}</p>
//                 <Link to={`/art-detail/${art.id}`} className="vote-art-type__detail-link">View Details</Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </main>
//   );
// }

