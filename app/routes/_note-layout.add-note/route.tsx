import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/cloudflare";
import { Form, useLoaderData } from "@remix-run/react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { useMemo, useRef, useState } from "react";
import { INITIAL_VALUE } from "~/components/editor/initValue";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { markdown } from "@yoopta/exports";
import { getFirstHeader } from "utils/strings";
import { SessionStorage } from "~/modules/session.server";
import { createNote, getNotesForBeParents } from "~/models/note.server";
import NoteToolbar from "~/components/editor/tool-bar";
import { ParentNotes } from "~/types/notes";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await SessionStorage.requireUser(context, request);
  if (!user?.id) throw Error("user id not found");

  const parentNotes = await getNotesForBeParents(
    user.id,
    context.cloudflare.env.DB
  );

  return json(parentNotes);
}

export async function action({ context, request }: ActionFunctionArgs) {
  const user = await SessionStorage.requireUser(context, request);
  if (!user?.id) throw Error("User ID not exist");
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "save": {
      const noteData = {
        content: String(formData.get("editor")),
        title: String(formData.get("title")),
        userId: user?.id,
        public_note: Boolean(formData.get("isPublic")),
        parent_id: String(formData.get("parentId")),
      };
      await createNote(noteData, context.cloudflare.env.DB);

      throw redirect("/home");
    }

    case "delete": {
      console.log("delete");
      return { success: true, message: "Nota edit" };
    }

    default:
      throw new Error("Acción no reconocida");
  }
}

export default function AddNote() {
  const parentNotes: ParentNotes = useLoaderData();
  const [isPublic, setIsPublic] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const editor = useMemo(() => createYooptaEditor(), []);
  const editorInputRef = useRef<HTMLInputElement>(null);
  const titleEditorInputRef = useRef<HTMLInputElement>(null);
  const isPublicInputRef = useRef<HTMLInputElement>(null);
  const parentIdInputRef = useRef<HTMLInputElement>(null);

  const handleBeforeSubmit = () => {
    const editorContent = editor.getEditorValue();

    const title = getFirstHeader(editorContent);
    if (titleEditorInputRef.current) {
      titleEditorInputRef.current.value = title ?? "Title";
    }

    // Convert the editor content to a JSON string
    const jsonString = JSON.stringify(editorContent);
    if (editorInputRef.current) {
      editorInputRef.current.value = jsonString;
    }

    if (isPublicInputRef.current) {
      isPublicInputRef.current.value = isPublic.toString();
    }

    if (parentIdInputRef.current) {
      parentIdInputRef.current.value = parentId ?? "";
    }
  };

  return (
    <Form method="post" onSubmit={handleBeforeSubmit}>
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
