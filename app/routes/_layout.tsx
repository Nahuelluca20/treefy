import { Outlet } from "@remix-run/react";
import SideBar from "~/components/navigation/side-bar";

export default function Layout() {
  return (
    <section className="flex gap-20 items-start">
      <SideBar />
      <Outlet />
    </section>
  );
}
