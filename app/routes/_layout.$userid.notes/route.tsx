import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, type MetaFunction } from "@remix-run/react";
import { getPublicNotesByUserId, getUsernameById } from "~/models/note.server";
import NotesList from "~/components/notes-list";
import { assertUUID } from "utils/uuid";
import { checkRateLimit } from "~/utils/check-rate-limit";

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  const KV = context.cloudflare.env.rate_limiter;
  await checkRateLimit(KV, pathname);

  const userId = params.userid;
  assertUUID(userId);
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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Public Notes - Not Found" },
      { description: "Unable to load public notes information." },
    ];
  }

  return [
    { title: `${data.username}'s Public Notes` },
    { description: `List of public notes shared by ${data.username}` },
  ];
};

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
      <NotesList notes={notes} title={`Public notes of ${username}`} />
    </div>
  );
}
