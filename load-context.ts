import type { PlatformProxy } from "wrangler";

// When using `wrangler.toml` to configure bindings,
// `wrangler types` will generate types for those bindings
// into the global `Env` interface.
// Need this empty interface so that typechecking passes
// even if no `wrangler.toml` exists.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Env {
  DB: D1Database;
  treefy_kv_auth: KVNamespace;
  rate_limiter: KVNamespace;
  COOKIE_SESSION_SECRET: string;
  ENVIROMENT: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  RATE_LIMITER: string;
  TOKEN_CF_IMAGES: string;
  ACCOUNT_ID: string;
  IMAGE_ACCOUNT_HASH: string;
}

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}
