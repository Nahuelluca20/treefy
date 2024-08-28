import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

type Note = {
  id: string;
  parent_id?: string | null;
  title: string;
  content?: string | null;
  topic_id?: string | null;
  date?: string | null;
  author_id?: string | null;
};

const notes: Note[] = [
  { id: "1", title: "Health", parent_id: null },
  { id: "2", title: "Sleep", parent_id: "1" },
  { id: "3", title: "Blood Tests in the Netherlands", parent_id: "1" },
  { id: "4", title: "Olive Oil Suppliers for NL - EU", parent_id: "1" },
  { id: "5", title: "Blueprint", parent_id: "1" },
  { id: "6", title: "Glucose monitor for temporary use", parent_id: "1" },
  { id: "7", title: "Nutrition", parent_id: "1" },
  {
    id: "8",
    title: "Paying 400 euros a month for the Blueprint Stack",
    parent_id: "7",
  },
  { id: "9", title: "Weight Loss", parent_id: "1" },
  { id: "10", title: "PKM & Productivity", parent_id: null },
  { id: "11", title: "Zettelkasten", parent_id: "10" },
  {
    id: "12",
    title: "Listening to audiobooks on double speed all the time",
    parent_id: "10",
  },
  { id: "13", title: "Tech", parent_id: null },
  { id: "14", title: "Kubernetes", parent_id: "13" },
  { id: "15", title: "Containers", parent_id: "13" },
  { id: "16", title: "WASM", parent_id: "13" },
  { id: "17", title: "Consultancy", parent_id: "13" },
  { id: "18", title: "Infrastructure as Code", parent_id: "13" },
  { id: "19", title: "Software Development", parent_id: "13" },
  { id: "20", title: "Linux", parent_id: "13" },
  { id: "21", title: "Azure", parent_id: "13" },
  { id: "22", title: "Career", parent_id: "13" },
  { id: "23", title: "Hardware", parent_id: "13" },
  { id: "24", title: "GitHub", parent_id: "13" },
  { id: "25", title: "Monitoring", parent_id: "13" },
  { id: "26", title: "Nix", parent_id: "13" },
  { id: "27", title: "Things to try", parent_id: "13" },
  { id: "28", title: "Public Speaking", parent_id: null },
  { id: "29", title: "Online Presence", parent_id: null },
  { id: "30", title: "writing", parent_id: null },
];

const renderNotes = (parentId: string | null) => {
  return notes
    .filter((note) => note.parent_id === parentId)
    .map((note) => (
      <li key={note.id} className="mt-1">
        <Link
          to={`/note/${note.id}`}
          className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          {parentId !== null && <ChevronRight className="h-3 w-3 mr-1" />}
          <span>{note.title}</span>
        </Link>
        {renderNotes(note.id).length > 0 && (
          <ul className="ml-4">{renderNotes(note.id)}</ul>
        )}
      </li>
    ));
};

export default function NotesList() {
  return (
    <div className="p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">
        Topics - Entry points for Exploration
      </h1>
      <ul className="space-y-2">{renderNotes(null)}</ul>
    </div>
  );
}
