import { Link } from "react-router";

const NavBar = () => {

    return (
        <nav style={{ padding: "1rem", background: "#eee" }}>
            <Link to="/">Home</Link>
        </nav>
    );
};

export default NavBar;
