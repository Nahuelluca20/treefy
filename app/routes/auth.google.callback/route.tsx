import { type LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { createAuth } from "~/modules/auth.server";
import { createSessionStorage } from "~/modules/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  try {
    const auth = createAuth(context);

    const user = await auth.authenticate("google", request);
    if (!user) throw redirect("/login");

    const sessionStorage = createSessionStorage(context);
    const session = await sessionStorage.getSession(
      request.headers.get("cookie")
    );
    session.set("user", user);

    const headers = new Headers();
    headers.append("set-cookie", await sessionStorage.commitSession(session));
    headers.append("set-cookie", await auth.clear(request));

    throw redirect("/home", { headers });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
