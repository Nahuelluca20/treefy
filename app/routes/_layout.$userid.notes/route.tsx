import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPublicNotesByUserId, getUsernameById } from "~/models/note.server";
import NotesList from "~/components/notes-list";

export async function loader({ params, context }: LoaderFunctionArgs) {
  const userId = params.userid;
  if (!userId) {
    throw new Response("User ID not found", { status: 404 });
  }
  const [publicNotes, username] = await Promise.all([
    getPublicNotesByUserId(userId, context.cloudflare.env.DB),
    getUsernameById(userId, context.cloudflare.env.DB),
  ]);
  return json({ publicNotes, username });
}

interface Note {
  id: string;
  title: string;
  parent_id: string | null;
}

export default function PublicNotesList() {
  const { publicNotes, username } = useLoaderData<{
    publicNotes: Note[];
    username: string;
  }>();

  const notes = publicNotes.map((item) => ({
    id: item.id ?? "",
    title: item.title ?? "",
    parent_id: item.parent_id === "" ? null : item.parent_id,
  }));

  return (
    <div>
      <NotesList notes={notes} title={`Notas públicas de ${username}`} />
    </div>
  );
}
