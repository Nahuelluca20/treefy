import { eq, and } from "drizzle-orm";
import { db } from "~/database/database.server";
import { generateUUID } from "utils/uuid";
import { notes } from "~/database/schemas/notes";
import { users } from "~/database/schemas/user";

interface CreateNote {
  content: string;
  title: string;
  userId: string;
  public_note?: boolean;
  parent_id: string;
}

export async function createNote(noteData: CreateNote, env: D1Database) {
  const note = await db(env)
    .insert(notes)
    .values({
      id: generateUUID(),
      title: noteData.title,
      parent_id: noteData.parent_id,
      content: noteData.content,
      public_note: noteData.public_note,
      date: String(Date.now()),
      author_id: noteData.userId,
    })
    .returning({ id: notes.id });

  if (!note[0]?.id) {
    throw Error("Something went wrong");
  }

  return note[0].id;
}

export async function notesList(userId: string, env: D1Database) {
  const noteList = await db(env)
    .select({
      id: notes.id,
      title: notes.title,
      parent_id: notes.parent_id,
    })
    .from(notes)
    .leftJoin(users, eq(users.id, notes.author_id))
    .where(eq(notes.author_id, userId));

  return noteList;
}

export async function getNoteById(noteId: string, env: D1Database) {
  const note = await db(env)
    .select({
      content: notes.content,
      author_id: notes.author_id,
      public_note: notes.public_note,
      title: notes.title,
    })
    .from(notes)
    .where(eq(notes.id, noteId))
    .limit(1);

  return note[0] || null;
}

export async function getAllNoteById(noteId: string, env: D1Database) {
  const note = await db(env)
    .select({
      content: notes.content,
      author_id: notes.author_id,
      title: notes.title,
      parent_id: notes.parent_id,
      public_note: notes.public_note,
    })
    .from(notes)
    .where(eq(notes.id, noteId))
    .limit(1);

  return note[0] || null;
}

export async function getNotesForBeParents(userId: string, env: D1Database) {
  const noteList = await db(env)
    .select({
      id: notes.id,
      title: notes.title,
      parentId: notes.parent_id,
    })
    .from(notes)
    .leftJoin(users, eq(users.id, notes.author_id))
    .where(eq(notes.author_id, userId));

  return noteList;
}

export async function getRelatedNotes(noteId: string, env: D1Database) {
  const noteList = await db(env)
    .select({
      id: notes.id,
      title: notes.title,
    })
    .from(notes)
    .where(eq(notes.parent_id, noteId))
    .limit(50);

  return noteList;
}

export async function deleteNote(noteId: string, env: D1Database) {
  const result = await db(env).delete(notes).where(eq(notes.id, noteId));

  return result;
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
  env: D1Database
) {
  try {
    const result = await db(env)
      .update(notes)
      .set(noteData)
      .where(eq(notes.id, noteId))
      .returning({ id: notes.id });

    if (!result[0]?.id) {
      throw new Error("No note found to update");
    }

    return result[0].id;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Could not update note");
  }
}

export async function getPublicNotesByUserId(userId: string, env: D1Database) {
  const publicNotes = await db(env)
    .select({
      id: notes.id,
      title: notes.title,
      parent_id: notes.parent_id,
      public_note: notes.public_note,
    })
    .from(notes)
    .where(and(eq(notes.author_id, userId), eq(notes.public_note, true)));

  return publicNotes;
}

export async function getUsernameById(userId: string, env: D1Database) {
  const user = await db(env)
    .select({ name: users.name })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return user[0]?.name ?? "User Unknown";
}
