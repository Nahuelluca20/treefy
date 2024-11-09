import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import {
  MenuIcon,
  ArrowRightIcon,
  XIcon,
  LeafIcon,
  PenIcon,
  ShareIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import ModeToggle from "~/components/buttons/mode-toggle";
import { Button } from "~/components/ui/Button";
import { readUser } from "~/modules/session.server";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const user = await readUser(context, request);
  if (user) return true;

  return false;
}

export const meta: MetaFunction = () => [
  { title: "Treefy" },
  {
    name: "description",
    content: "Clarity in Your Thoughts, Clarity in Your Notes",
  },
];
export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useLoaderData<typeof loader>();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <header
        className={`fixed w-full transition-all duration-300 z-50 ${
          isScrolled
            ? "bg-white dark:bg-gray-900 shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LeafIcon className="w-6 h-6 text-green-500" />
            <span className="text-xl font-bold text-green-500">treefy</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="#features"
                  className="hover:text-green-500 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  to="#about"
                  className="hover:text-green-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#contact"
                  className="hover:text-green-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link
              to={user ? "/home" : "/login"}
              className="hidden md:inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              Login
            </Link>
            <Button
              variant="icon"
              className="md:hidden"
              onPress={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="#features"
                    className="block hover:text-green-500 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#about"
                    className="block hover:text-green-500 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    className="block hover:text-green-500 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to={user ? "/home" : "/login"}
                    className="block text-green-500 font-semibold hover:underline"
                    onClick={toggleMobileMenu}
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Clarity in Your Thoughts,
              <br />
              Clarity in Your Notes
            </h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Organize your ideas, share your knowledge, and grow your
              understanding with Treefy.
            </p>
            <Link
              to={user ? "/home" : "/login"}
              className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose Treefy?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <PenIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Intuitive Note-Taking
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Capture your thoughts effortlessly with our user-friendly
                  interface.
                </p>
              </div>
              <div className="text-center">
                <ShareIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Collaborate and share your notes with teammates in real-time.
                </p>
              </div>
              <div className="text-center">
                <LeafIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Grow Your Knowledge
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Organize and connect your ideas to see the bigger picture.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-green-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">About Treefy</h2>
            <blockquote className="text-2xl italic mb-8 max-w-3xl mx-auto">
              "Clear thinking becomes clear writing; one can't exist without the
              other."
            </blockquote>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              - William Zinsser
            </p>
            <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
              At Treefy, we believe in the power of clear thinking and effective
              note-taking. Our mission is to provide you with the tools to
              organize your thoughts, enhance your productivity, and share your
              knowledge with the world.
            </p>
          </div>
        </section>

        <section id="contact" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Have questions or feedback? We'd love to hear from you!
            </p>
            <Link
              to="mailto:nahueldevelop@gmail.com"
              className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Inspired by{" "}
              <Link
                to="https://www.youtube.com/watch?v=Xw3SkhB4dMk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                Everything Starts with a Note-taking System
              </Link>{" "}
              by Mischa van den Burg
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Treefy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
