export interface NoteTable {
  id?: string;
  parent_id?: string;
  title?: string;
  content: string;
  date: string;
  public_note?: boolean;
  author_id: string;
}
