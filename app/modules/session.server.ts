import { z } from "zod";
import {
  createTypedSessionStorage,
  type TypedSessionStorage,
} from "remix-utils/typed-session";
import {
  createWorkersKVSessionStorage,
  redirect,
  type AppLoadContext,
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

type SessionStorageType = TypedSessionStorage<typeof SessionSchema>;

export const createSessionStorage = (
  context: AppLoadContext
): SessionStorageType => {
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

  return createTypedSessionStorage({
    sessionStorage: createWorkersKVSessionStorage({
      kv: treefy_kv_auth,
      cookie: sessionCookie,
    }),
    schema: SessionSchema,
  });
};

export const logout = async (context: AppLoadContext, request: Request) => {
  const sessionStorage = createSessionStorage(context);
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  throw redirect("/", {
    headers: { "set-cookie": await sessionStorage.destroySession(session) },
  });
};

export const readUser = async (context: AppLoadContext, request: Request) => {
  const sessionStorage = createSessionStorage(context);
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  return session.get("user");
};

export const updateUser = async (
  context: AppLoadContext,
  request: Request,
  updateUserData: Partial<User>
) => {
  const sessionStorage = createSessionStorage(context);
  const session = await sessionStorage.getSession(
    request.headers.get("cookie")
  );

  const currentUser = session.get("user");
  if (!currentUser) {
    throw new Error("No user found in session");
  }

  const updateUser = { ...currentUser, ...updateUserData };
  const validateUser = UserSchema.parse(updateUser);
  session.set("user", validateUser);

  const headers = new Headers({
    "set-cookie": await sessionStorage.commitSession(session),
  });

  return { headers, user: validateUser };
};

export const requireUser = async (
  context: AppLoadContext,
  request: Request,
  returnTo = "/login"
) => {
  const maybeUser = await readUser(context, request);
  if (!maybeUser) throw redirect(returnTo);

  return maybeUser;
};
