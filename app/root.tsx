import { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Outlet } from "@remix-run/react";
// eslint-disable-next-line import/no-unresolved
import styles from '~/styles/global.css';


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];


export default function App() {
  return (
    <html lang="en">
      <head>
        <Links />
        <title>Todo</title>
      </head>
      <body className="bg-sky-500">
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}

