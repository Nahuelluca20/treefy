import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@remix-run/react";

type Note = {
  id: string;
  parent_id?: string | null;
  title: string;
};

type NotesListProps = {
  notes: Note[];
  title: string;
};

const NoteItem = ({ note, notes }: { note: Note; notes: Note[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const childNotes = notes.filter((n) => n.parent_id === note.id);

  return (
    <li className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <div className="flex items-center w-full text-left py-3">
        <button
          type="button"
          className="mr-2 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          <ChevronRight
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        <Link
          to={`/note/${note.id}`}
          className="flex-grow text-left font-medium text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          {note.title}
        </Link>
      </div>

      {isOpen && childNotes.length > 0 && (
        <ul className="ml-3 mt-1 mb-2 space-y-1">
          {childNotes.map((childNote) => (
            <li
              key={childNote.id}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <Link
                to={`/note/${childNote.id}`}
                className="flex items-center w-full text-left py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="h-4 w-4 mr-2" />
                {childNote.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default function NotesList({
  notes,
}: // title,
NotesListProps) {
  return (
    <div className="rounded-lg">
      <ul className="space-y-2 border-b border-gray-200 dark:border-gray-700">
        {notes
          .filter((note) => note.parent_id === null)
          .map((note) => (
            <NoteItem key={note.id} note={note} notes={notes} />
          ))}
      </ul>
    </div>
  );
}
