import { Outlet } from "react-router";

export default function Root() {

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png" />
                <link rel="manifest" href="../public/site.webmanifest" />
                <title>You@Abby</title>
            </head>
            <body>
                <Outlet />
            </body>
        </html>
    );
}
