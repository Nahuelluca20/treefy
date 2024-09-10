import { useMemo, useRef, useState } from "react";
import { createYooptaEditor } from "@yoopta/editor";

export function useNoteEditor(isPublicProp: boolean, parentIdProp: string) {
  const [isPublic, setIsPublic] = useState(isPublicProp);
  const [parentId, setParentId] = useState<string | null>(parentIdProp);

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
