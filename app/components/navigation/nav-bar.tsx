import { Link, useRouteLoaderData } from "@remix-run/react";
import ModeToggle from "../buttons/mode-toggle";
import { LinkButton } from "../ui/LinkButton";
import { UserSession } from "~/types/user";

export default function Navbar() {
  const user: UserSession = useRouteLoaderData("routes/_layout");

  return (
    <aside className="mb-12 md:mb-20 w-full md:max-w-[750px] mx-auto flex flex-col gap-4 items-start ">
      <div className="w-full flex gap-4 justify-between md:items-start">
        <Link to="/home" className="text-2xl font-semibold">
          Treefy
        </Link>
        <div className="flex items-center gap-3">
          <LinkButton variant="icon" to={`${user?.id}/notes`}>
            Public Notes
          </LinkButton>
          <ModeToggle />
        </div>
      </div>
      {/* <SearchField
        label="Search"
        onBlur={function Qa() {}}
        onChange={function Qa() {}}
        onClear={function Qa() {}}
        onFocus={function Qa() {}}
        onFocusChange={function Qa() {}}
        onKeyDown={function Qa() {}}
        onKeyUp={function Qa() {}}
        onSubmit={function Qa() {}}
      /> */}
      {/* <h4 className="text-base font-bold">Recents Posts</h4> */}
    </aside>
  );
}
