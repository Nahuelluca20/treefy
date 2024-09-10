import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import { Form, Link, useLoaderData } from "@remix-run/react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { deleteNote, getNoteById, getRelatedNotes } from "~/models/note.server";
import NoteNotFound from "./post-not-found";
import { readUser, requireUser } from "~/modules/session.server";
import SimpleNoteToolbar from "~/components/editor/simple-toolbar";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  const user = await readUser(context, request);

  const note = await getNoteById(String(params.id), context.cloudflare.env.DB);
  const relatedNotes = await getRelatedNotes(
    String(params.id),
    context.cloudflare.env.DB
  );

  if (!!note?.public_note || note?.author_id === user?.id) {
    if (note?.content) {
      return json({
        note: JSON.parse(note.content),
        author: note.author_id,
        user: user,
        relatedNotes: relatedNotes,
      });
    }
  }

  throw new Response("Oh no! Something went wrong!", {
    status: 403,
  });
}

export async function action({ context, request, params }: ActionFunctionArgs) {
  await requireUser(context, request);

  try {
    const deletedNote = await deleteNote(
      String(params.id),
      context.cloudflare.env.DB
    );
    if (!deletedNote) return null;
    return redirect("/home");
  } catch (error) {
    return null;
  }
}

export default function NoteRoute() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const { note, relatedNotes, user, author } = useLoaderData<typeof loader>();

  return (
    <>
      {user?.id === author && (
        <Form method="delete">
          <SimpleNoteToolbar />
        </Form>
      )}
      {note && (
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          placeholder="Type something"
          tools={TOOLS}
          marks={MARKS}
          value={note}
          readOnly
        />
      )}

      <footer className="mb-20">
        {relatedNotes.length > 0 && (
          <>
            <h5 className="underline">Related Notes</h5>
            <ul>
              {relatedNotes.map((note) => (
                <li key={note.id} className="mt-1">
                  <Link
                    to={`/note/${note.id}`}
                    prefetch="viewport"
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 mr-1" />
                    <span>{note.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </footer>
    </>
  );
}

export function ErrorBoundary() {
  return <NoteNotFound />;
}
