import { Link } from "react-router";
import { getThemeById } from "../../services/theme";

export async function clientLoader({ params }) {
    const theme = await getThemeById(params.id);
    return { theme };
}

const VoteComplete = ({ loaderData }) => {
    const { theme } = loaderData;
    return (
        <>
            <h1>Vote Complete</h1>
            <ul>
                <li><Link to="/kiosk/home">Go Home</Link></li>
                <li><Link to="/kiosk/vote-art">Vote for Art</Link></li>
            </ul>
            <p>Your vote for <b>{theme.name}</b> has been counted</p>
        </>
    );
};

export default VoteComplete;