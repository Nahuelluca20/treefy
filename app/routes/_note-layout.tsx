import { Outlet } from "@remix-run/react";

export default function NoteLayout() {
  return (
    <div className="w-full max-w-[750px] mx-auto">
      <Outlet />
    </div>
  );
}
