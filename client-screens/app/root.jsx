import { Outlet } from "react-router";
import TouchCountDown from "./components/TouchCountDown/TouchCountDown";

export default function Root() {

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <Outlet />
                <TouchCountDown />
            </body>
        </html>
    );
}
