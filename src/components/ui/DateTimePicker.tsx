// components/ui/DateTimePicker.tsx
"use client";

import React, { useState, useMemo } from "react";

interface DateTimePickerProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
  className?: string;
  required?: boolean;
  minDate?: string; // ISO string format
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  touched,
  className = "",
  required = false,
  minDate,
  disabled = false,
}) => {
  const [date, setDate] = useState(value ? value.split("T")[0] : "");
  const [time, setTime] = useState(value ? value.split("T")[1] : "12:00");

  // Generate time options in 24-hour format
  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // 30-minute intervals
        const hourStr = hour.toString().padStart(2, "0");
        const minuteStr = minute.toString().padStart(2, "0");
        options.push(`${hourStr}:${minuteStr}`);
      }
    }
    return options;
  }, []);

  // Get minimum datetime for validation
  const getMinDateTime = () => {
    if (minDate) return minDate;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);

    if (newDate && time) {
      const dateTime = `${newDate}T${time}`;
      onChange(dateTime);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    setTime(newTime);

    if (date && newTime) {
      const dateTime = `${date}T${newTime}`;
      onChange(dateTime);
    }
  };

  // Check if a time option should be disabled (for past times on current date)
  const isTimeDisabled = (timeOption: string) => {
    if (!date) return false;

    const selectedDateTime = new Date(`${date}T${timeOption}`);
    const now = new Date();

    // If selected date is today, disable past times
    const isToday = date === now.toISOString().split("T")[0];
    if (isToday) {
      const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
      return timeOption <= currentTime;
    }

    // If minDate is provided, use it for comparison
    if (minDate) {
      const minDateTime = new Date(minDate);
      return selectedDateTime <= minDateTime;
    }

    return false;
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        {/* Date Input */}
        <div className="flex-1">
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            min={
              minDate
                ? minDate.split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            disabled={disabled}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              error && touched ? "border-red-500" : "border-gray-300"
            } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
          <p className="mt-1 text-xs text-gray-500">Select date</p>
        </div>

        {/* Time Select */}
        <div className="flex-1">
          <select
            value={time}
            onChange={handleTimeChange}
            disabled={disabled || !date}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
              error && touched ? "border-red-500" : "border-gray-300"
            } ${disabled || !date ? "bg-gray-100 cursor-not-allowed" : ""}`}
          >
            <option value="">Select time</option>
            {timeOptions.map((timeOption) => (
              <option
                key={timeOption}
                value={timeOption}
                disabled={isTimeDisabled(timeOption)}
              >
                {timeOption}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">24-hour format</p>
        </div>
      </div>

      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {/* Selected datetime preview */}
      {value && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: {new Date(value).toLocaleString()}
        </p>
      )}
    </div>
  );
};

export default DateTimePicker;
