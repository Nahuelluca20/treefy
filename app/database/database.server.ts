import { drizzle } from "drizzle-orm/d1";

export const db = (DB: D1Database) => {
  const db = drizzle(DB);
  return db;
};
