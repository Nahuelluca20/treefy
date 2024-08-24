import { Kysely } from "kysely";
import { D1Dialect } from "kysely-d1";
import { UserTable } from "./tables-interfaces/user-table";

interface Database {
  users: UserTable;
}

export const db = (DB: D1Database) => {
  const db = new Kysely<Database>({ dialect: new D1Dialect({ database: DB }) });
  return db;
};
