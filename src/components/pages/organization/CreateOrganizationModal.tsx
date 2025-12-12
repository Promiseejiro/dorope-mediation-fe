"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  CreateOrganizationModalProps,
  OrganizationFormData,
} from "@/types/organization";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { toastCustom } from "@/utils/toast";
import { createOrganization } from "@/request/organization";

const CreateOrganizationModal: React.FC<CreateOrganizationModalProps> = ({
  onClose,
  isLoading = false,
}) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: (data: OrganizationFormData) => createOrganization(data),
    onSuccess: (data) => {
      onClose();
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const formik = useFormik<OrganizationFormData>({
    initialValues: {
      name: "",
      description: "",
      domain: "",
    },

    validate: (values) => {
      const errors: Partial<Record<keyof OrganizationFormData, string>> = {};

      if (!values.name.trim()) {
        errors.name = "Organization name is required";
      } else if (values.name.length < 3) {
        errors.name = "Name must be at least 3 characters";
      }

      if (values.description && values.description.length > 500) {
        errors.description = "Description cannot exceed 500 characters";
      }

      if (values.domain) {
        const domainRegex =
          /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
        if (!domainRegex.test(values.domain)) {
          errors.domain = "Please enter a valid domain";
        }
      }

      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        mutation.mutate(values);
        resetForm();
        setLogoPreview(null);
        onClose();
      } catch (error) {
        console.error("Error creating organization:", error);
      }
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    setLogoPreview(null);
    onClose();
  };

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="relative w-full transform p-6 shadow-xl transition-all fade-in">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-semibold text-foreground">
              Create New Organization
            </h2>
            <p className="text text-gray-500">Set up your new workspace</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-500 cursor-pointer hover:text-primary rounded-lg transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {/* LOGO */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Logo (Optional)
            </label>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className={twMerge(
                    "w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center",
                    logoPreview
                      ? "border-gray-300"
                      : "border-gray-300 hover:border-primary"
                  )}
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <i className="fas fa-building text-3xl text-gray-400"></i>
                  )}
                </div>

                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </div>

              <div>
                <label
                  htmlFor="logo-upload"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
                >
                  <i className="fas fa-upload text-sm"></i>
                  <span className="text-sm font-medium">Upload Logo</span>
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Recommended: 200×200px, PNG or JPG
                </p>
              </div>
            </div>
          </div>

          {/* NAME */}
          <Input
            id="organization-name"
            name="name"
            label="Organization Name *"
            placeholder="Enter organization name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name ? formik.errors.name : undefined}
            touched={!!formik.touched.name}
            className="mb-4"
          />

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description (Optional)
              <span className="text-gray-400 text-xs ml-1">
                {formik.values.description.length}/500
              </span>
            </label>

            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Describe your organization"
                maxLength={500}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={twMerge(
                  "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary",
                  formik.touched.description && formik.errors.description
                    ? "border-red-500"
                    : "border-gray-300",
                  "min-h-[100px] resize-none"
                )}
              />
              <i className="fas fa-info-circle absolute right-3 top-3 text-gray-400 text-sm"></i>
            </div>

            {formik.touched.description && formik.errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* DOMAIN */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <i className="fas fa-globe text-sm mr-1"></i>
              Custom Domain (Optional)
            </label>

            <Input
              id="domain"
              name="domain"
              placeholder="your-domain.com"
              value={formik.values.domain}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.domain ? formik.errors.domain : undefined}
              touched={!!formik.touched.domain}
              className="flex-1 mb-0"
              placeHolderClassName="placeholder-gray-400"
            />

            <p className="text-xs text-gray-500 mt-2">
              Add a custom domain for your organization
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading || formik.isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || formik.isSubmitting}
            >
              <div className="flex items-center gap-2">
                <i className="fas fa-plus mr-1 text-sm"></i>
                {formik.isSubmitting ? "Creating..." : "Create Organization"}
              </div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganizationModal;
