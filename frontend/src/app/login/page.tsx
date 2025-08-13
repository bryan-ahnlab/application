"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";
import { FormField } from "@/components/ui/FormField";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const { register, errors, isLoading, error, onSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md px-6 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <div
          className="card animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="card-body">
            <form onSubmit={onSubmit} className="space-y-6">
              <FormField
                label="Username"
                name="username"
                placeholder="Enter your username"
                error={errors.username?.message}
                required
              >
                <div className="relative">
                  <input
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className="form-control pl-10"
                    placeholder="Enter your username"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
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
              </FormField>

              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                required
              >
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    className="form-control pl-10"
                    placeholder="Enter your password"
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
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
              </FormField>

              <ErrorAlert error={error} />

              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full group"
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div
          className="text-center mt-6 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>

        <div
          className="mt-8 p-4 glass rounded-lg animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <p className="text-xs text-muted-foreground mb-2 font-medium">
            Test Account:
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-muted-foreground">
              Username: <span className="font-mono text-foreground">admin</span>
            </p>
            <p className="text-muted-foreground">
              Password:{" "}
              <span className="font-mono text-foreground">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
