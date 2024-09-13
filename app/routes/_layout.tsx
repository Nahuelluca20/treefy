import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet } from "@remix-run/react";
import Navbar from "~/components/navigation/nav-bar";
import { readUser } from "~/modules/session.server";
import { UserSession } from "~/types/user";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user: UserSession = await readUser(context, request);

  return json({ name: user?.name ?? "", id: user?.id ?? "" });
}

export default function Layout() {
  return (
    <section className="px-5 max-w-[1200px] w-full mx-auto mt-10 bg-foreground">
      <section className="md:gap-20 lg:gap-36 items-start">
        <Navbar />
        <section className="max-w-[750px] xl:w-full mx-auto px-1">
          <Outlet />
        </section>
      </section>
    </section>
  );
}
