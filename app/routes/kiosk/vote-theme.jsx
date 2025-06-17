import { redirect } from "react-router";
import { getThemeVotes, addThemeVote, getVotableThemes } from "../../services/theme";
import VoteVerification from "../../components/VoteVerification/VoteVerification";
import BackButton from "../../components/BackButton/BackButton";
import { useState } from "react";
import "./vote-theme.css"

const BASE = import.meta.env.BASE_URL;

export async function clientLoader() {
  const votableThemes = await getVotableThemes();
  const themeVotes = await getThemeVotes();
  return { votableThemes, themeVotes };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = Number(data.get("themeId"))
  const email = data.get("email")
  await addThemeVote(themeId, email)
  return redirect(`/kiosk/vote-complete/${themeId}`)
}

const VoteTheme = ({ loaderData = {} }) => {
  const { votableThemes, themeVotes } = loaderData;

  const [extraInfoId, setExtraInfoId] = useState(null);
  const [voteSelected, setVoteSelected] = useState(null)
  const [error, setError] = useState("/")

  const [state, setState] = useState("email")
  const [vote, setVote] = useState("")

  const changeState = (state) => {
    setState(state)
  }

  const handleSubmitVote = (e) => {
    e.preventDefault()
    if (voteSelected === null) {
      setError("Select a theme to vote")
    } else {
      setVote(e.target.theme.value)
    }
  }

  const ClosePopup = () => {
    setState("email")
    setVote("")
  }

  const handleClickExpand = (themeId) => {
    setExtraInfoId(prev => (prev === themeId ? null : themeId));
  }

  const handleClickTheme = () => {
    setVoteSelected(true)
    setError("/")
  }



  return (
    <>
      <h1 className="visually-hidden">Vote Theme</h1>
      <div className="vote-theme__content">
        <div className="vote-theme__head">
          <BackButton />
          <h2>Vote for the next theme</h2>
        </div>
        <p className="vote-theme__info">Choose the theme that ignites your creativity and shapes Abby’s next immersive experience.</p>
        <form className="vote-theme__form" onSubmit={handleSubmitVote}>
          {votableThemes.map(theme => (
            <div className={theme.id === extraInfoId ? "vote-theme__radio-button" : extraInfoId === null ? "vote-theme__radio-button" : "visually-hidden"}>
              <label onClick={() => handleClickTheme(theme.id)} key={theme.id} ><input type="radio" name="theme" value={theme.id} /><span className="theme-name">{theme.name}</span><span className="square-icon" ></span></label>
              <div className={theme.id === extraInfoId ? "" : "visually-hidden"}>
                <img src={theme?.thumbnail} alt="Theme Thumbnail" />
                <p>{theme.description}</p>
              </div>
              <button className={theme.id === extraInfoId ? "vote-theme__expand-button vote-theme__expand-button--active" : "vote-theme__expand-button"} onClick={() => handleClickExpand(theme.id)} type="button">
                <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.623 24.9616L25.3284 0.452387L17.2286 0.416193L12.9244 20.2831L8.79806 0.378522L0.780826 0.342698L9.18428 24.9284L16.623 24.9616Z" fill="black" />
                </svg>
              </button>
            </div>
          ))}
          <p className="vote-theme__error" style={{ color: error === "/" ? "transparent" : "var(--color-lau-orange)" }}>{error}</p>
          <button className="kiosk-button kiosk-button--blue" type="submit">Vote</button>
        </form>
      </div>
      {vote != "" ? <VoteVerification themeVotes={themeVotes} state={state} changeState={changeState} themeId={vote} ClosePopup={ClosePopup} votableThemes={votableThemes} /> : null}
    </>
  );
};

export default VoteTheme;