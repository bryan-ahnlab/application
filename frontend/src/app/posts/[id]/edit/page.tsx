"use client";

import { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";
import { postsAPI } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

interface EditPostFormData {
  title: string;
  content: string;
  is_published: boolean;
}

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { id } = use(params);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditPostFormData>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getById(parseInt(id));
        const post = response.data;

        // Check if user is the author
        if (post.author_id !== user?.id) {
          router.push("/dashboard");
          return;
        }

        setValue("title", post.title);
        setValue("content", post.content);
        setValue("is_published", post.is_published);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Failed to load post");
      }
    };

    fetchPost();
  }, [id, user?.id, router, setValue]);

  const onSubmit = async (data: EditPostFormData) => {
    setIsLoading(true);
    setError("");

    try {
      await postsAPI.update(parseInt(id), data);
      router.push(`/posts/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <p className="text-gray-600">Update your post content and settings.</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              id="title"
              name="title"
              type="text"
              className="form-control"
              placeholder="Enter your post title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 50,
                  message: "Content must be at least 50 characters",
                },
              })}
              id="content"
              name="content"
              rows={12}
              className="form-control"
              placeholder="Write your post content here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register("is_published")}
              id="is_published"
              name="is_published"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="is_published"
              className="ml-2 block text-sm text-gray-900"
            >
              Publish this post
            </label>
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="btn bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
