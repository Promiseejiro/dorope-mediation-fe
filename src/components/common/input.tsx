import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  id: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "textarea";
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  touched?: boolean;
  className?: string;
  placeHolderClassName?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  showPasswordToggle?: boolean;
  name?: string;
  rows?: number;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  error,
  touched,
  className = "",
  placeHolderClassName = "",
  value,
  onChange,
  onBlur,
  disabled = false,
  showPasswordToggle = false,
  name,
  rows = 4,
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={twMerge(`mb-6 ${className}`)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-foreground mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            required={required}
            className={twMerge(
              `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                error && touched ? "border-red-500" : "border-gray-300"
              } ${placeHolderClassName}`,
            )}
            disabled={disabled}
          />
        ) : (
          <input
            name={name}
            id={id}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            className={twMerge(
              `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                error && touched ? "border-red-500" : "border-gray-300"
              } ${showPasswordToggle ? "pr-10" : ""} ${placeHolderClassName}`,
            )}
            disabled={disabled}
            {...props}
          />
        )}

        {type === "password" && showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash text-sm"></i>
            ) : (
              <i className="fas fa-eye text-sm"></i>
            )}
          </button>
        )}
      </div>
      {error && touched && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
