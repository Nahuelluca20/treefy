import YooptaEditor, { YooEditor } from "@yoopta/editor";
import { INITIAL_VALUE } from "./initValue";
import { MARKS } from "./marks";
import { plugins } from "./plugins";
import { TOOLS } from "./tools";

export default function NoteEditor(
  editor: YooEditor,
  readOnly: boolean,
  value = INITIAL_VALUE
) {
  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      placeholder="Type something"
      tools={TOOLS}
      readOnly={readOnly}
      marks={MARKS}
      value={value}
    />
  );
}
