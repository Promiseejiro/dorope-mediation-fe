// components/ui/Input.tsx
import React from "react";

interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  touched,
  className = "",
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
