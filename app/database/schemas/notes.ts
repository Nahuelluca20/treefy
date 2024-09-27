import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  parent_id: text("parent_id"),
  title: text("title"),
  content: text("content").notNull(),
  date: text("date").notNull(),
  public_note: integer("public_note", { mode: "boolean" }).default(false),
  author_id: text("author_id").notNull(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
