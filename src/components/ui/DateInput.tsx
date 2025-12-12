// components/ui/DateInput.tsx
import React from "react";

interface DateInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  touched?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  min?: string;
  max?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  placeholder = "Select date",
  error,
  touched,
  className = "",
  value,
  onChange,
  onBlur,
  disabled = false,
  min,
  max,
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
      <div className="relative">
        <input
          id={id}
          type="date"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          min={min}
          max={max}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error && touched ? "border-red-500" : "border-gray-300"
          } ${
            disabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "bg-white"
          } appearance-none`}
          {...props}
        />
        {!disabled && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <i className="fas fa-calendar-alt"></i>
          </div>
        )}
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default DateInput;
