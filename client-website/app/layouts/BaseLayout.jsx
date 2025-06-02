import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

export const clientLoader = async () => {
    console.log("test3");
    // handle form logic here
};

const BaseLayout = () => (
    <>
        <NavBar />
        <main style={{ padding: "1rem" }}>
            <Outlet />
        </main>
    </>
);

export default BaseLayout;
