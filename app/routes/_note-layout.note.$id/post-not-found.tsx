import { useRouteError } from "@remix-run/react";
import { FileQuestion } from "lucide-react";
import { LinkButton } from "~/components/ui/LinkButton";

export default function NoteNotFound() {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  px-4">
      <div className="text-center">
        <FileQuestion
          className="mx-auto h-24 w-24 text-gray-400 mb-4"
          aria-hidden="true"
        />
        <h1
          className="text-4xl font-bold text-gray-900
        dark:text-white  mb-4"
        >
          {error.data}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {`We couldn't find the post you're looking for. It might have been
          removed or doesn't exist.`}
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Status Code: {error.status}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <LinkButton to="/home">View All Posts</LinkButton>
        </div>
      </div>
    </div>
  );
}
