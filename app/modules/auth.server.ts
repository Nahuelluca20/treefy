import type { AppLoadContext, SessionStorage } from "@remix-run/cloudflare";

import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
// import { db } from "db";
import { User } from "./session.server";
import { db } from "~/database";
import { generateUUID } from "utils/uuid";

export class Auth {
  protected authenticator: Authenticator<User>;
  protected sessionStorage: SessionStorage;

  public authenticate: Authenticator<User>["authenticate"];

  constructor(context: AppLoadContext) {
    const {
      COOKIE_SESSION_SECRET,
      GOOGLE_CLIENT_ID,
      ENVIROMENT,
      GOOGLE_CLIENT_SECRET,
    } = context.cloudflare.env;

    this.sessionStorage = createCookieSessionStorage({
      cookie: {
        name: "treefy:auth",
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        secure: ENVIROMENT === "PROD",
        secrets: [COOKIE_SESSION_SECRET!],
      },
    });

    this.authenticator = new Authenticator<User>(this.sessionStorage, {
      throwOnError: true,
      sessionKey: "token",
    });

    const googleStrategy = new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID!,
        clientSecret: GOOGLE_CLIENT_SECRET!,
        callbackURL:
          ENVIROMENT === "PROD"
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
        if (findUser) findUser;

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

    this.authenticator.use(googleStrategy);

    this.authenticate = this.authenticator.authenticate.bind(
      this.authenticator
    );
  }

  public async clear(request: Request) {
    const session = await this.sessionStorage.getSession(
      request.headers.get("cookie")
    );

    return this.sessionStorage.destroySession(session);
  }
}
