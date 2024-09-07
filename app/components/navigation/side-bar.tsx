import ModeToggle from "../buttons/mode-toggle";
// import { SearchField } from "../ui/SearchField";

interface ISideBar {
  userName: string | null;
}

export default function SideBar({ userName }: ISideBar) {
  return (
    <aside className="mb-12 md:mb-20 w-full md:max-w-[750px] mx-auto flex flex-col gap-4 items-start ">
      <div className="w-full flex gap-4 justify-between md:items-start">
        <h2 className="text-2xl font-semibold">{userName ?? "User"}</h2>
        <ModeToggle />
      </div>
      {/* <SearchField
        label="Search"
        onBlur={function Qa() {}}
        onChange={function Qa() {}}
        onClear={function Qa() {}}
        onFocus={function Qa() {}}
        onFocusChange={function Qa() {}}
        onKeyDown={function Qa() {}}
        onKeyUp={function Qa() {}}
        onSubmit={function Qa() {}}
      /> */}
      {/* <h4 className="text-base font-bold">Recents Posts</h4> */}
    </aside>
  );
}
