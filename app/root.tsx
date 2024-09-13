import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import stylesheet from "./styles/tailwind.css?url";
import { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import {
  ThemeProvider,
  Theme,
  PreventFlashOnWrongTheme,
  useTheme,
} from "remix-themes";

import { themeSessionResolver } from "./routes/theme-sessions.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await themeSessionResolver(request);
  const theme = getTheme();

  return { theme };
};

function App() {
  const data: {
    theme: string;
  } = useLoaderData();
  const [theme] = useTheme();
  return (
    <html lang="en" data-mode={theme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data?.theme)} />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data: {
    theme: string;
  } = useLoaderData();
  return (
    <ThemeProvider
      specifiedTheme={data.theme as Theme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  );
}
