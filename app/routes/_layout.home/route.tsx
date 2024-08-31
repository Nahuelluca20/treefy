import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import NotesList from "~/components/notes-list";
import { LinkButton } from "~/components/ui/LinkButton";
import { notesList } from "~/models/note.server";
import { SessionStorage } from "~/modules/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await SessionStorage.requireUser(context, request);
  if (!user?.id) throw Error("user id not found");

  const list = await notesList(user.id, context.cloudflare.env.DB);

  return list;
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const notes = data.map((item) => ({
    id: item.id ?? "",
    title: item.title ?? "",
    parent_id: item.parent_id === "" ? null : item.parent_id,
  }));

  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="dark:text-gray-400 text-gray-600">
            Find all of your notes here
          </p>
        </div>
        <LinkButton to="/add-note">Add Note</LinkButton>
      </header>

      <section className="mt-5">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <hr className="border dark:border-gray-600 border-gray-300" />
        <NotesList notes={notes} />
      </section>
    </>
  );
}
