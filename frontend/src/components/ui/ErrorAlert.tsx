import React from "react";

interface ErrorAlertProps {
  error?: string;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div
      className="p-4 bg-red-50 border border-red-200 rounded-md animate-fade-in dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="w-5 h-5 text-red-400 dark:text-red-300"
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
        <div className="ml-3">
          <p className="text-sm text-red-800 dark:text-red-200 font-medium">
            {error}
          </p>
        </div>
      </div>
    </div>
  );
}
