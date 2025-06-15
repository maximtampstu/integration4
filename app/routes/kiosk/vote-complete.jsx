import { Link } from "react-router";
import { getThemeById, getThemeVotes, getVotableThemes, getVotePercentages } from "../../services/theme";
import "./vote-complete.css"

export async function clientLoader({ params }) {
    const theme = await getThemeById(params.id);
    const themeVotes = await getThemeVotes();
    const votableThemes = await getVotableThemes()
    const votePercentages = getVotePercentages(themeVotes)
    return { theme, votableThemes, votePercentages };
}

const VoteComplete = ({ loaderData = {} }) => {
    const { theme, votableThemes, votePercentages } = loaderData;
    return (
        <>
            <h1 className="visually-hidden">Vote Complete</h1>
            <div className="vote-complete__head">
                <h2>Vote Locked in!</h2>
                <p>You’ve cast your vote for <span>"{theme.name}"</span> Come back anytime to track its rise.</p>
            </div>
            <div className="vote-complete__buttons">
                <Link className="kiosk-button kiosk-button--sec" to="/kiosk/home">Go Home</Link>
                <p>or</p>
                <Link className="kiosk-button" to="/kiosk/vote-art">Vote for Art</Link>
            </div>
            <ul className="vote-percentages">
                {votePercentages.map(item => (
                    <li>
                        <h3>{votableThemes.find(theme => theme.id === item.themeId).name}</h3>
                        <p>{item.percentage}%</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default VoteComplete;