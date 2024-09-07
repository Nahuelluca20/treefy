import { generateUUID } from "utils/uuid";
import { db } from "~/database/database.server";

interface CreateNote {
  content: string;
  title: string;
  userId: string;
  public_note?: boolean;
  parent_id: string;
}

export async function createNote(noteData: CreateNote, d1: D1Database) {
  const note = await db(d1)
    .insertInto("notes")
    .values({
      id: generateUUID(),
      title: noteData.title,
      parent_id: noteData.parent_id,
      content: noteData.content,
      public_note: noteData.public_note,
      date: String(Date.now()),
      author_id: noteData.userId,
    })
    .returning(["id"])
    .executeTakeFirst();

  if (!note?.id) {
    throw Error("Something went wrong");
  }

  return note?.id;
}

export async function notesList(userId: string, d1: D1Database) {
  const noteList = await db(d1)
    .selectFrom("users")
    .leftJoin("notes", "users.id", "notes.author_id")
    .select(["notes.id", "notes.title", "notes.parent_id"])
    .where("notes.author_id", "=", userId)
    .execute();

  return noteList;
}

export async function getNoteById(noteId: string, d1: D1Database) {
  const note = db(d1)
    .selectFrom("notes")
    .select("content")
    .where("id", "=", noteId)
    .executeTakeFirst();
  if (note) return note;

  return null;
}

export async function getNotesForBeParents(userId: string, d1: D1Database) {
  const noteList = await db(d1)
    .selectFrom("users")
    .leftJoin("notes", "users.id", "notes.author_id")
    .select(["notes.id", "notes.title"])
    .where("notes.author_id", "=", userId)
    .execute();

  return noteList;
}

export async function getRelatedNotes(noteId: string, d1: D1Database) {
  const noteList = db(d1)
    .selectFrom("notes")
    .select(["id", "title"])
    .where("parent_id", "=", noteId)
    .limit(50)
    .offset(0)
    .execute();

  return noteList;
}
