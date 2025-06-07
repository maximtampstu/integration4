import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
    // const { isAuthenticated, logout } = useAuth();
    const isAuthenticated = false;

    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
            <Link to="/current-event">Current Event</Link> |{" "}
            <Link to="/previous-events">Past Events</Link> |{" "}
            <Link to="/participate">Participate</Link> |{" "}
            <Link to="/profile">Profile</Link>
            {isAuthenticated && (
                <>
                    {" "}
                    | <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default NavBar;
