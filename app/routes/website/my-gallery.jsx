import { getUsersCurrentEventArt, getUsersPreviousEventsArt } from "../../services/art";
import { Link, Form } from "react-router";
import { useState } from "react";
import { getCurrentEvent } from "../../services/events";
import { getCurrentUser } from "../../services/users";


export async function clientLoader() {
  const currentEvent = await getCurrentEvent(); //done
  const currentUser = await getCurrentUser(); //done

  const currentEventArt = await getUsersCurrentEventArt(currentEvent.id, currentUser.id); //done
  const previousEventsArt = await getUsersPreviousEventsArt(currentEvent.id, currentUser.id); //done

  return {
    currentEventArt,
    previousEventsArt,
  };
}

export default function CurrentEvent({ loaderData }) {
  const { currentEventArt, previousEventsArt } = loaderData;

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [artIdToDelete, setArtIdToDelete] = useState("");

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    setArtIdToDelete(e.target.artId.value);
    setShowConfirmationPopup(true);
  }

  return (
    <main className="current-event-page">
      <h1>Current Event Artworks</h1>
      <section>
        {currentEventArt.length > 0 ? (
          currentEventArt.map((art) => {
            const isAudio = art?.url?.endsWith(".mp3");
            const isVideo = art?.type === "video";
            return (
              <div key={art.id} className="art-card">
                <h3>{art.title}</h3>
                {isAudio ? (
                  <audio controls>
                    <source src={art.url} type="audio/mpeg" />
                  </audio>
                ) : isVideo ? (
                  <video controls width="300">
                    <source src={art.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={art.url} alt={art.title} width="300" />
                )}
                <p>{art.description}</p>

                <form onSubmit={handleSubmitDelete}>
                  <input type="hidden" name="artId" value={art.id} />
                  <button type="submit" className="delete-button">Delete</button>
                </form>
                <Link to={`/edit-art/${art.id}`} className="edit-button">Edit</Link>
              </div>
            );
          })
        ) : (
          <p>No artworks in the current event.</p>
        )}
      </section>

      <h2>Other Artworks by You</h2>
      <section>
        {previousEventsArt.length > 0 ? (
          previousEventsArt.map((art) => {
            const isAudio = art?.url?.endsWith(".mp3");
            const isVideo = art?.type === "video";
            return (
              <div key={art.id} className="art-card">
                <h3>{art.title}</h3>
                {isAudio ? (
                  <audio controls>
                    <source src={art.url} type="audio/mpeg" />
                  </audio>
                ) : isVideo ? (
                  <video controls width="300">
                    <source src={art.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={art.url} alt={art.title} width="300" />
                )}
                <p>{art.description}</p>
              </div>
            );
          })
        ) : (
          <p>You have no artworks in other events.</p>
        )}
      </section>


      <Link to="/">Back to Home</Link>

      {showConfirmationPopup && (
        <div className="confirmation-popup" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.75)", justifyContent: "center", alignItems: "center", display: "flex" }}>
          <div className="confirmation-popup__content" style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", textAlign: "center", placeSelf: "center" }}>
            <p>Are you sure you want to delete this artwork?</p>
            <Form method="post" action={`/destroy-art/${artIdToDelete}`} onSubmit={() => setShowConfirmationPopup(false)}>
              <button type="submit">Yes, Delete</button>
            </Form>
            <button type="button" onClick={() => setShowConfirmationPopup(false)}>No, keep</button>
          </div>
        </div>
      )}
    </main>
  );
}
