"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="text-center py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6">
          Welcome to Blog Platform
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          A modern platform for sharing your thoughts and connecting with others
          through meaningful content.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/posts" className="btn btn-primary">
            Browse Posts
          </Link>
          <Link href="/register" className="btn btn-secondary">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600 border border-gray-400 flex items-center justify-center">
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
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
                Easy Writing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and edit your posts with our intuitive editor designed
                for writers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600 border border-gray-400 flex items-center justify-center">
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
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
                Community
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with other writers and readers in our growing community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600 border border-gray-400 flex items-center justify-center">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
                Fast & Reliable
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with modern technology for speed and reliability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Ready to Start Writing?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Join our community and start sharing your stories with the world.
          </p>
          <Link href="/register" className="btn btn-primary">
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
}
