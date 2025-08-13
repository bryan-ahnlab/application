"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { FormField } from "@/components/ui/FormField";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { register, errors, isLoading, error, onSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                label="Username"
                name="username"
                placeholder="Enter your username"
                error={errors.username?.message}
                required
              >
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                />
              </FormField>

              <ErrorAlert error={error} />

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-md">
          <p className="text-xs text-gray-600 mb-2">Test Account:</p>
          <p className="text-xs text-gray-500">
            Username: <span className="font-mono">admin</span>
          </p>
          <p className="text-xs text-gray-500">
            Password: <span className="font-mono">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
