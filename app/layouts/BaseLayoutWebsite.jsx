import { Outlet, useLocation, useNavigation } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const BaseLayoutWebsite = () => {
    const location = useLocation();
    const [navOpen, setNavOpen] = useState(false);
    let navigation = useNavigation();

    return (
        <>
            <NavBar navOpen={navOpen} setNavOpen={setNavOpen} currentPage={location.pathname} />
            <main className={navOpen ? "visually-hidden" : `main ${location.pathname.slice(1).split('/')[0] === "" ? "home" : location.pathname.slice(1).split('/')[0]}`} style={{maxWidth: "100vw"}}>
                <Outlet />
            </main>
            <Footer navOpen={navOpen} />
            {navigation.state === "loading" &&
                <div style={{ position: "fixed", width: "100vw", height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.45)", top: 0, left: 0, zIndex: 1000 }}></div>
            }
        </>
    );
};

export default BaseLayoutWebsite;