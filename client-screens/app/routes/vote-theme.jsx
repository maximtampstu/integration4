import { Link, redirect } from "react-router";
import { getThemeVotes, addThemeVote } from "../services/theme";
import { getCurrent } from "../services/current";
import VoteVerification from "../components/VoteVerification/VoteVerification";
import { useState } from "react";

export async function clientLoader() {
  const current = await getCurrent();
  const themeVotes = await getThemeVotes();
  return { current, themeVotes };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = data.get("themeId")
  const email = data.get("email")
  await addThemeVote(themeId, email)
  return redirect(`/vote-complete/${themeId}`)
}

const VoteTheme = ({ loaderData }) => {
  const { current, themeVotes } = loaderData;
  const votebleThemes = current.themes

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
        <Link to="/vote">Back</Link>
        <p>Vote Theme</p>
        <form onSubmit={handleSubmitVote}>
          {votebleThemes.map(theme => <label key={theme.id}><input type="radio" name="theme" value={theme.id} required />{theme.name}</label>)}
          <button type="submit">Vote</button>
        </form>
      {vote != "" ? <VoteVerification themeVotes={themeVotes} state={state} changeState={changeState} themeId={vote} ClosePopup={ClosePopup} /> : null}
    </>
  );
};

export default VoteTheme;