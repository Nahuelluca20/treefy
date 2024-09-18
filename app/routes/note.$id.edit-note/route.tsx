import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import YooptaEditor from "@yoopta/editor";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { requireUser } from "~/modules/session.server";
import {
  deleteNote,
  getAllNoteById,
  getNotesForBeParents,
  updateNote,
} from "~/models/note.server";
import NoteToolbar from "~/components/editor/tool-bar";
import { useNoteEditor } from "~/helpers/use-note-editor.hook";
import { ParentNotes } from "~/types/notes";
import { prepareEditorSubmit } from "utils/submit-note";
import { markdown } from "@yoopta/exports";
import { checkRateLimit } from "~/utils/check-rate-limit";

export async function loader({ context, request, params }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  const KV = context.cloudflare.env.rate_limiter;
  await checkRateLimit(KV, pathname);

  const user = await requireUser(context, request);
  if (!user?.id) throw Error("user id not found");

  if (!params.id) throw new Response("Note ID not provided", { status: 400 });

  const note = await getAllNoteById(params.id, context.cloudflare.env.DB);
  if (!note) throw new Response("Nota no encontrada", { status: 404 });
  if (note.author_id !== user.id)
    throw new Response("Not authorized", { status: 403 });

  const content = JSON.parse(note.content);
  const noteData = {
    title: note.title,
    public_note: note.public_note,
    parent_id: note.parent_id,
  };

  const parentNotes = (await getNotesForBeParents(
    user.id,
    context.cloudflare.env.DB
  )) as ParentNotes;

  const meta = [
    { title: `Edit note | ${note.title ?? ""}` },
    {
      name: "description",
      content: `Edit the note ${note.title}`,
    },
  ];

  return json({ content, noteData, parentNotes, meta });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.meta ?? [];

export async function action({ context, request, params }: ActionFunctionArgs) {
  const user = await requireUser(context, request);
  if (!user?.id) throw Error("User ID not exist");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "save": {
      const noteData = {
        content: String(formData.get("editor")),
        title: String(formData.get("title")),
        public_note: formData.get("isPublic") === "true" ? true : false,
        parent_id: String(formData.get("parentId")),
      };

      await updateNote(noteData, String(params.id), context.cloudflare.env.DB);
      throw redirect("/home");
    }

    case "delete": {
      const deletedNote = await deleteNote(
        String(params.id),
        context.cloudflare.env.DB
      );
      if (!deletedNote) return null;
      return redirect("/home");
    }

    default:
      throw new Response("Error", { status: 400 });
  }
}

export default function EditNote() {
  const { content, parentNotes, noteData } = useLoaderData<typeof loader>();
  const {
    isPublic,
    setIsPublic,
    parentId,
    setParentId,
    editor,
    editorInputRef,
    titleEditorInputRef,
    isPublicInputRef,
    parentIdInputRef,
  } = useNoteEditor(noteData.public_note ?? false, noteData.parent_id ?? "");

  return (
    <div className="w-full max-w-[750px] mx-auto mt-10 px-5 md:px-0">
      <Form
        method="post"
        onSubmit={() => {
          prepareEditorSubmit(
            editor,
            titleEditorInputRef,
            editorInputRef,
            isPublicInputRef,
            parentIdInputRef,
            isPublic,
            parentId
          );
        }}
      >
        <NoteToolbar
          isPublic={isPublic}
          handleTogglePublic={setIsPublic}
          parentNotes={parentNotes}
          onParentChange={setParentId}
        />

        <input
          name="title"
          ref={titleEditorInputRef}
          type="hidden"
          value={"Title"}
        />
        <input
          name="editor"
          ref={editorInputRef}
          type="hidden"
          value={markdown.serialize(editor, editor.getEditorValue())}
        />
        <input
          name="isPublic"
          ref={isPublicInputRef}
          type="hidden"
          value={isPublic.toString()}
        />
        <input
          name="parentId"
          ref={parentIdInputRef}
          type="hidden"
          value={parentId ?? ""}
        />
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          placeholder="Type something"
          tools={TOOLS}
          marks={MARKS}
          value={content}
        />
      </Form>
    </div>
  );
}
