import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { postsAPI } from "@/lib/api";
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

interface CreatePostFormData {
  title: string;
  content: string;
  is_published: boolean;
}

interface EditPostFormData {
  title: string;
  content: string;
  is_published: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll();
      setPosts(response.data);
    } catch (error: unknown) {
      console.error("Failed to fetch posts:", error);
      // Handle error gracefully without breaking the UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    loading,
    refetch: fetchPosts,
  };
};

export const useUserPosts = (userId?: number) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    try {
      if (userId) {
        const response = await postsAPI.getByUser(userId);
        setPosts(response.data);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch user posts:", error);
      // Handle error gracefully without breaking the UI
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  return {
    posts,
    loading,
    refetch: fetchUserPosts,
  };
};

export const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>();

  const onSubmit = async (data: CreatePostFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await postsAPI.create(data);
      router.push(`/posts/${response.data.id}`);
    } catch (err: unknown) {
      // Better error handling
      let errorMessage = "Failed to create post";
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as any).response;
        if (response?.data?.detail) {
          if (Array.isArray(response.data.detail)) {
            const validationErrors = response.data.detail
              .map((error: any) => {
                if (typeof error === "string") {
                  return error;
                } else if (
                  error &&
                  typeof error === "object" &&
                  "msg" in error
                ) {
                  return error.msg;
                } else if (
                  error &&
                  typeof error === "object" &&
                  "message" in error
                ) {
                  return error.message;
                }
                return "Invalid field";
              })
              .join(", ");
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof response.data.detail === "string") {
            errorMessage = response.data.detail;
          } else {
            errorMessage = "Invalid input data. Please check your information.";
          }
        } else if (response?.status === 401) {
          errorMessage = "Authentication required. Please log in again.";
        } else if (response?.status === 403) {
          errorMessage = "You don't have permission to create posts.";
        } else if (response?.status === 422) {
          errorMessage = "Invalid input data. Please check your information.";
        } else if (response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Ensure errorMessage is always a string
      errorMessage = String(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    errors,
    isLoading,
    error,
    onSubmit: handleSubmit(onSubmit),
  };
};

export const useEditPost = (postId: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);
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
        const response = await postsAPI.getById(postId);
        const postData = response.data;
        setPost(postData);

        setValue("title", postData.title);
        setValue("content", postData.content);
        setValue("is_published", postData.is_published);
      } catch (err: unknown) {
        // Better error handling
        let errorMessage = "Failed to load post";
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as any).response;
          if (response?.data?.detail) {
            if (typeof response.data.detail === "string") {
              errorMessage = response.data.detail;
            } else {
              errorMessage = "Failed to load post data.";
            }
          } else if (response?.status === 404) {
            errorMessage = "Post not found.";
          } else if (response?.status === 401) {
            errorMessage = "Authentication required. Please log in again.";
          } else if (response?.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }

        // Ensure errorMessage is always a string
        errorMessage = String(errorMessage);
        setError(errorMessage);
      }
    };

    fetchPost();
  }, [postId, setValue]);

  const onSubmit = async (data: EditPostFormData) => {
    setIsLoading(true);
    setError("");

    try {
      await postsAPI.update(postId, data);
      router.push(`/posts/${postId}`);
    } catch (err: unknown) {
      // Better error handling
      let errorMessage = "Failed to update post";
      if (err && typeof err === "object" && "response" in err) {
        const response = (err as any).response;
        if (response?.data?.detail) {
          if (Array.isArray(response.data.detail)) {
            const validationErrors = response.data.detail
              .map((error: any) => {
                if (typeof error === "string") {
                  return error;
                } else if (
                  error &&
                  typeof error === "object" &&
                  "msg" in error
                ) {
                  return error.msg;
                } else if (
                  error &&
                  typeof error === "object" &&
                  "message" in error
                ) {
                  return error.message;
                }
                return "Invalid field";
              })
              .join(", ");
            errorMessage = `Validation error: ${validationErrors}`;
          } else if (typeof response.data.detail === "string") {
            errorMessage = response.data.detail;
          } else {
            errorMessage = "Invalid input data. Please check your information.";
          }
        } else if (response?.status === 401) {
          errorMessage = "Authentication required. Please log in again.";
        } else if (response?.status === 403) {
          errorMessage = "You don't have permission to update this post.";
        } else if (response?.status === 404) {
          errorMessage = "Post not found.";
        } else if (response?.status === 422) {
          errorMessage = "Invalid input data. Please check your information.";
        } else if (response?.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }

      // Ensure errorMessage is always a string
      errorMessage = String(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    errors,
    isLoading,
    error,
    post,
    onSubmit: handleSubmit(onSubmit),
  };
};

export const useDeletePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setIsLoading(true);
    try {
      await postsAPI.delete(postId);
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Failed to delete post:", err);
      // Handle error gracefully - could show a toast notification here
      alert("Failed to delete post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deletePost,
    isLoading,
  };
};
