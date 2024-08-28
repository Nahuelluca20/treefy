import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import SideBar from "~/components/navigation/side-bar";
import { SessionStorage } from "~/modules/session.server";
import { UserSession } from "~/types/user";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user: UserSession = await SessionStorage.requireUser(context, request);
  if (!user || !user.name) {
    throw new Error("User session is invalid or user is not authenticated");
  }

  return user;
}

export default function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <section className="flex gap-36 items-start">
      <SideBar userName={user.name ?? ""} />
      <hr className="hidden lg:block" />
      <Outlet />
    </section>
  );
}
