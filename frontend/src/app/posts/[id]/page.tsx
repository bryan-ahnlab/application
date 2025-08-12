"use client";

import { useEffect, useState, use } from "react";
import { postsAPI } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  author_id: number;
  created_at: string;
  updated_at: string;
}

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getById(parseInt(id));
        setPost(response.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await postsAPI.delete(parseInt(id));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-lg">Loading post...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-8">
        <div className="text-lg text-red-600">{error || "Post not found"}</div>
        <Link href="/posts" className="btn btn-primary mt-4">
          Back to Posts
        </Link>
      </div>
    );
  }

  const isAuthor = user?.id === post.author_id;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>
                  Published on {new Date(post.created_at).toLocaleDateString()}
                </span>
                {post.updated_at !== post.created_at && (
                  <span>
                    Updated on {new Date(post.updated_at).toLocaleDateString()}
                  </span>
                )}
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

            {isAuthor && (
              <div className="flex space-x-2">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="btn bg-blue-600 text-white hover:bg-blue-700"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Link
          href="/posts"
          className="btn bg-gray-600 text-white hover:bg-gray-700"
        >
          Back to Posts
        </Link>

        {isAuthor && (
          <Link href="/dashboard" className="btn btn-primary">
            My Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
