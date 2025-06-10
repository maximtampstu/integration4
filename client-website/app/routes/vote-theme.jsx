import { Link, Form, useActionData } from "react-router";
import { getThemeVotes, addThemeVote, getVotableThemes } from "../services/theme";
import { getCurrentUser } from "../services/users";

export async function clientLoader() {
  const currentUser = await getCurrentUser(); //done
  const votableThemes = await getVotableThemes(); //done
  const themeVotes = await getThemeVotes(); //done

  const hasAlreadyVoted = themeVotes.some((vote) => vote.userEmail === currentUser.email);

  return { votableThemes, currentUser, hasAlreadyVoted };
}

export async function clientAction({ request }) {
  const data = await request.formData()
  const themeId = Number(data.get("themeId"))
  const email = data.get("email")
  await addThemeVote(themeId, email)
  return { themeId: themeId };
}

const VoteTheme = ({ loaderData }) => {
  const { votableThemes, currentUser, hasAlreadyVoted } = loaderData;
  const data = useActionData();

  return (
    <>
      <h1>Vote Theme</h1>
      <Link to="/participate">Back</Link>
      {data ? (
        <p>Thanks for voting. You voted for <b>{(votableThemes.find(item => item.id === data.themeId).name)}</b></p>
      ) : (hasAlreadyVoted ? (
        <p>You already have voted</p>
      ) : (
        <Form method="POST" >
              <input type="hidden" name="email" value={currentUser.email} />
          {votableThemes.map(theme => <label key={theme.id}><input type="radio" name="themeId" value={theme.id} required />{theme.name}</label>)}
          <button type="submit">Vote</button>
        </Form>
      ))}
    </>
  );
};

export default VoteTheme;