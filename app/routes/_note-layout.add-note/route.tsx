import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import YooptaEditor from "@yoopta/editor";
import { INITIAL_VALUE } from "~/components/editor/initValue";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { markdown } from "@yoopta/exports";
import { requireUser } from "~/modules/session.server";
import { createNote, getNotesForBeParents } from "~/models/note.server";
import NoteToolbar from "~/components/editor/tool-bar";
import { ParentNotes } from "~/types/notes";
import { prepareEditorSubmit } from "utils/submit-note";
import { useNoteEditor } from "~/helpers/use-note-editor.hook";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await requireUser(context, request);
  if (!user?.id) throw Error("user id not found");

  const parentNotes = await getNotesForBeParents(
    user.id,
    context.cloudflare.env.DB
  );

  return json(parentNotes);
}

export async function action({ context, request }: ActionFunctionArgs) {
  const user = await requireUser(context, request);
  if (!user?.id) throw Error("User ID not exist");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "save": {
      const noteData = {
        content: String(formData.get("editor")),
        title: String(formData.get("title")),
        userId: user?.id,
        public_note: formData.get("isPublic") === "true" ? true : false,
        parent_id: String(formData.get("parentId")),
      };
      await createNote(noteData, context.cloudflare.env.DB);
      throw redirect("/home");
    }

    case "delete": {
      throw redirect("/home");
    }

    default:
      throw new Response("Error", { status: 400 });
  }
}

export default function AddNote() {
  const parentNotes: ParentNotes = useLoaderData();
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
  } = useNoteEditor(false, "");

  return (
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
        value={INITIAL_VALUE}
      />
    </Form>
  );
}
