import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
// import { InstagramAccountTable } from "./tables-interfaces/instagram-account-table";
// import { UserTable } from "./tables-interfaces/user-table";
// import { InstagramPostTable } from "./tables-interfaces/instagram-posts-table";

interface Database {
  // instagram_account: InstagramAccountTable;
  // instagram_posts: InstagramPostTable;
  // users: UserTable;
}

export const db = (DB: D1Database) => {
  const db = new Kysely<Database>({ dialect: new D1Dialect({ database: DB }) });
  return db;
};
