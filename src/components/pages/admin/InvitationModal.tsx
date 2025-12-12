"use client";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AnimatedModalLayout from "@/components/layout/animatedModalLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import UseCaseTabs from "@/components/ui/UseCaseTabs";
import { InviteModalProps } from "@/types/invite-user";

// Validation schemas
const singleInviteSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  role: Yup.string()
    .oneOf(["teacher", "org-admin", "student"], "Invalid role")
    .required("Role is required"),
  organization: Yup.string().optional(),
  customMessage: Yup.string().optional(),
});

const bulkInviteSchema = Yup.object({
  bulkEmails: Yup.string()
    .required("Email addresses are required")
    .test("emails", "Please enter valid email addresses", (value) => {
      if (!value) return false;
      const emails = value
        .split(/[\n,;]/)
        .map((email) => email.trim())
        .filter((email) => email.length > 0);

      if (emails.length === 0) return false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emails.every((email) => emailRegex.test(email));
    }),
  bulkRole: Yup.string()
    .oneOf(["teacher", "org-admin", "student"], "Invalid role")
    .required("Role is required"),
  bulkOrganization: Yup.string().optional(),
});

const InvitationModal: React.FC<InviteModalProps> = ({
  isOpen,
  onClose,
  mode,
  initialData,
  onSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [modalMode, setModalMode] = useState<"single" | "bulk">("single");

  // Define tabs for invite type switching (single vs bulk)
  const inviteTypeTabs = [
    {
      Name: "Single Invite",
      value: "single",
      icon: "fas fa-user-plus",
    },
    {
      Name: "Bulk Invite",
      value: "bulk",
      icon: "fas fa-users",
    },
  ];

  const [useCase, setUseCase] = useState("business");

  // Get initial values based on mode
  const getInitialValues = () => {
    if (mode === "edit" && initialData) {
      return {
        email: initialData.email,
        role:
          initialData.role === "Teacher"
            ? "teacher"
            : initialData.role === "Organization Admin"
            ? "org-admin"
            : "student",
        organization: initialData.organization || "",
        customMessage: initialData.customMessage || "",
        bulkEmails: "",
        bulkRole: "teacher",
        bulkOrganization: "",
      };
    }

    return {
      email: "",
      role: "teacher",
      organization: "",
      customMessage: "",
      bulkEmails: "",
      bulkRole: "teacher",
      bulkOrganization: "",
    };
  };

  // Handle single invite submission
  const handleSingleInvite = async (values: any) => {
    setLoading(true);
    try {
      const inviteData = {
        email: values.email,
        role: values.role,
        organization: values.organization,
        customMessage: values.customMessage,
        useCase,
        mode: "single",
      };

      await onSubmit(inviteData);
      onClose();
    } catch (error) {
      console.error("Error sending invitation:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk invite submission
  const handleBulkInvite = async (values: any) => {
    setLoading(true);
    try {
      const emails = values.bulkEmails
        .split(/[\n,;]/)
        .map((email: string) => email.trim())
        .filter((email: string) => email.length > 0);

      const bulkInviteData = {
        emails,
        role: values.bulkRole,
        organization: values.bulkOrganization,
        useCase,
        mode: "bulk",
      };

      await onSubmit(bulkInviteData);
      onClose();
    } catch (error) {
      console.error("Error sending bulk invitations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (values: any) => {
    if (modalMode === "single") {
      return handleSingleInvite(values);
    } else {
      return handleBulkInvite(values);
    }
  };

  const validationSchema =
    modalMode === "single" ? singleInviteSchema : bulkInviteSchema;

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  const getModalTitle = () => {
    if (mode === "edit") {
      return "Edit Invitation";
    }
    return "Invite Users";
  };

  const getModalDescription = () => {
    if (mode === "edit") {
      return "Update invitation details for this user";
    }
    return modalMode === "single"
      ? "Invite a single user to join EduAssess"
      : "Invite multiple users at once by entering their email addresses";
  };

  if (!isOpen) return null;

  return (
    <AnimatedModalLayout className="px-6">
      <div className="w-full mx-auto ">
        {/* Modal Header */}
        <div className=" py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {getModalTitle()}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {getModalDescription()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 ">
          {mode === "create" && (
            <div className="mb-2 w-full flex items-center justify-start">
              <UseCaseTabs
                tabs={inviteTypeTabs}
                active={modalMode}
                onChange={(value) => setModalMode(value as "single" | "bulk")}
                className="mb-6"
              />
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {modalMode === "single" ? (
              // Single Invite Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={mode === "edit"}
                    className={`w-full ${
                      formik.errors.email && formik.touched.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <Select
                    id="role"
                    name="role"
                    options={[
                      { value: "teacher", label: "Teacher" },
                      { value: "org-admin", label: "Organization Admin" },
                      { value: "student", label: "Student" },
                    ]}
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.role && formik.touched.role && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.role}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Message (Optional)
                  </label>
                  <textarea
                    id="customMessage"
                    name="customMessage"
                    placeholder="Add a personal message to the invitation..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24"
                    rows={3}
                    value={formik.values.customMessage}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            ) : (
              // Bulk Invite Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Addresses *
                    <span className="text-gray-500 text-sm ml-1">
                      (one per line or separated by commas)
                    </span>
                  </label>
                  <textarea
                    id="bulkEmails"
                    name="bulkEmails"
                    placeholder={`user1@example.com\nuser2@example.com\nuser3@example.com`}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-32 font-mono text-sm ${
                      formik.errors.bulkEmails && formik.touched.bulkEmails
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : ""
                    }`}
                    rows={6}
                    value={formik.values.bulkEmails}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.bulkEmails && formik.touched.bulkEmails && (
                    <div className="mt-1 text-sm text-red-600">
                      {formik.errors.bulkEmails}
                    </div>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    Enter multiple email addresses separated by commas,
                    semicolons, or new lines.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role for All Users *
                    </label>
                    <Select
                      id="bulkRole"
                      name="bulkRole"
                      options={[
                        { value: "teacher", label: "Teacher" },
                        { value: "org-admin", label: "Organization Admin" },
                        { value: "student", label: "Student" },
                      ]}
                      value={formik.values.bulkRole}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.bulkRole && formik.touched.bulkRole && (
                      <div className="mt-1 text-sm text-red-600">
                        {formik.errors.bulkRole}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="min-w-32"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {mode === "edit" ? "Updating..." : "Sending..."}
                  </>
                ) : (
                  <>
                    <i
                      className={`fas ${
                        mode === "edit"
                          ? "fa-save"
                          : modalMode === "single"
                          ? "fa-paper-plane"
                          : "fa-paper-plane"
                      } mr-2`}
                    ></i>
                    {mode === "edit"
                      ? "Update Invitation"
                      : modalMode === "single"
                      ? "Send Invitation"
                      : "Send Invitations"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Quick Tips - Only for create mode */}
        {mode === "create" && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-start space-x-3">
              <i className="fas fa-lightbulb text-primary mt-0.5"></i>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  {modalMode === "single"
                    ? "Single Invite Tips"
                    : "Bulk Invite Tips"}
                </h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {modalMode === "single" ? (
                    <>
                      <li>
                        • Use a personalized message to increase acceptance rate
                      </li>
                      <li>
                        • Ensure the email address is correct before sending
                      </li>
                      <li>
                        • The user will receive an email with invitation link
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        • Use new lines or commas to separate email addresses
                      </li>
                      <li>• All invited users will receive the same role</li>
                      <li>• Maximum 100 emails per bulk invite</li>
                      <li>• Check email addresses for typos before sending</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedModalLayout>
  );
};

export default InvitationModal;
