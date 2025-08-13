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
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load post";
        setError(errorMessage);
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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete post";
      setError(errorMessage);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (date.getFullYear() === 1970) {
      return "Recently";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="spinner"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">
          Loading post...
        </span>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 border border-gray-400 flex items-center justify-center">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Post not found</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          The post you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link href="/posts" className="btn btn-primary">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span>Posted {formatDate(post.created_at)}</span>
              {post.updated_at !== post.created_at && (
                <span>Updated {formatDate(post.updated_at)}</span>
              )}
              <span
                className={`badge ${
                  post.is_published ? "bg-gray-600" : "bg-gray-400"
                }`}
              >
                {post.is_published ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          {user && user.id === post.author_id && (
            <div className="flex gap-2 ml-4">
              <Link
                href={`/posts/${post.id}/edit`}
                className="btn btn-primary btn-sm"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="btn btn-secondary btn-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="card">
        <div className="card-body">
          <div className="prose max-w-none">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between items-center">
        <Link href="/posts" className="btn btn-secondary">
          Back to Posts
        </Link>

        {user && (
          <Link href="/dashboard" className="btn btn-primary">
            My Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}
