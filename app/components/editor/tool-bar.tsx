import { Save, Globe, Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Select, SelectItem } from "../ui/Select";
import { ParentNotes } from "~/types/notes";

interface INoteToolbar {
  onParentChange: (id: string) => void;
  handleTogglePublic: (isPublic: boolean) => void;
  isPublic: boolean;
  parentNotes: ParentNotes;
}

export default function NoteToolbar({
  onParentChange,
  handleTogglePublic,
  isPublic,
  parentNotes = [],
}: INoteToolbar) {
  const availableParentNotes = parentNotes.filter((note) => !note.parentId);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full shadow-lg p-2 flex items-center space-x-2">
        <button
          type="submit"
          name="intent"
          value="save"
          className="p-2 rounded-full text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          aria-label="Save note"
        >
          <Save className="h-5 w-5" />
        </button>

        <Button
          variant="icon"
          onPress={() => handleTogglePublic(!isPublic)}
          className={`px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 ${
            isPublic
              ? "bg-indigo-600 text-white dark:text-white hover:bg-indigo-700"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
          aria-label={isPublic ? "Make note private" : "Make note public"}
        >
          <span className="flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">
              {isPublic ? "Public" : "Private"}
            </span>
          </span>
        </Button>
        <div className="relative">
          <Select
            className="rounded-full"
            placeholder="No parent"
            aria-label={"select parent note"}
            onSelectionChange={(e) => onParentChange(e as string)}
          >
            {availableParentNotes.map((note) => (
              <SelectItem aria-label={note.title} key={note.id} id={note.id}>
                {note.title}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button
          variant="icon"
          type="submit"
          name="intent"
          value="delete"
          className="p-2 rounded-full text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
          aria-label="Delete note"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
