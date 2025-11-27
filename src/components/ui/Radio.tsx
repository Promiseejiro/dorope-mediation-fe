// components/ui/Radio.tsx
import React from "react";

interface RadioProps {
  id: string;
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  id,
  label,
  name,
  value,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
      />
      {label && (
        <label htmlFor={id} className="ml-2 block text-sm text-gray-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
