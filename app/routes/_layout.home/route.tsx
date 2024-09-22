import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import NotesList from "~/components/notes-list";
import { LinkButton } from "~/components/ui/LinkButton";
import { notesList } from "~/models/note.server";
import { requireUser } from "~/modules/session.server";
import { UserSession } from "~/types/user";
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

  return (
    <>
      <header className="flex flex-col items-start md:items-center md:flex-row gap-y-2 justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="dark:text-gray-400 text-gray-600">
            Find all of your notes here
          </p>
        </div>
        <LinkButton to="/add-note">Add Note</LinkButton>
      </header>

      <section className="mt-5">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <hr className="border dark:border-gray-600 border-gray-300" />
        <NotesList
          notes={notes}
          title="Topics - Entry points for Exploration"
        />
      </section>
    </>
  );
}
