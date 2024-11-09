import { Outlet, useNavigation, useParams } from "@remix-run/react";
import NoteFallBackUI from "~/components/fallback-ui/note-fallback-ui";
import Navbar from "~/components/navigation/nav-bar";

export default function NoteLayout() {
  const { id } = useParams();
  const navigation = useNavigation();

  if (
    navigation.state === "loading" &&
    navigation.location.pathname.startsWith("/note")
  ) {
    return (
      <section>
        <Navbar />
        <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[750px] mx-auto mt-5 px-5 md:px-0">
          <NoteFallBackUI />
        </div>
      </section>
    );
  }

  return (
    <section>
      <Navbar />
      <div className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[750px] mx-auto mt-5 px-5 md:px-0">
        <Outlet key={id} />
      </div>
    </section>
  );
}
