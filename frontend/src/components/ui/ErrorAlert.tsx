import React from "react";

interface ErrorAlertProps {
  error?: string;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-xs text-red-600">{error}</p>
    </div>
  );
}
