import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const BaseLayout = () => {

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default BaseLayout;