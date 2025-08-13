"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div>
          <div>
            <div>Application</div>
            <div>
              <Link href="/posts">Posts</Link>
              {isAuthenticated ? (
                <Link href="/dashboard">Dashboard</Link>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <h1>Welcome to Application</h1>
        <p>A platform for sharing your thoughts and connecting with others.</p>

        {!isAuthenticated && (
          <div>
            <Link href="/register">Get Started</Link>
            <Link href="/posts">Browse Posts</Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer>
        <div>
          <p>© 2024 Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
