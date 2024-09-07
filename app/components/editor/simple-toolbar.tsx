import { Edit, Trash2 } from "lucide-react";
import { LinkButton } from "../ui/LinkButton";

export default function SimpleNoteToolbar() {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full shadow-lg p-2 flex items-center space-x-2">
        <LinkButton
          to="edit-note"
          variant="icon"
          className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          aria-label="Edit note"
        >
          <Edit className="h-5 w-5" />
        </LinkButton>
        <button
          // onClick={onDelete}
          className="p-2 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors duration-200"
          aria-label="Delete note"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
