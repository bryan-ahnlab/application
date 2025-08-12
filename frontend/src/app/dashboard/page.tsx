"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { postsAPI } from "@/lib/api";
import Link from "next/link";

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
      try {
        if (user?.id) {
          const response = await postsAPI.getByUser(user.id);
          setPosts(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600">
          Manage your posts and track your activity.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-600">{posts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Published Posts</h3>
          <p className="text-3xl font-bold text-green-600">
            {posts.filter((post) => post.is_published).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Draft Posts</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {posts.filter((post) => !post.is_published).length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Posts</h2>
            <Link href="/create-post" className="btn btn-primary">
              Create New Post
            </Link>
          </div>
        </div>

        <div className="p-6">
          {posts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                You haven't created any posts yet.
              </p>
              <Link href="/create-post" className="btn btn-primary">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {post.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                          Created:{" "}
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            post.is_published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="btn bg-gray-600 text-white hover:bg-gray-700 px-3 py-1 text-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/posts/${post.id}`}
                        className="btn bg-blue-600 text-white hover:bg-blue-700 px-3 py-1 text-sm"
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
