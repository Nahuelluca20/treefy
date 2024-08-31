import { ActionFunctionArgs } from "@remix-run/cloudflare";
import { Form } from "@remix-run/react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { useMemo, useRef } from "react";
import { INITIAL_VALUE } from "~/components/editor/initValue";
import { MARKS } from "~/components/editor/marks";
import { plugins } from "~/components/editor/plugins";
import { TOOLS } from "~/components/editor/tools";
import { Button } from "~/components/ui/Button";
import { markdown } from "@yoopta/exports";
import { getFirstHeader } from "utils/strings";
import { SessionStorage } from "~/modules/session.server";
import { createNote } from "~/models/note.server";

export async function action({ context, request }: ActionFunctionArgs) {
  const user = await SessionStorage.requireUser(context, request);
  if (!user?.id) throw Error("User ID not exist");
  const formData = await request.formData();

  const noteData = {
    content: String(formData.get("editor")),
    title: String(formData.get("title")),
    userId: user?.id,
    parent_id: "",
  };
  const newNote = await createNote(noteData, context.cloudflare.env.DB);

  return newNote;
}

export default function AddNote() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const editorInputRef = useRef<HTMLInputElement>(null);
  const titleEditorInputRef = useRef<HTMLInputElement>(null);

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
  };

  return (
    <div>
      <Form method="post" onSubmit={handleBeforeSubmit}>
        <Button type="submit">Save</Button>
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
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          placeholder="Type something"
          tools={TOOLS}
          marks={MARKS}
          value={INITIAL_VALUE}
        />
      </Form>
    </div>
  );
}
