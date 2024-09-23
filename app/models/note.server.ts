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
  const start = Date.now();

  const noteList = await db(d1)
    .selectFrom("users")
    .leftJoin("notes", "users.id", "notes.author_id")
    .select(["notes.id", "notes.title", "notes.parent_id"])
    .where("notes.author_id", "=", userId)
    .execute();

  const duration = Date.now() - start;
  console.log(`notesList query took ${duration}ms`);

  return noteList;
}

export async function getNoteById(noteId: string, d1: D1Database) {
  const start = Date.now();

  const note = await db(d1)
    .selectFrom("notes")
    .select(["content", "author_id", "public_note", "title"])
    .where("id", "=", noteId)
    .executeTakeFirst();

  const duration = Date.now() - start;
  console.log(`getNoteById query took ${duration}ms`);

  if (note) return note;

  return null;
}

export async function getAllNoteById(noteId: string, d1: D1Database) {
  const note = db(d1)
    .selectFrom("notes")
    .select(["content", "author_id", "title", "parent_id", "public_note"])
    .where("id", "=", noteId)
    .executeTakeFirst();
  if (note) return note;

  return null;
}

export async function getNotesForBeParents(userId: string, d1: D1Database) {
  const noteList = db(d1)
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

export async function deleteNote(noteId: string, d1: D1Database) {
  const deletedNote = await db(d1)
    .deleteFrom("notes")
    .where("notes.id", "=", noteId)
    .executeTakeFirst();
  return deletedNote.numDeletedRows;
}

export interface UpdateNote {
  content?: string;
  title?: string;
  public_note?: boolean;
  parent_id?: string;
}

export async function updateNote(
  noteData: UpdateNote,
  noteId: string,
  d1: D1Database
) {
  try {
    const updatedNote = await db(d1)
      .updateTable("notes")
      .set(noteData)
      .where("id", "=", noteId)
      .returning(["id"])
      .executeTakeFirst();

    if (!updatedNote?.id) {
      throw new Error("No note found to update");
    }

    return updatedNote.id;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Could not update note");
  }
}

export async function getPublicNotesByUserId(userId: string, d1: D1Database) {
  const publicNotes = await db(d1)
    .selectFrom("notes")
    .select(["id", "title", "parent_id", "public_note"])
    .where("author_id", "=", userId)
    .where("public_note", "=", true)
    .execute();

  return publicNotes;
}

export async function getUsernameById(userId: string, d1: D1Database) {
  const user = await db(d1)
    .selectFrom("users")
    .select("name")
    .where("id", "=", userId)
    .executeTakeFirst();

  return user?.name ?? "User Unkwon";
}
