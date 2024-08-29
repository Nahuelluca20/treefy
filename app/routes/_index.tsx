import type { MetaFunction } from "@remix-run/cloudflare";
import { LinkButton } from "~/components/ui/LinkButton";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <LinkButton to="/home" variant="secondary">
        Home
      </LinkButton>
    </div>
  );
}
