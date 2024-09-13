import { ActionFunctionArgs, redirect } from "@remix-run/cloudflare";
import { createAuth } from "~/modules/auth.server";

export const loader = () => redirect("/login");

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const auth = createAuth(context);
  return await auth.authenticate("google", request);
};
