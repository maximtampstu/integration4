import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/">Home</Link> |{" "}
            <Link to="/about">About</Link> |{" "}
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
