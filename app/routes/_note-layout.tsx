import { Outlet, useParams } from "@remix-run/react";

export default function NoteLayout() {
  const { id } = useParams();
  return (
    <div className="w-full max-w-[750px] mx-auto mt-10 px-5 md:px-0">
      <Outlet key={id} />
    </div>
  );
}
