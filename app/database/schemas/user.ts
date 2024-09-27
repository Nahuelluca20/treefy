import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  profile_image: text("profile_image"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
