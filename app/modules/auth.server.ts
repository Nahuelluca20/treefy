import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";
import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { User } from "./session.server";
import { db } from "~/database/database.server";
import { generateUUID } from "utils/uuid";

type AuthConfig = {
  COOKIE_SESSION_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  ENVIROMENT: string;
  GOOGLE_CLIENT_SECRET: string;
};

const createSessionStorage = (config: AuthConfig): SessionStorage => {
  return createCookieSessionStorage({
    cookie: {
      name: "treefy:auth",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      secure: config.ENVIROMENT === "PROD",
      secrets: [config.COOKIE_SESSION_SECRET],
    },
  });
};

const createAuthenticator = (
  sessionStorage: SessionStorage
): Authenticator<User> => {
  return new Authenticator<User>(sessionStorage, {
    throwOnError: true,
    sessionKey: "token",
  });
};

const createGoogleStrategy = (config: AuthConfig, context: AppLoadContext) => {
  return new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL:
        config.ENVIROMENT === "PROD"
          ? "https://linkin-remix.pages.dev/auth/google/callback"
          : "http://localhost:5173/auth/google/callback",
    },
    async ({ profile }): Promise<User> => {
      const { DB } = context.cloudflare.env;
      const email = profile.emails[0].value;
      const name = profile.name.givenName;
      const profile_image = profile.photos[0].value;

      const findUser = await db(DB)
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();
      if (findUser) return findUser;

      const createUser = await db(DB)
        .insertInto("users")
        .values({
          id: generateUUID(),
          email,
          name,
          profile_image,
        })
        .returning(["id", "email", "name", "profile_image"])
        .executeTakeFirstOrThrow();
      return createUser;
    }
  );
};

export const createAuth = (context: AppLoadContext) => {
  const config: AuthConfig = {
    COOKIE_SESSION_SECRET: context.cloudflare.env.COOKIE_SESSION_SECRET,
    GOOGLE_CLIENT_ID: context.cloudflare.env.GOOGLE_CLIENT_ID,
    ENVIROMENT: context.cloudflare.env.ENVIROMENT,
    GOOGLE_CLIENT_SECRET: context.cloudflare.env.GOOGLE_CLIENT_SECRET,
  };

  const sessionStorage = createSessionStorage(config);
  const authenticator = createAuthenticator(sessionStorage);
  const googleStrategy = createGoogleStrategy(config, context);

  authenticator.use(googleStrategy);

  const authenticate = authenticator.authenticate.bind(authenticator);

  const clear = async (request: Request) => {
    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    return sessionStorage.destroySession(session);
  };

  return {
    authenticate,
    clear,
  };
};
