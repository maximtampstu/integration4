import { Link, useFetcher } from "react-router";
import { getThemeVotes, addThemeVote } from "../services/theme";
import { getCurrent } from "../services/current";
import { getUserById } from "../services/users";
import { useState, useEffect } from "react";

export async function clientLoader() {
  const current = await getCurrent();
  const votebleThemes = current.themes;
  const themeVotes = await getThemeVotes();
  const email = (await getUserById(current.userId)).email
  return { votebleThemes, themeVotes, email };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = data.get("themeId")
  const email = data.get("email")
  await addThemeVote(themeId, email)
}

const VoteTheme = ({ loaderData }) => {
  const { votebleThemes, themeVotes, email } = loaderData;
  const fetcher = useFetcher();

  const [voted, setVoted] = useState(false)
  const [themeId, setThemeId] = useState("")
  const [hasAlreadyVoted, setHasAlreadyVoted] = useState(false)

  //for this i used chatGPT because i could not find a other way how i could do it after to long trying
  useEffect(() => {
    const already = themeVotes.some((vote) => vote.userEmail === email);
    setHasAlreadyVoted(already);
  }, [themeVotes, email]);

  const handleSubmitVote =  (e) =>{
    e.preventDefault();
    setThemeId(parseInt(e.target.theme.value))
    fetcher.submit({ email, themeId: e.target.theme.value }, { method: "post" });
    if (fetcher.state === "idle") {
      setVoted(true);
    }
  }

  if (hasAlreadyVoted && !voted) {
    return (
      <>
        <h1>Vote Theme</h1>
        <Link to="/participate">Back</Link>
        <p>You already voted.</p>
      </>
    );
  }

  return (
    <>
      <h1>Vote Theme</h1>
      <Link to="/participate">Back</Link>
      {!voted ? (
        <form onSubmit={handleSubmitVote}>
          <input type="hidden" value={email} />
          {votebleThemes.map(theme => <label key={theme.id}><input type="radio" name="theme" value={theme.id} required />{theme.name}</label>)}
          <button type="submit">Vote</button>
          <p>{fetcher.state}</p>
        </form>
      ) : (
          <p>Thanks for voting. You voted for <b>{((votebleThemes.find(item => item.id === themeId).name))}</b></p>
      )}
    </>
  );
};

export default VoteTheme;