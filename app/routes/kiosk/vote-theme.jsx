import { redirect } from "react-router";
import { getThemeVotes, addThemeVote, getVotableThemes } from "../../services/theme";
import VoteVerification from "../../components/VoteVerification/VoteVerification";
import BackButton from "../../components/BackButton/BackButton";
import { useState } from "react";

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

const VoteTheme = ({ loaderData }) => {
  const { votableThemes, themeVotes } = loaderData;

  const [state, setState] = useState("email")
  const [vote, setVote] = useState("")

  const changeState = (state) => {
    setState(state)
  }
  
  const handleSubmitVote = (e) => {
    e.preventDefault()
    setVote(e.target.theme.value)
  }

  const ClosePopup = () => {
    setState("email")
    setVote("")
  }

  return (
    <>
      <h1>Vote Theme</h1>
        <BackButton/>
        <p>Vote Theme</p>
        <form onSubmit={handleSubmitVote}>
          {votableThemes.map(theme => <label key={theme.id}><input type="radio" name="theme" value={theme.id} required />{theme.name}</label>)}
          <button type="submit">Vote</button>
        </form>
      {vote != "" ? <VoteVerification themeVotes={themeVotes} state={state} changeState={changeState} themeId={vote} ClosePopup={ClosePopup} /> : null}
    </>
  );
};

export default VoteTheme;