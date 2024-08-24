import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Auth } from "~/modules/auth.server";

export const loader = () => redirect("/login");

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const auth = new Auth(context);
  return await auth.authenticate("google", request);
};
