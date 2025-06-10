import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const BaseLayout = () => (
    <>
        <NavBar />
        <main >
            <Outlet />
        </main>
    </>
);

export default BaseLayout;
