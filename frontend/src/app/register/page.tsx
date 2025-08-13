"use client";

import Link from "next/link";
import { useRegister } from "@/hooks/useAuth";
import { FormField } from "@/components/ui/FormField";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const { register, errors, isLoading, error, onSubmit, watch } = useRegister();
  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md px-4 py-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
            Join our community
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Create your account to get started
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                required
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    name="email"
                    type="email"
                    className="form-control flex-1"
                    placeholder="Enter your email"
                  />
                </div>
              </FormField>

              <FormField
                label="Username"
                name="username"
                placeholder="Choose a username"
                error={errors.username?.message}
                required
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                    })}
                    name="username"
                    className="form-control flex-1"
                    placeholder="Choose a username"
                  />
                </div>
              </FormField>

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                required
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    name="password"
                    type="password"
                    className="form-control flex-1"
                    placeholder="Create a password"
                  />
                </div>
              </FormField>

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                required
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 text-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    name="confirmPassword"
                    type="password"
                    className="form-control flex-1"
                    placeholder="Confirm your password"
                  />
                </div>
              </FormField>

              <ErrorAlert error={error} />

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create account</span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
