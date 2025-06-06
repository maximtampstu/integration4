import { Link, Form, useActionData } from "react-router";
import { getThemeVotes, addThemeVote } from "../services/theme";
import { getCurrent } from "../services/current";
import { getUserById } from "../services/users";

export async function clientLoader() {
  const current = await getCurrent();
  const votebleThemes = current.themes;
  const themeVotes = await getThemeVotes();
  const email = (await getUserById(current.userId)).email
  const hasAlreadyVoted = themeVotes.some((vote) => vote.userEmail === email);

  return { votebleThemes, email, hasAlreadyVoted };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = Number(data.get("themeId"))
  const email = data.get("email")
  await addThemeVote(themeId, email)
  return { themeId: themeId };
}

const VoteTheme = ({ loaderData }) => {
  const { votebleThemes, email, hasAlreadyVoted } = loaderData;
  const data = useActionData();

  return (
    <>
      <h1>Vote Theme</h1>
      <Link to="/participate">Back</Link>
      {data ? (
        <p>Thanks for voting. You voted for <b>{(votebleThemes.find(item => item.id === data.themeId).name)}</b></p>
      ) : (hasAlreadyVoted ? (
        <p>You already have voted</p>
      ) : (
        <Form method="POST" >
          <input type="hidden" name="email" value={email} />
          {votebleThemes.map(theme => <label key={theme.id}><input type="radio" name="themeId" value={theme.id} required />{theme.name}</label>)}
          <button type="submit">Vote</button>
        </Form>
      ))}
    </>
  );
};

export default VoteTheme;