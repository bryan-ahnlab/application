"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            Welcome to Our Blog Platform
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            A modern full-stack application built with NextJS, FastAPI, and
            MySQL. Share your thoughts, read amazing posts, and connect with
            others in our vibrant community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  <span>Go to Dashboard</span>
                </Link>
                <Link href="/posts" className="btn btn-secondary btn-lg">
                  View Posts
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary btn-lg">
                  <span>Sign In</span>
                </Link>
                <Link href="/register" className="btn btn-secondary btn-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <div className="card-body text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Posts</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Share your thoughts and ideas with the community. Create
                engaging content that resonates with readers and builds
                meaningful connections.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow other users, engage with their content, and build
                meaningful connections in our supportive and inclusive
                community.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Explore a wide variety of posts from different authors and
                topics. Find content that interests you and discover new
                perspectives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
