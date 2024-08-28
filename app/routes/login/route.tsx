import { json, LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { SessionStorage } from "~/modules/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await SessionStorage.readUser(context, request);
  if (!user) return json(null);

  throw redirect("/home");
}

export default function Login() {
  return (
    <Form action="/auth/google" method="post">
      <Button type="submit">Login with Google</Button>
    </Form>
  );
}
