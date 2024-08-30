import { Link } from "@remix-run/react";
import Editor from "~/components/editor/edtior";

export default function Note() {
  return (
    <section className="flex justify-center">
      <Editor />
    </section>
  );
}
