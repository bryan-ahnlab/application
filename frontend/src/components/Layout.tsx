"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-50 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-xl font-bold text-black dark:text-white"
            >
              Blog Platform
            </Link>

            <div className="flex items-center space-x-6">
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
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Welcome, {user?.username}
                    </span>
                    <button onClick={handleLogout} className="btn btn-sm">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </>
              )}

              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-gray-600 py-8 mt-16 bg-white dark:bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            &copy; 2024 Blog Platform. Built with NextJS, FastAPI, and MySQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
