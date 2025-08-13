"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react";
import Modal from "./ui/Modal";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280); // xl breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="relative sticky top-0 z-50 bg-white border-b border-gray-300 dark:border-gray-600 dark:bg-black">
        <div className="container px-4 mx-auto">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold text-black dark:text-white"
            >
              Application
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <div className="flex items-center space-x-6">
                {isAuthenticated && (
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user?.username}.
                  </span>
                )}

                <Link
                  href="/posts"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                >
                  Posts
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/create-post"
                      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      Create Post
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-0 text-gray-600 bg-transparent border-0 cursor-pointer outline-none dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        fontSize: "14px",
                        lineHeight: "1.4",
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                <ThemeToggle />
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-600 bg-transparent border-0 cursor-pointer outline-none dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "8px",
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-full z-50 w-full bg-white border-t border-gray-300 shadow-lg dark:border-gray-600 dark:bg-black">
            <div className="container px-4 mx-auto">
              <div className="py-2 space-y-2">
                {isAuthenticated && (
                  <div className="py-2 text-sm text-gray-600 border-b border-gray-200 dark:text-gray-300 dark:border-gray-700">
                    Welcome, {user?.username}.
                  </div>
                )}

                <Link
                  href="/posts"
                  className="block py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Posts
                </Link>

                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/create-post"
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Post
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="block p-0 py-2 w-full text-left text-gray-600 bg-transparent border-0 cursor-pointer outline-none dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 0,
                        fontSize: "14px",
                        lineHeight: "1.4",
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block py-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container px-4 py-8 mx-auto">{children}</main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-300 dark:border-gray-600 dark:bg-black">
        <div className="container px-4 mx-auto text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; Bryan. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Global Modal */}
      <Modal />
    </div>
  );
}
