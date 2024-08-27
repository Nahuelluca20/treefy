import ModeToggle from "../buttons/mode-toggle";
import { SearchField } from "../ui/SearchField";

export default function SideBar() {
  return (
    <aside className="w-full max-w-[253px] flex flex-col gap-4 items-start">
      <h2 className="text-2xl font-semibold">Fernando Nahuel Luca</h2>
      <ModeToggle />
      <SearchField
        label="Search"
        onBlur={function Qa() {}}
        onChange={function Qa() {}}
        onClear={function Qa() {}}
        onFocus={function Qa() {}}
        onFocusChange={function Qa() {}}
        onKeyDown={function Qa() {}}
        onKeyUp={function Qa() {}}
        onSubmit={function Qa() {}}
      />
      <h4 className="text-base font-bold">Recents Posts</h4>
    </aside>
  );
}
