import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import SideBar from "~/components/navigation/side-bar";
// import SideBar from "~/components/navigation/side-bar";
import { readUser } from "~/modules/session.server";
import { UserSession } from "~/types/user";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user: UserSession = await readUser(context, request);

  return user?.name ?? "";
}

export default function Layout() {
  const user = useLoaderData<typeof loader>();
  return (
    <section className="px-5 max-w-[1200px] w-full mx-auto mt-10 bg-foreground">
      <section className="md:gap-20 lg:gap-36 items-start">
        <SideBar userName={user ?? ""} />
        <section className="max-w-[750px] xl:w-full mx-auto px-1">
          <Outlet />
        </section>
      </section>
    </section>
  );
}
