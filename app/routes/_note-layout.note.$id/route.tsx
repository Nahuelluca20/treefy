import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import { Await, Form, Link, useLoaderData } from "@remix-run/react";
import { createYooptaEditor } from "@yoopta/editor";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { lazy, Suspense, useMemo } from "react";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { deleteNote, getNoteById, getRelatedNotes } from "~/models/note.server";
import NoteNotFound from "./post-not-found";
import { readUser, requireUser } from "~/modules/session.server";
import SimpleNoteToolbar from "~/components/editor/simple-toolbar";
import { assertUUID } from "utils/uuid";
import { checkRateLimit } from "~/utils/check-rate-limit";
import NoteFallBackUI from "~/components/fallback-ui/note-fallback-ui";
import RelatedNotesFallBackUI from "~/components/fallback-ui/related-notes-fallback-ui";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  const KV = context.cloudflare.env.rate_limiter;
  await checkRateLimit(KV, pathname);

  const user = await readUser(context, request);
  const noteId = String(params.id);
  assertUUID(noteId);

  const note = await getNoteById(noteId, context.cloudflare.env.DB);
  if (!note?.public_note && note?.author_id !== user?.id) {
    throw new Response("Not Found", { status: 404 });
  }

  if (note?.content) {
    return {
      note: note?.content ? note.content : null,
      author: note?.author_id ?? null,
      user: user ?? null,
      relatedNotes: getRelatedNotes(noteId, context.cloudflare.env.DB),
      title: note?.title ?? "",
    };
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: `${data?.title ?? ""}` },
    {
      name: "description",
      content: `${data?.title}`,
    },
  ];
};

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
  const loaderData = useLoaderData<typeof loader>();
  const { note, relatedNotes, user, author } = loaderData ?? {};
  if (!note) {
    return <div>No note found</div>;
  }
  const YooptaEditor = lazy(() => import("@yoopta/editor"));

  return (
    <>
      {user?.id === author && (
        <Form method="delete">
          <SimpleNoteToolbar />
        </Form>
      )}

      <Link
        className="mb-6 flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        to={user ? "/home" : `/${author}/notes`}
      >
        <ArrowLeft className="mr-1 h-5 w-5 pt-1" />
        Back to Notes
      </Link>

      <Suspense fallback={<NoteFallBackUI />}>
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          placeholder="Type something"
          tools={TOOLS}
          marks={MARKS}
          value={JSON.parse(note)}
          readOnly
        />
      </Suspense>

      <Suspense fallback={<RelatedNotesFallBackUI />}>
        <Await resolve={relatedNotes}>
          {(relatedNotes) =>
            relatedNotes && (
              <footer className="mb-20">
                {relatedNotes.length > 0 && (
                  <>
                    <h4 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                      Related Notes
                    </h4>
                    <ul className="space-y-2">
                      {relatedNotes.map((note) => (
                        <li
                          key={note.id}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                          <Link
                            to={`/note/${note.id}`}
                            prefetch="viewport"
                            className="flex items-center"
                          >
                            <ChevronRight className="mr-2 h-4 w-4" />
                            {note.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </footer>
            )
          }
        </Await>
      </Suspense>
    </>
  );
}

export function ErrorBoundary() {
  return <NoteNotFound />;
}
