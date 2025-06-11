import { Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from "react-router";

export default function App() {
  return <Outlet />;
}

export function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>You @ ABBY</title>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id="error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function HydrateFallback() {
  return (
    <div id="loading-splash">
      <div id="loading-splash-spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}



// // root.jsx
// import { Outlet, ScrollRestoration, Scripts, useNavigation } from "react-router";
// //https://reactrouter.com/6.30.0/components/scroll-restoration
// //https://reactrouter.com/api/components/Scripts

// export default function Root() {
//   const navigation = useNavigation();

//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="apple-touch-icon" sizes="180x180" href="../public/apple-touch-icon.png" />
//         <link rel="icon" type="image/png" sizes="32x32" href="../public/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="../public/favicon-16x16.png" />
//         <link rel="manifest" href="../public/site.webmanifest" />
//         <title>You@Abby</title>
//       </head>
//       <body>
//         <Outlet />
//         <ScrollRestoration />
//         <Scripts />
//         {navigation.state === "loading" && (
//           <p style={{ position: "absolute", top: "50%", left: "50%", backgroundColor: "red", padding: "0.5rem", textAlign: "center", width: "20rem", height: "20rem", color: "white", fontSize: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             Loading...
//           </p>
//         )}
//       </body>
//     </html>
//   );
// }



// /* export function HydrateFallback() {
//   return (
//     <p>Loading, please wait...</p>
//   );
// } */