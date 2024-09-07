import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import SideBar from "~/components/navigation/side-bar";
// import SideBar from "~/components/navigation/side-bar";
import { requireUser } from "~/modules/session.server";
import { UserSession } from "~/types/user";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user: UserSession = await requireUser(context, request);

  return user;
}

export default function Layout() {
  const user = useLoaderData<typeof loader>();

  return (
    <section className="px-5 max-w-[1200px] w-full mx-auto mt-10 bg-foreground">
      <section className="md:flex md:gap-20 lg:gap-36 items-start">
        <SideBar userName={user.name ?? ""} />
        <hr className="hidden lg:block" />
        <section className="max-w-[750px] xl:w-full mx-auto px-1 md:px-8 py-6">
          <Outlet />
        </section>
      </section>
    </section>
  );
}
