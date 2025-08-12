"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Don't clear error immediately to prevent flickering

    try {
      const response = await authAPI.login(data.username, data.password);
      const { access_token } = response.data;

      // Store token first with temporary user data
      const tempUser = {
        id: 0,
        email: "",
        username: data.username,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      login(access_token, tempUser);
      localStorage.setItem("access_token", access_token);

      // Now get user info with the token
      const userResponse = await authAPI.getMe();
      const user = userResponse.data;

      // Update user data in store
      useAuthStore.getState().updateUser(user);

      // Clear any previous errors on success
      setError("");

      console.log(
        "Login successful, token stored in both Zustand and localStorage:",
        access_token
      );
      console.log("User data:", user);

      // Verify token is stored
      const authState = useAuthStore.getState();
      console.log("Auth state after login:", {
        isAuthenticated: authState.isAuthenticated,
        hasToken: !!authState.token,
        tokenPreview: authState.token
          ? authState.token.substring(0, 20) + "..."
          : "none",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || "Login failed";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...register("username", { required: "Username is required" })}
                id="username"
                name="username"
                type="text"
                required
                className="form-control mt-1"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                name="password"
                type="password"
                required
                className="form-control mt-1"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-lg py-3 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600 mb-2">Test Account:</p>
            <p className="text-xs text-gray-500">
              Username: <span className="font-mono">admin</span>
            </p>
            <p className="text-xs text-gray-500">
              Password: <span className="font-mono">password123</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
