// components/pages/dashboard/student/ChangePassword.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import GoBack from "@/components/ui/GoBack";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ChangePassword: React.FC = () => {
  const [formData, setFormData] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof ChangePasswordForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In real app, you would call your API here
      console.log("Password change submitted:", formData);
      setIsSuccess(true);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTouched({});
    } catch (error) {
      console.error("Error changing password:", error);
      setErrors({
        currentPassword: "Failed to change password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^a-zA-Z\d]/.test(password)) strength += 1;

    const strengthConfig = {
      0: { text: "Very Weak", color: "bg-red-500" },
      1: { text: "Weak", color: "bg-red-400" },
      2: { text: "Fair", color: "bg-yellow-500" },
      3: { text: "Good", color: "bg-blue-500" },
      4: { text: "Strong", color: "bg-green-500" },
      5: { text: "Very Strong", color: "bg-green-600" },
    };

    return {
      strength: (strength / 5) * 100,
      ...strengthConfig[strength as keyof typeof strengthConfig],
    };
  };

  const strength = passwordStrength(formData.newPassword);

  return (
    <div className="space-y-6">
      {/* Header */}
      <GoBack fallbackUrl="/student/profile" className="px-0" />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
          <p className="text-gray-600">
            Update your password to keep your account secure
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-800">
                  <i className="fas fa-check-circle"></i>
                  <span className="font-medium">
                    Password changed successfully!
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <Input
                id="currentPassword"
                label="Current Password"
                type="password"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
                onBlur={() => handleBlur("currentPassword")}
                error={errors.currentPassword}
                touched={touched.currentPassword}
                disabled={isLoading}
              />

              {/* New Password */}
              <div>
                <Input
                  id="newPassword"
                  label="New Password"
                  type="password"
                  placeholder="Enter your new password"
                  value={formData.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  onBlur={() => handleBlur("newPassword")}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                  disabled={isLoading}
                />

                {/* Password Strength Meter */}
                {formData.newPassword && (
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Password strength</span>
                      <span
                        className={`font-medium ${
                          strength.strength < 40
                            ? "text-red-600"
                            : strength.strength < 70
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {strength.text}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                <div className="mt-3 text-sm text-gray-600">
                  <p className="font-medium mb-2">Password must contain:</p>
                  <ul className="space-y-1">
                    <li
                      className={`flex items-center space-x-2 ${
                        formData.newPassword.length >= 8
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <i
                        className={`fas ${
                          formData.newPassword.length >= 8
                            ? "fa-check"
                            : "fa-circle"
                        } text-xs`}
                      ></i>
                      <span>At least 8 characters</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /[a-z]/.test(formData.newPassword)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <i
                        className={`fas ${
                          /[a-z]/.test(formData.newPassword)
                            ? "fa-check"
                            : "fa-circle"
                        } text-xs`}
                      ></i>
                      <span>One lowercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /[A-Z]/.test(formData.newPassword)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <i
                        className={`fas ${
                          /[A-Z]/.test(formData.newPassword)
                            ? "fa-check"
                            : "fa-circle"
                        } text-xs`}
                      ></i>
                      <span>One uppercase letter</span>
                    </li>
                    <li
                      className={`flex items-center space-x-2 ${
                        /\d/.test(formData.newPassword)
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      <i
                        className={`fas ${
                          /\d/.test(formData.newPassword)
                            ? "fa-check"
                            : "fa-circle"
                        } text-xs`}
                      ></i>
                      <span>One number</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm Password */}
              <Input
                id="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
                disabled={isLoading}
              />

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="min-w-32"
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setErrors({});
                    setTouched({});
                    setIsSuccess(false);
                  }}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Security Tips */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Password Security Tips
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Use a strong password
                  </p>
                  <p className="text-gray-600 text-sm">
                    Combine letters, numbers, and special characters
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <i className="fas fa-sync-alt text-green-600 mt-0.5"></i>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Change regularly
                  </p>
                  <p className="text-gray-600 text-sm">
                    Update your password every 3-6 months
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <i className="fas fa-user-secret text-purple-600 mt-0.5"></i>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Keep it private
                  </p>
                  <p className="text-gray-600 text-sm">
                    Never share your password with anyone
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <i className="fas fa-ban text-red-600 mt-0.5"></i>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Avoid common patterns
                  </p>
                  <p className="text-gray-600 text-sm">
                    Don't use sequential numbers or repeated characters
                  </p>
                </div>
              </div>
            </div>

            {/* Last Password Change */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Last password change:</p>
              <p className="font-medium text-gray-900">
                {new Date().toLocaleDateString()} at{" "}
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
