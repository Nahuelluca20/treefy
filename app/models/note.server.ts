import { generateUUID } from "utils/uuid";
import { db } from "~/database/database.server";

interface CreateNote {
  content: string;
  title: string;
  userId: string;
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
