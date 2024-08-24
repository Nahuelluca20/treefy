import { z } from "zod";
import {
  createTypedSessionStorage,
  TypedSessionStorage,
} from "remix-utils/typed-session";
import {
  createWorkersKVSessionStorage,
  redirect,
  AppLoadContext,
  createCookie,
} from "@remix-run/cloudflare";

export const UserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email().max(320),
  name: z.string().max(320),
  profile_image: z.string().url().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const SessionSchema = z.object({
  user: UserSchema.optional(),
});

export class SessionStorage {
  protected sessionStorage: TypedSessionStorage<typeof SessionSchema>;

  public read: TypedSessionStorage<typeof SessionSchema>["getSession"];
  public commit: TypedSessionStorage<typeof SessionSchema>["commitSession"];
  public destroy: TypedSessionStorage<typeof SessionSchema>["destroySession"];

  constructor(context: AppLoadContext) {
    const { treefy_kv_auth, COOKIE_SESSION_SECRET, ENVIROMENT } =
      context.cloudflare.env;

    const sessionCookie = createCookie("treefy:session", {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
      secure: ENVIROMENT === "PROD",
      secrets: [COOKIE_SESSION_SECRET!],
    });

    this.sessionStorage = createTypedSessionStorage({
      sessionStorage: createWorkersKVSessionStorage({
        kv: treefy_kv_auth,
        cookie: sessionCookie,
      }),
      schema: SessionSchema,
    });

    this.read = this.sessionStorage.getSession;
    this.commit = this.sessionStorage.commitSession;
    this.destroy = this.sessionStorage.destroySession;
  }

  static async logout(context: AppLoadContext, request: Request) {
    const sessionStorage = new SessionStorage(context);
    const session = await sessionStorage.read(request.headers.get("cookie"));

    throw redirect("/", {
      headers: { "set-cookie": await sessionStorage.destroy(session) },
    });
  }

  static async readUser(context: AppLoadContext, request: Request) {
    const sessionStorage = new SessionStorage(context);
    const session = await sessionStorage.read(request.headers.get("cookie"));

    return session.get("user");
  }

  static async updateUser(
    context: AppLoadContext,
    request: Request,
    updateUserData: Partial<User>
  ) {
    const sessionStorage = new SessionStorage(context);
    const session = await sessionStorage.read(request.headers.get("cookie"));

    const currentUser = session.get("user");
    if (!currentUser) {
      throw new Error("No user found in session");
    }

    const updateUser = { ...currentUser, ...updateUserData };
    const validateUser = UserSchema.parse(updateUser);
    session.set("user", validateUser);

    const headers = new Headers({
      "set-cookie": await sessionStorage.commit(session),
    });

    return { headers, user: validateUser };
  }

  static async requireUser(
    context: AppLoadContext,
    request: Request,
    returnTo = "/login"
  ) {
    const maybeUser = SessionStorage.readUser(context, request);
    if (!maybeUser) throw redirect(returnTo);

    return maybeUser;
  }
}
