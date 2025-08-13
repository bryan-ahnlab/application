"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Our Blog Platform
          </h1>
          <p className="text-base text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern full-stack application built with NextJS, FastAPI, and
            MySQL. Share your thoughts, read amazing posts, and connect with
            others.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="btn btn-primary btn-lg">
                  Go to Dashboard
                </Link>
                <Link href="/posts" className="btn btn-secondary btn-lg">
                  View Posts
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-primary btn-lg">
                  Sign In
                </Link>
                <Link href="/register" className="btn btn-secondary btn-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-3">Create Posts</h3>
              <p className="text-sm text-gray-600">
                Share your thoughts and ideas with the community. Create
                engaging content that resonates with readers.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <p className="text-sm text-gray-600">
                Follow other users, engage with their content, and build
                meaningful connections in our community.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-3">Discover</h3>
              <p className="text-sm text-gray-600">
                Explore a wide variety of posts from different authors and
                topics. Find content that interests you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
