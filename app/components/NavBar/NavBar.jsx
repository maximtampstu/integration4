import { Link } from "react-router";
import logo from "../../../assets/you-at-abby-logo.png"
import NavBarLink from "./NavBarLink";

import "./NavBar.css";

const NavBar = ({ navOpen, setNavOpen, currentPage }) => {

    const handleClose = () => setNavOpen(false);

    return (
        <nav className={navOpen ? "navbar navbar--open" : "navbar"}>
            <div className="navbar-top">
                <Link className="navbar-top__logo" to="/" onClick={handleClose}><img src={logo} alt="Logo" /></Link>
                <div className="navbar-top__right">
                    <Link className="navbar-top__link" to="/participate" onClick={handleClose}>Participate</Link>
                    <button className="navbar-top__switch-button" onClick={() => setNavOpen(!navOpen)}>
                        {navOpen ? (
                            <svg width="32" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="1.41421" y1="2.27207" x2="24.0416" y2="24.8995" stroke="black" strokeWidth="4" />
                                <line x1="1.58579" y1="24.8995" x2="24.2132" y2="2.27209" stroke="black" strokeWidth="4" />
                            </svg>
                        ) : (
                            <svg width="32" height="27" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="2" x2="32" y2="2" stroke="black" strokeWidth="4" />
                                <line y1="10" x2="32" y2="10" stroke="black" strokeWidth="4" />
                                <line y1="18" x2="32" y2="18" stroke="black" strokeWidth="4" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {navOpen && (
                <div className="navbar-bottom">
                    <div className="navbar-bottom__links">
                        <NavBarLink link="/about" label="About Us" active={currentPage === "/about"} onClick={handleClose} />
                        <NavBarLink link="/current-event" label="Now@ABBY" active={currentPage === "/current-event"} onClick={handleClose} />
                        <NavBarLink link="/previous-events" label="Previously@ABBY" active={currentPage === "/previous-events"} onClick={handleClose} />
                    </div>
                    <div className="navbar-bottom__extras">
                        <NavBarLink link="/my-gallery" label="My Gallery" active={currentPage === "/my-gallery"} onClick={handleClose} />
                        <div className="navbar-bottom__languages">
                            <p style={{ backgroundColor: "var(--color-sec-blue)", textDecoration: "underline"}}>EN</p>
                            <p style={{ backgroundColor: "var(--color-sec-green)" }}>NL</p>
                            <p style={{ backgroundColor: "var(--color-sec-orange)" }}>FR</p>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
