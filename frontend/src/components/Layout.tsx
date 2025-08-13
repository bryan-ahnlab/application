"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Blog Platform
            </Link>

            <div className="flex items-center space-x-6">
              <Link href="/posts" className="nav-link">
                Posts
              </Link>

              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                  <Link href="/create-post" className="nav-link">
                    Create Post
                  </Link>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">
                      Welcome, {user?.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="nav-link">
                    Login
                  </Link>
                  <Link href="/register" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-300">
            &copy; 2024 Blog Platform. Built with NextJS, FastAPI, and MySQL.
          </p>
        </div>
      </footer>
    </div>
  );
}
