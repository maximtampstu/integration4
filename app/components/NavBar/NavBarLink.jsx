import { Link } from "react-router";

const NavBarLink = ({ link, label, active, onClick }) => {
    return (
        <Link className={active ? "navbar-bottom__link navbar-bottom__link--active" : "navbar-bottom__link"} to={link} onClick={onClick}>
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.273412 17.0319L0.18467 11.8612L16.125 8.25439L16.1762 11.2359L0.273412 17.0319Z" fill="black" />
                <path d="M0.00110081 1.243L0.0898381 6.41375L16.1445 9.47107L16.0934 6.48957L0.00110081 1.243Z" fill="black" />
            </svg>
            <span>{label}</span>
        </Link>
    );
};

export default NavBarLink;
