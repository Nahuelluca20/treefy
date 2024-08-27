import { Button } from "~/components/ui/Button";

export default function Home() {
  return (
    <section className="max-w-[750px] w-full mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Home</h1>
          <p className="dark:text-gray-400 text-gray-600">
            Find all of your notes here
          </p>
        </div>
        <Button>Create Note</Button>
      </header>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <hr className="border dark:border-gray-600 border-gray-300" />
      </section>
    </section>
  );
}
