import { YooEditor } from "@yoopta/editor";
import { getFirstHeader } from "utils/strings";

export function prepareEditorSubmit(
  editor: YooEditor,
  titleEditorInputRef: React.RefObject<HTMLInputElement>,
  editorInputRef: React.RefObject<HTMLInputElement>,
  isPublicInputRef: React.RefObject<HTMLInputElement>,
  parentIdInputRef: React.RefObject<HTMLInputElement>,
  isPublic: boolean,
  parentId: string | null
) {
  const editorContent = editor.getEditorValue();

  const title = getFirstHeader(editorContent);
  if (titleEditorInputRef.current) {
    titleEditorInputRef.current.value = title ?? "Title";
  }

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
}
