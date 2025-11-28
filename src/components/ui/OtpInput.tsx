"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  className?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Initialize inputRefs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Initialize with current value
    if (value) {
      const newOtp = value.split("").slice(0, length);
      const filledOtp = [
        ...newOtp,
        ...new Array(length - newOtp.length).fill(""),
      ];
      setOtp(filledOtp);
    } else {
      setOtp(new Array(length).fill(""));
    }
  }, [value, length]);

  const handleChange = useCallback(
    (element: HTMLInputElement, index: number) => {
      if (isNaN(Number(element.value))) return;

      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      const otpValue = newOtp.join("");
      onChange(otpValue);

      // Focus next input
      if (element.value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [otp, onChange, length]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        if (!otp[index] && index > 0) {
          // Move to previous input on backspace
          const newOtp = [...otp];
          newOtp[index - 1] = "";
          setOtp(newOtp);
          onChange(newOtp.join(""));
          inputRefs.current[index - 1]?.focus();
        } else if (otp[index]) {
          // Clear current input
          const newOtp = [...otp];
          newOtp[index] = "";
          setOtp(newOtp);
          onChange(newOtp.join(""));
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (e.key === "Enter" && otp.join("").length === length) {
        // Submit form when Enter is pressed and OTP is complete
        const form = inputRefs.current[index]?.closest("form");
        form?.requestSubmit();
      }
    },
    [otp, onChange, length]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
      const pastedArray = pastedData.split("");

      if (pastedArray.every((char) => !isNaN(Number(char)))) {
        const newOtp = [...otp];
        pastedArray.forEach((char, index) => {
          if (index < length) {
            newOtp[index] = char;
          }
        });
        setOtp(newOtp);
        onChange(newOtp.join(""));

        const nextIndex = Math.min(pastedArray.length, length - 1);
        inputRefs.current[nextIndex]?.focus();
      }
    },
    [otp, onChange, length]
  );

  // Create ref callback function
  const setInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    },
    []
  );

  return (
    <div className={`${className}`}>
      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            ref={setInputRef(index)}
            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onBlur={onBlur}
            className={`
              w-12 h-12 lg:w-16 lg:h-16 text-center text-xl font-semibold
              border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary
              transition-all duration-200
              ${
                error && touched
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 focus:border-primary"
              }
              ${digit ? "bg-blue-50 border-primary" : "bg-white"}
            `}
          />
        ))}
      </div>
      {error && touched && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
};

export default OtpInput;
