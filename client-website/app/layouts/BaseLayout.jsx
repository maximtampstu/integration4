import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const BaseLayout = () => {
    const location = useLocation();
    const [navOpen, setNavOpen] = useState(false);

    return (
        <>
            <NavBar navOpen={navOpen} setNavOpen={setNavOpen} currentPage={location.pathname} />
            <main className={navOpen ? "visually-hidden" : "main"} >
                <Outlet />
            </main>
            <Footer className={navOpen ? "visually-hidden" : null} />
        </>
    );
};

export default BaseLayout;