import { json, type LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { readUser } from "~/modules/session.server";
import GoogleIcon from "~/assets/google-icon.svg";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await readUser(context, request);
  if (!user) return json(null);

  throw redirect("/home");
}

export function meta() {
  return [
    { title: "Login | Treefy" },
    { name: "description", content: "Sign in to your account using Google" },
  ];
}

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login with Google
        </h1>

        <Form action="/auth/google" method="post">
          <Button
            type="submit"
            className="flex gap-3 w-full font-semibold"
            variant="icon"
          >
            <img width={20} src={GoogleIcon} alt="login with google" />
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
