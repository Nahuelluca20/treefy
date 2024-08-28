import ModeToggle from "../buttons/mode-toggle";
import { SearchField } from "../ui/SearchField";

interface ISideBar {
  userName: string | null;
}

export default function SideBar({ userName }: ISideBar) {
  return (
    <aside className="fixed w-full max-w-[19 0px] xl:max-w-[253px] flex flex-col gap-4 items-start">
      <h2 className="text-2xl font-semibold">{userName ?? "User"}</h2>
      <ModeToggle />
      <SearchField
        className="w-full"
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
