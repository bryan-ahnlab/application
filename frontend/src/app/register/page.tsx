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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                label="Email address"
                name="email"
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                required
              >
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </FormField>

              <FormField
                label="Username"
                name="username"
                placeholder="Choose a username"
                error={errors.username?.message}
                required
              >
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className="form-control"
                  placeholder="Choose a username"
                />
              </FormField>

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                required
              >
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                />
              </FormField>

              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                error={errors.confirmPassword?.message}
                required
              >
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                />
              </FormField>

              <ErrorAlert error={error} />

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
