import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  driver: "d1-http",
  // dbCredentials: {
  // wranglerConfigPath: "./wrangler.toml",
  // databaseId: "db-blog",
  // },
  schema: "./app/database/schemas/*",
  out: "./app/database/migrations",
} satisfies Config;
