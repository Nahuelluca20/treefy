import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

type Note = {
  id: string;
  parent_id?: string | null;
  title: string;
};

type NotesListProps = {
  notes: Note[];
  title: string;
};

const renderNotes = (notes: Note[], parentId: string | null): JSX.Element[] => {
  return notes
    .filter((note) => note.parent_id === parentId)
    .map((note) => (
      <li key={note.id} className="mt-1">
        <Link
          prefetch="intent"
          to={`/note/${note.id}`}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          {parentId !== null && <ChevronRight className="h-3 w-3 mr-1" />}
          <span>{note.title}</span>
        </Link>
        {renderNotes(notes, note.id).length > 0 && (
          <ul className="ml-4">{renderNotes(notes, note.id)}</ul>
        )}
      </li>
    ));
};

export default function NotesList({ notes, title }: NotesListProps) {
  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
        {title}
      </h1>
      <ul className="space-y-2">{renderNotes(notes, null)}</ul>
    </div>
  );
}
