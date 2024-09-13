import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { createThemeSessionResolver } from "remix-themes";
// import { env } from "node:process";

// You can default to 'development' if process.env.NODE_ENV is not set
// const isProduction = env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    secure: true,

    // ...(isProduction
    //   ? { domain: "linkin-remix.pages.dev/", secure: true }
    //   : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
