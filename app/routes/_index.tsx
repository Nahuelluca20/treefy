import { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { PenLine, BookOpen, Share2, Menu, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { LinkButton } from "~/components/ui/LinkButton";
import { readUser } from "~/modules/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await readUser(context, request);
  if (user) return true;

  return false;
}

export const meta: MetaFunction = () => [
  { title: `Treefy` },
  {
    name: "description",
    content: `Clarity in Your Thoughts, Clarity in Your Notes`,
  },
];
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200">
        <Link className="flex items-center justify-center" to="#">
          <PenLine className="h-6 w-6 text-blue-600 mr-2" />
          <span className="font-bold text-xl text-gray-900">Treefy</span>
        </Link>
        <button
          className="ml-auto lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex absolute top-16 left-0 right-0 bg-white border-b border-gray-200 lg:border-none lg:static flex-col lg:flex-row items-center gap-4 p-4 lg:p-0 lg:ml-auto`}
        >
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
            to="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
            to="#pricing"
          >
            Pricing
          </Link>
          <LinkButton
            className="text-sm font-medium"
            to={user ? "/home" : "/login"}
          >
            Login
          </LinkButton>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y2">
                <h5 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-gray-900">
                  Clarity in Your Thoughts, Clarity in Your Notes
                </h5>
                <p className="mx-auto max-w-[704px] text-gray-500 text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {`"Clear thinking becomes clear writing; one can't exist without
                  the other."`}
                </p>
                <p className="text-sm text-gray-496">- William Zinsser</p>
              </div>
              <div className="w-full max-w-sm space-y2">
                <form className="flex flex-col sm:flex-row space-y2 sm:space-y-0 sm:space-x-2">
                  <input
                    className="flex h-6 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-[200px]">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-496">
                  14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-white"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Intuitive Organization
                </h3>
                <p className="text-gray-500">
                  Organize your notes easily and efficiently with our intuitive
                  system.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <PenLine className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Powerful Editor
                </h3>
                <p className="text-gray-500">
                  Write and edit your notes with a feature-rich, easy-to-use
                  editor.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Share2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  Note Take System
                </h3>
                <p className="text-gray-500">Creates a system of notes. </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center lg:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Inspired by Effective Note-Taking
                </h2>
                <p className="mx-auto lg:mx-0 max-w-[700px] text-gray-500 text-lg md:text-xl/relaxed">
                  {`Our app is inspired by proven note-taking techniques that
          enhance learning and retention. We've incorporated insights
          from educational experts to create a tool that not only stores
          your notes but also improves your thinking process.`}
                </p>
                <Link
                  to="https://www.youtube.com/watch?v=Xw3SkhB4dMk&list=PLuC8-mIR3cdFFnecmjiGwknjtMAnrCzh1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-blue-600 text-white hover:bg-blue-700 h-10 py-2 px-4"
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Inspiration Video
                </Link>
              </div>
              <div className="w-full max-w-sm lg:max-w-none lg:w-[400px] h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  width="400"
                  height="300"
                  src="https://www.youtube.com/embed/Xw3SkhB4dMk"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Start Writing Clearly Today
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of writers who are already improving their
                writing process with Treefy.
              </p>
              <button className="bg-blue-600 text-white rounded-md px-6 py-3 text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto">
                Try Free for 14 Days
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t border-gray-200">
        <div className="container px-4 md:px-6 mx-auto">
          <p className="text-center text-sm text-gray-500">
            © 2023 Treefy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
