import { useMemo } from "react";
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor";
import { plugins } from "./plugins";
import { TOOLS } from "./tools";
import { MARKS } from "./marks";
import { INITIAL_VALUE } from "./initValue";

export default function Editor() {
  const editor = useMemo(() => createYooptaEditor(), []);
  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      placeholder="Type something"
      tools={TOOLS}
      marks={MARKS}
      value={INITIAL_VALUE}
    />
  );
}
