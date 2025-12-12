import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  label?: string;
  name?: string;
  options: Option[];
  error?: string;
  touched?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  options,
  error,
  touched,
  className = "",
  name,
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
      <select
      name={name}
        id={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
          error && touched ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
