"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to Our Blog Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern full-stack application built with NextJS, FastAPI, and
            MySQL. Share your thoughts, read amazing posts, and connect with
            others.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/posts"
                  className="btn bg-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-3"
                >
                  View Posts
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="btn bg-gray-600 text-white hover:bg-gray-700 text-lg px-8 py-3"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Create Posts</h3>
            <p className="text-gray-600">
              Share your thoughts and ideas with the community. Create engaging
              content that resonates with readers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <p className="text-gray-600">
              Follow other users, engage with their content, and build
              meaningful connections in our community.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Discover</h3>
            <p className="text-gray-600">
              Explore a wide variety of posts from different authors and topics.
              Find content that interests you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
