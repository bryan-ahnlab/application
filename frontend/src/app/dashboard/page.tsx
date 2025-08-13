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
        <span className="ml-3 text-muted-foreground">Loading...</span>
      </div>
    );
  }

  const publishedCount = posts.filter((post) => post.is_published).length;
  const draftCount = posts.filter((post) => !post.is_published).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            My Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your posts and track your blog performance
          </p>
        </div>
        <Link href="/create-post" className="btn btn-primary btn-sm group">
          <svg
            className="w-4 h-4 group-hover:rotate-90 transition-transform"
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
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card group hover:scale-105 transition-transform duration-300">
          <div className="card-body text-center p-4">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <h3 className="text-xs font-medium text-muted-foreground mb-1">
              Total Posts
            </h3>
            <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
          </div>
        </div>

        <div className="card group hover:scale-105 transition-transform duration-300">
          <div className="card-body text-center p-4">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <h3 className="text-xs font-medium text-muted-foreground mb-1">
              Published
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {publishedCount}
            </p>
          </div>
        </div>

        <div className="card group hover:scale-105 transition-transform duration-300">
          <div className="card-body text-center p-4">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
            <h3 className="text-xs font-medium text-muted-foreground mb-1">
              Drafts
            </h3>
            <p className="text-2xl font-bold text-yellow-600">{draftCount}</p>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Posts</h2>
            <span className="text-sm text-muted-foreground">
              {posts.length} posts
            </span>
          </div>
        </div>

        <div className="card-body p-0">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                You haven&apos;t created any posts yet.
              </p>
              <Link href="/create-post" className="btn btn-primary btn-sm">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  className="group p-4 hover:bg-muted/50 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Post Status Indicator */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          post.is_published ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      ></div>
                    </div>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                        <span
                          className={`badge ${
                            post.is_published
                              ? "badge-success"
                              : "badge-warning"
                          } ml-2 flex-shrink-0`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
                        {post.content.substring(0, 120)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {formatDate(post.created_at)}
                          </span>
                          {post.updated_at !== post.created_at && (
                            <span className="flex items-center">
                              <svg
                                className="w-3 h-3 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                              </svg>
                              Updated {formatDate(post.updated_at)}
                            </span>
                          )}
                        </div>

                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/posts/${post.id}/edit`}
                            className="btn btn-ghost btn-sm text-xs"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/posts/${post.id}`}
                            className="btn btn-primary btn-sm text-xs"
                          >
                            View
                          </Link>
                        </div>
                      </div>
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
