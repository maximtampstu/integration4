import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

const BaseLayout = () => (
    <>
        <NavBar />
        <main style={{ padding: "1rem" }}>
            <Outlet />
        </main>
    </>
);

export default BaseLayout;
