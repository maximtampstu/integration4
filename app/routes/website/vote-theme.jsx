import { useFetcher, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getThemeVotes, addThemeVote, getVotableThemes, getMostVotedThemeId } from "../../services/theme";
import { getCurrentUser } from "../../services/users";
import "./vote-theme.css";
import BackButton from "../../components/BackButton/BackButton";
import { getCurrentEvent, getCountdown } from "../../services/events";

export async function clientLoader() {
  const currentUser = await getCurrentUser();
  const currentEvent = await getCurrentEvent()
  const votableThemes = await getVotableThemes();
  const themeVotes = await getThemeVotes();

  const hasAlreadyVoted = themeVotes.some((vote) => vote.userEmail === currentUser.email);

  return { votableThemes, currentUser, hasAlreadyVoted, themeVotes, currentEvent };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = Number(data.get("themeId"))
  const email = data.get("email")
  await addThemeVote(themeId, email)

  const leadingTheme = await getMostVotedThemeId(await getThemeVotes())
  console.log("test")
  return { leadingThemeId: leadingTheme };
}

const VoteTheme = ({ loaderData }) => {
  const { votableThemes, currentUser, hasAlreadyVoted, themeVotes, currentEvent } = loaderData;

  const fetcher = useFetcher();
  let navigate = useNavigate()

  const [themeId, setThemeId] = useState("")
  const [confirmationPopup, setConfirmationPopup] = useState(false)
  const [justVoted, setJustVoted] = useState(false)
  const [countdown, setCountdown] = useState(getCountdown(currentEvent.startDate));

  //useEffect omdat het een count down is
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(currentEvent.startDate));
    }, 1000);

    return () => clearInterval(interval); // opschonen bij unmount
  }, [currentEvent.startDate]);

  if (fetcher.data && !justVoted) {
    setJustVoted(true);
    setConfirmationPopup(false);
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const openPopup = () => {
    document.body.style.overflow = "hidden";
    setConfirmationPopup(true);
  };

  const closePopup = () => {
    document.body.style.overflow = "";
    setConfirmationPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setThemeId(Number(e.target.themeId.value))
    openPopup()
  }

  const handleVote = () => {
    fetcher.submit({ email: currentUser.email, themeId }, { method: "post" });
  }

  return (
    <>
      <h1 className="visually-hidden">Vote Theme</h1>
      {fetcher.data ? (
        <section className="vote-complete">
          <div className="vote-complete__text">
            <h2>Theme Locked</h2>
            <div className="vote-complete__info">
              <p className="vote-complete__winning">"{(votableThemes.find(item => item.id === fetcher.data.leadingThemeId).name)}"</p>
              <p>is in the lead.</p>
            </div>
            <p>Thanks for making your mark!</p>
          </div>
          <Link className="button button--green" to="/previous-events">See Previous Themes</Link>
        </section>
      ) : (hasAlreadyVoted ? (
        <section className="already-voted">
          <BackButton />
          <div className="already-voted__text">
            <h2>You already have voted</h2>
            <div className="already-voted__info">
              <p>for</p>
              <p className="already-voted__name">"{votableThemes.find(item => item.id === themeVotes.find(vote => vote.userEmail === currentUser.email).themeId).name}"</p>
            </div>
          </div>
            <Link className="button button--green" to="/vote-art">Vote Art</Link>
        </section>
      ) : (
        <>
          <BackButton />
          <section className="voting">
            <div className="voting__head">
              <h2>Choose next month's theme</h2>
              <p>You have one vote, pick the idea you’re most excited to create with.</p>
            </div>
            <div className="voting__count-down">
              <p className="voting__ends">Voting ends in</p>
              <ul className="voting__days">
                <li><span>{countdown.days}</span> days</li>
                <li><span>{countdown.hours}</span> h</li>
                <li><span>{countdown.minutes}</span> min</li>
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="form">
                  <div className="form__theme-options">
                    {votableThemes.map(theme => (
                      <label key={theme.id} className="form__theme-option">
                        <input type="radio" name="themeId" value={theme.id} required />
                        <span>{theme.name}</span>
                      </label>
                    ))}
                  </div>
              <button className="form__submit" type="submit">Vote</button>
            </form>
          </section>
        </>
      ))}

      { confirmationPopup &&
        <div style={ fetcher.state === "idle" ? null : {pointerEvents: "none"}} onClick={closePopup} className="confirmation-popup">
          <div onClick={e => e.stopPropagation()} className="confirmation-popup__content">
            <div className="confirmation-popup__head">
              <p className="confirmation-popup__choise">Are you sure, you want to lock in “{(votableThemes.find(item => item.id === themeId).name)}”? </p>
              <p className="confirmation-popup__extra">*You won’t be able to recast your vote after it has been submitted </p>
            </div>
            <div className="confirmation-popup__buttons">
              <button onClick={handleVote} className="confirmation-popup__yes">{fetcher.state === "idle" ? "Yes" : "Voting..."}</button>
              <button onClick={closePopup} className="confirmation-popup__no">No</button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default VoteTheme;