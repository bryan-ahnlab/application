import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  rows?: number;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required = false,
  rows,
  children,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      {children ||
        (type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            rows={rows || 4}
            required={required}
            className="form-control"
            placeholder={placeholder}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            required={required}
            className="form-control"
            placeholder={placeholder}
          />
        ))}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
