import { useMemo, useRef, useState } from "react";
import { createYooptaEditor } from "@yoopta/editor";

export function useNoteEditor() {
  const [isPublic, setIsPublic] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const editor = useMemo(() => createYooptaEditor(), []);
  const editorInputRef = useRef<HTMLInputElement>(null);
  const titleEditorInputRef = useRef<HTMLInputElement>(null);
  const isPublicInputRef = useRef<HTMLInputElement>(null);
  const parentIdInputRef = useRef<HTMLInputElement>(null);

  return {
    isPublic,
    setIsPublic,
    parentId,
    setParentId,
    editor,
    editorInputRef,
    titleEditorInputRef,
    isPublicInputRef,
    parentIdInputRef,
  };
}
