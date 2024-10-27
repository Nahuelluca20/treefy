import { Link, useRouteLoaderData } from "@remix-run/react";
import ModeToggle from "../buttons/mode-toggle";
import { LinkButton } from "../ui/LinkButton";
import type { UserSession } from "~/types/user";

export default function Navbar() {
  const user: UserSession = useRouteLoaderData("routes/_layout");

  return (
    <header className="border-b border-gray-200 dark:border-gray-800 px-5">
      <div className="container mx-auto  py-4 flex items-center justify-between max-w-[1100px] ">
        <Link
          to="/home"
          className="text-2xl font-bold text-gray-800 dark:text-gray-200"
        >
          Treefy
        </Link>

        <div className="flex items-center gap-3">
          {user?.id && (
            <LinkButton variant="icon" to={`${user.id}/notes`}>
              Public Notes
            </LinkButton>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
