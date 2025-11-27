// components/ui/Checkbox.tsx
import React from "react";

interface CheckboxProps {
  id: string;
  label?: string;
  error?: string;
  touched?: boolean;
  className?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  error,
  touched,
  className = "",
  checked,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
            error && touched ? "border-red-500" : ""
          }`}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
            {label}
          </label>
        )}
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Checkbox;
