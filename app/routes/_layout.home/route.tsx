import NotesList from "~/components/notes-list";
import { LinkButton } from "~/components/ui/LinkButton";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="dark:text-gray-400 text-gray-600">
            Find all of your notes here
          </p>
        </div>
        <LinkButton to="/note">Add Note</LinkButton>
      </header>

      <section className="mt-5">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <hr className="border dark:border-gray-600 border-gray-300" />
        <NotesList />
      </section>
    </>
  );
}
