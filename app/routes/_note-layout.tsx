import { Outlet } from "@remix-run/react";

export default function NoteLayout() {
  return (
    <div className="w-full max-w-[750px] mx-auto mt-10 px-5 md:px-0">
      <Outlet />
    </div>
  );
}
