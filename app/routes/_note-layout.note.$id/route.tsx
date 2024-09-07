import { json, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { getNoteById, getRelatedNotes } from "~/models/note.server";
import NoteNotFound from "./post-not-found";
import { requireUser } from "~/modules/session.server";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  await requireUser(context, request);

  const note = await getNoteById(String(params.id), context.cloudflare.env.DB);
  const relatedNotes = await getRelatedNotes(
    String(params.id),
    context.cloudflare.env.DB
  );
  if (note?.content) {
    return json({
      note: JSON.parse(note.content),
      relatedNotes: relatedNotes,
    });
  }

  throw new Response("Oh no! Something went wrong!", {
    status: 500,
  });
}

export default function NoteRoute() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const { note, relatedNotes } = useLoaderData<typeof loader>();

  return (
    <>
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
                    reloadDocument
                    to={`/note/${note.id}`}
                    prefetch="intent"
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
