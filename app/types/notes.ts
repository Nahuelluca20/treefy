export type ParentNotes = {
  id: string;
  title: string;
}[];

export interface NoteContent {
  [index: number]: {
    content: {
      text: string;
    }[];
  };
  title: string;
  isPublic: boolean;
  parentId: string | null;
}
