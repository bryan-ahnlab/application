"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { postsAPI } from "@/lib/api";

interface Post {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  author_id: number;
  created_at: string;
  updated_at: string;
}

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const response = await postsAPI.getByUser(user.id);
        setPosts(response.data);
      } catch (error: unknown) {
        console.error("Failed to fetch user posts:", error);
        // Handle error gracefully without breaking the UI
        setPosts([]); // Set empty array to prevent UI errors
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (date.getFullYear() === 1970) {
      return "Recently";
    }
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} months ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">
          Loading...
        </span>
      </div>
    );
  }

  const publishedCount = posts.filter((post) => post.is_published).length;
  const draftCount = posts.filter((post) => !post.is_published).length;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            My Dashboard
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Manage your posts and track your blog performance
          </p>
        </div>
        <Link href="/create-post" className="btn btn-primary btn-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          New Post
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body text-center p-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-600 border border-gray-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Total Posts
            </h3>
            <p className="text-3xl font-bold text-black dark:text-white">
              {posts.length}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center p-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-600 border border-gray-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Published
            </h3>
            <p className="text-3xl font-bold text-black dark:text-white">
              {publishedCount}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center p-6">
            <div className="w-12 h-12 mx-auto mb-3 bg-gray-600 border border-gray-400 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
              Drafts
            </h3>
            <p className="text-3xl font-bold text-black dark:text-white">
              {draftCount}
            </p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Posts</h2>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {posts.length} posts
            </span>
          </div>
        </div>

        <div className="card-body p-0">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-600 border border-gray-400 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-3">No posts yet</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start writing your first blog post to share your thoughts with
                the world.
              </p>
              <Link href="/create-post" className="btn btn-primary">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                          {post.title}
                        </h3>
                        <span
                          className={`badge ${
                            post.is_published ? "bg-gray-600" : "bg-gray-400"
                          }`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {post.content}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Updated {formatDate(post.updated_at)}
                      </p>
                    </div>
                    <div className="flex gap-3 ml-6">
                      <Link
                        href={`/posts/${post.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="btn btn-primary btn-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
