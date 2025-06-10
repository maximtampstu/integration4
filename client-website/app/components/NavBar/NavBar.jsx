import { Link } from "react-router";

const NavBar = () => {

    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
            <Link to="/current-event">Current Event</Link> |{" "}
            <Link to="/previous-events">Past Events</Link> |{" "}
            <Link to="/participate">Participate</Link> |{" "}
            <Link to="/profile">Profile</Link>
        </nav>
    );
};

export default NavBar;
