import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Button } from "~/components/ui/Button";

export default function ModeToggle() {
  const [theme, setTheme] = useTheme();

  return (
    <Button
      variant="icon"
      className="cursor-pointer"
      onPress={() =>
        theme === "dark" ? setTheme(Theme.LIGHT) : setTheme(Theme.DARK)
      }
    >
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
