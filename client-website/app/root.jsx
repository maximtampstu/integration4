// root.jsx
import { Outlet, ScrollRestoration, Scripts } from "react-router";
//https://reactrouter.com/6.30.0/components/scroll-restoration
//https://reactrouter.com/api/components/Scripts

import { AuthProvider } from "./context/AuthContext";

export default function Root() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <ScrollRestoration /> 
        <Scripts />
      </body>
    </html>
  );
}
