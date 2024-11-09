import { MoonIcon, SunIcon } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/Button";

export default function ModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <Button
      variant="icon"
      onPress={() =>
        theme === "dark" ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK)
      }
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </Button>
  );
}
