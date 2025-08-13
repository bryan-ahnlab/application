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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-sm text-gray-600">
          Manage your posts and track your blog performance.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <div className="card-body text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Posts
            </h3>
            <p className="text-2xl font-bold text-blue-600">{posts.length}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Published Posts
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {posts.filter((post) => post.is_published).length}
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-body text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Draft Posts
            </h3>
            <p className="text-2xl font-bold text-yellow-600">
              {posts.filter((post) => !post.is_published).length}
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Your Posts</h2>
            <Link href="/create-post" className="btn btn-primary btn-sm">
              Create New Post
            </Link>
          </div>
        </div>

        <div className="card-body">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-4">
                You haven&apos;t created any posts yet.
              </p>
              <Link href="/create-post" className="btn btn-primary btn-sm">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {post.content.substring(0, 120)}...
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>
                          Created:{" "}
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span
                          className={`badge ${
                            post.is_published
                              ? "badge-success"
                              : "badge-warning"
                          }`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="btn btn-secondary btn-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/posts/${post.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
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
