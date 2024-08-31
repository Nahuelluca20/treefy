import { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { useMemo } from "react";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { getNoteById } from "~/models/note.server";
import { SessionStorage } from "~/modules/session.server";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  await SessionStorage.requireUser(context, request);

  const note = await getNoteById(String(params.id), context.cloudflare.env.DB);
  if (note) {
    return JSON.parse(note.content);
  }

  return null;
}

export default function NoteRoute() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const note = useLoaderData<typeof loader>();

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
    </>
  );
}
