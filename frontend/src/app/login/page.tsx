"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { FormField } from "@/components/ui/FormField";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { register, errors, isLoading, error, onSubmit } = useLogin();

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

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <FormField
              label="Username"
              name="username"
              placeholder="Enter your username"
              error={errors.username?.message}
              required
            >
              <input
                {...register("username", { required: "Username is required" })}
                className="form-control"
                placeholder="Enter your username"
              />
            </FormField>

            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              error={errors.password?.message}
              required
            >
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </FormField>
          </div>

          <ErrorAlert error={error} />

          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="w-full"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

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
