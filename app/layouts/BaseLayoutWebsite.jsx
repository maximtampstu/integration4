import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const BaseLayoutWebsite = () => {
    const location = useLocation();
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <NavBar navOpen={navOpen} setNavOpen={setNavOpen} currentPage={location.pathname} />
            <main className={navOpen ? "visually-hidden" : `main ${location.pathname.slice(1).split('/')[0] === "" ? "home" : location.pathname.slice(1).split('/')[0]}`} style={{maxWidth: "100vw"}}>
                <Outlet />
            </main>
            <Footer navOpen={navOpen} />
        </>
    );
};

export default BaseLayoutWebsite;