import { useMemo } from "react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { plugins } from "./plugins";
import { TOOLS } from "./tools";
import { MARKS } from "./marks";
import { INITIAL_VALUE } from "./initValue";
import { Button } from "../ui/Button";

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);

  const onSaveToServer = async () => {
    const editorContent = editor.getEditorValue();
    console.log(editorContent);
    // await fetchToServer(editorContent)
  };

  return (
    <div>
      <Button onPress={onSaveToServer}>Save</Button>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        placeholder="Type something"
        tools={TOOLS}
        marks={MARKS}
        value={INITIAL_VALUE}
      />
    </div>
  );
}
