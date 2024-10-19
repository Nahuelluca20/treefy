import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/Button";

export default function ModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <Button
      variant="icon"
      className="cursor-pointer p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
      onPress={() =>
        theme === "dark" ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK)
      }
    >
      <Moon className="dark:hidden h-5 w-5" />
      <Sun className="hidden dark:block h-5 w-5" />
    </Button>
  );
}
