export type ParentNotes = {
  id: string;
  title: string;
  parentId: string;
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
