import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Plus, Search } from "lucide-react";
import { useState } from "react";
import NotesList from "~/components/notes-list";
import { notesList } from "~/models/note.server";
import { requireUser } from "~/modules/session.server";
import type { UserSession } from "~/types/user";
import { checkRateLimit } from "~/utils/check-rate-limit";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const { pathname } = new URL(request.url);
  const KV = context.cloudflare.env.rate_limiter;
  await checkRateLimit(KV, pathname);

  const user: UserSession = await requireUser(context, request);
  if (!user?.id) throw Error("user id not found");

  const list = await notesList(user.id, context.cloudflare.env.DB);
  const meta = [
    { title: `${user.name} | Notes` },
    {
      name: "description",
      content: `All notes written by ${user.id}`,
    },
  ];

  return json({ list, meta });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => data?.meta ?? [];

export default function Home() {
  const { list } = useLoaderData<typeof loader>();
  const notes = list.map((item) => ({
    id: item.id ?? "",
    title: item.title ?? "",
    parent_id: item.parent_id === "" ? null : item.parent_id,
  }));

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Notes
        </h2>
        <Link
          to={"/add-note"}
          className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" /> New Note
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500"
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      <section className="mt-5 pb-10">
        <NotesList
          notes={notes}
          title="Topics - Entry points for Exploration"
        />
      </section>
    </>
  );
}
