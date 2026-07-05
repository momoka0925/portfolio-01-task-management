import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}

export function Textarea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}
