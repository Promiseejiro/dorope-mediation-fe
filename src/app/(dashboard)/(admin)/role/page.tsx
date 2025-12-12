"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import GoBack from "@/components/ui/GoBack";
import { useFormik } from "formik";
import * as Yup from "yup";
import AnimatedModalLayout from "@/components/layout/animatedModalLayout";

interface Permission {
  id?: string;
  name: string; // e.g. "exam:manage"
  description: string;
  resource: string; // e.g. "exam"
}

interface PermissionCategory {
  resource: string;
  description: string;
  icon: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  createdAt: string;
  isDefault: boolean;
  permissionIds: string[]; // list of permission.name strings
}

const resources: PermissionCategory[] = [
  {
    resource: "user",
    description: "User management and administration",
    icon: "fa-users",
  },
  {
    resource: "exam",
    description: "Exam creation, management, and publishing",
    icon: "fa-file-alt",
  },
  {
    resource: "question",
    description: "Question bank and content management",
    icon: "fa-question-circle",
  },
  {
    resource: "assessment",
    description: "Assessment and evaluation tools",
    icon: "fa-clipboard-check",
  },
  {
    resource: "result",
    description: "Result viewing and analysis",
    icon: "fa-chart-bar",
  },
  {
    resource: "organization",
    description: "Organization settings and management",
    icon: "fa-building",
  },
  {
    resource: "role",
    description: "Role and permission management",
    icon: "fa-user-shield",
  },
  {
    resource: "system",
    description: "System configuration and settings",
    icon: "fa-cog",
  },
];

// One clean permission per resource: "<resource>:manage"
const defaultPermissions: Permission[] = resources.map((r) => ({
  name: `${r.resource}:manage`,
  description: `Manage ${r.description.toLowerCase()}`,
  resource: r.resource,
}));

const defaultRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with available permissions",
    userCount: 2,
    createdAt: "2024-01-15",
    isDefault: true,
    permissionIds: defaultPermissions.map((p) => p.name),
  },
  {
    id: "2",
    name: "Teacher",
    description: "Can create and manage exams, view results",
    userCount: 45,
    createdAt: "2024-01-15",
    isDefault: true,
    permissionIds: defaultPermissions
      .filter(
        (p) =>
          p.resource === "exam" ||
          p.resource === "question" ||
          p.resource === "assessment" ||
          p.resource === "result"
      )
      .map((p) => p.name),
  },
  {
    id: "3",
    name: "Organization Admin",
    description: "Manage organization users and settings",
    userCount: 8,
    createdAt: "2024-01-15",
    isDefault: true,
    permissionIds: defaultPermissions
      .filter(
        (p) =>
          p.resource === "user" ||
          p.resource === "organization" ||
          p.resource === "exam" ||
          p.resource === "result"
      )
      .map((p) => p.name),
  },
  {
    id: "4",
    name: "Student",
    description: "Take exams and view personal results",
    userCount: 320,
    createdAt: "2024-01-15",
    isDefault: true,
    permissionIds: defaultPermissions
      .filter(
        (p) =>
          p.resource === "exam" ||
          p.resource === "assessment" ||
          p.resource === "result"
      )
      .map((p) => p.name),
  },
];

const roleSchema = Yup.object({
  name: Yup.string()
    .required("Role name is required")
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name cannot exceed 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters"),
});

// Permission schema is ready for when you add permission-creation UI
const permissionSchema = Yup.object({
  name: Yup.string()
    .required("Permission name is required")
    .matches(
      /^[a-z]+:[a-z]+$/,
      "Format must be resource:action (e.g., exam:create)"
    )
    .max(100, "Permission name cannot exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description cannot exceed 200 characters"),
  resource: Yup.string().required("Resource is required"),
  action: Yup.string().required("Action is required"),
});

/**
 * Create Role Modal (split into its own component, same file)
 */
interface CreateRoleModalProps {
  isOpen: boolean;
  formik: ReturnType<typeof useFormik<any>>;
  isLoading: boolean;
  onClose: () => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
  isOpen,
  formik,
  isLoading,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatedModalLayout>
      <div className="p-8">
        {/* Header */}
        <div className=" py-4 mb-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Created role</h2>
              <p className="text-sm text-gray-600 mt-1">
                Create specific role apart from default roles
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Content Manager"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full ${
                formik.errors.name && formik.touched.name
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {/* {formik.errors.name && formik.touched.name && (
            <div className="mt-1 text-sm text-red-600">
              {formik.errors.name}
            </div>
          )} */}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the role's purpose and responsibilities..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24"
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.errors.description && formik.touched.description && (
            <div className="mt-1 text-sm text-red-600">
              {formik.errors.description}
            </div>
          )} */}
            <p className="mt-1 text-sm text-gray-500">
              This will help users understand the role&apos;s purpose.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !formik.isValid}
              className="min-w-24"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Creating...
                </>
              ) : (
                "Create Role"
              )}
            </Button>
          </div>
        </form>
      </div>
    </AnimatedModalLayout>
  );
};

interface DeleteConfirmModalProps {
  isOpen: boolean;
  itemName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  itemName,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatedModalLayout className="" maxWidth={500}>
      <div className="space-y-4 p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Delete {itemName}?
        </h2>
        <p className="text-sm text-gray-600">
          This role will be removed. Users assigned to this role will lose its
          permissions. This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={onConfirm}
            className="min-w-24"
          >
            Delete
          </Button>
        </div>
      </div>
    </AnimatedModalLayout>
  );
};

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [permissions] = useState<Permission[]>(defaultPermissions);
  const [selectedRole, setSelectedRole] = useState<Role | null>(
    defaultRoles[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [
    showCreateRoleAnimatedModalLayout,
    setShowCreateRoleAnimatedModalLayout,
  ] = useState(false);

  const [showDeleteAnimatedModalLayout, setShowDeleteAnimatedModalLayout] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "role" | "permission";
    item: any;
  } | null>(null);

  const roleFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: roleSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // simulate API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newRole: Role = {
          id: Date.now().toString(),
          name: values.name,
          description: values.description,
          userCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
          isDefault: false,
          permissionIds: [],
        };

        const updatedRoles = [...roles, newRole];
        setRoles(updatedRoles);
        setSelectedRole(newRole);
        setShowCreateRoleAnimatedModalLayout(false);
        roleFormik.resetForm();
        showSuccessMessage("Role created successfully!");
      } catch (error) {
        console.error("Error creating role:", error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const showSuccessMessage = (message: string) => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  /**
   * Toggle ALL permissions for a resource for the selected role
   */
  const handleCategoryToggle = (resource: string, checked: boolean) => {
    if (!selectedRole) return;

    const resourcePermissionNames = permissions
      .filter((p) => p.resource === resource)
      .map((p) => p.name);

    let newPermissionIds: string[];

    if (checked) {
      // Add all permissions for this resource
      const set = new Set([
        ...selectedRole.permissionIds,
        ...resourcePermissionNames,
      ]);
      newPermissionIds = Array.from(set);
    } else {
      // Remove all permissions for this resource
      newPermissionIds = selectedRole.permissionIds.filter(
        (id) => !resourcePermissionNames.includes(id)
      );
    }

    const updatedRoles = roles.map((role) =>
      role.id === selectedRole.id
        ? { ...role, permissionIds: newPermissionIds }
        : role
    );
    setRoles(updatedRoles);

    setSelectedRole({
      ...selectedRole,
      permissionIds: newPermissionIds,
    });

    setIsSaved(false);
  };

  /**
   * Cards
   */
  const PermissionCategoryCard = ({
    category,
  }: {
    category: PermissionCategory;
  }) => {
    const selectedPermissionIds = selectedRole?.permissionIds || [];
    const resourcePermissionNames = permissions
      .filter((p) => p.resource === category.resource)
      .map((p) => p.name);

    // Switch is ON if the role has at least one permission for this resource
    const isOn =
      resourcePermissionNames.length > 0 &&
      resourcePermissionNames.every((name) =>
        selectedPermissionIds.includes(name)
      );

    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <i className={`fas ${category.icon} text-blue-600`}></i>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">
                {category.resource}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          </div>

          {/* Single switch to toggle ALL permissions for this resource */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isOn}
              onChange={(e) =>
                handleCategoryToggle(category.resource, e.target.checked)
              }
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
          </label>
        </div>
      </div>
    );
  };

  const RoleCard = ({ role }: { role: Role }) => {
    const isSelected = selectedRole?.id === role.id;
    const enabledPermissions = role.permissionIds.length;
    const totalPermissions = permissions.length;

    return (
      <div
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-blue-500 ${
          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
        }`}
        onClick={() => setSelectedRole(role)}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{role.name}</h3>
              {role.isDefault && (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{role.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <i className="fas fa-user mr-2"></i>
                {role.userCount} users
              </span>
              <span className="flex items-center">
                <i className="fas fa-check-circle mr-2"></i>
                {enabledPermissions} / {totalPermissions} permissions
              </span>
            </div>
          </div>
          {!role.isDefault && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setItemToDelete({ type: "role", item: role });
                setShowDeleteAnimatedModalLayout(true);
              }}
              className="text-gray-400 hover:text-red-600 transition-colors p-1"
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    );
  };

  const PermissionCard = ({ permission }: { permission: Permission }) => {
    const rolesWithPermission = roles.filter((role) =>
      role.permissionIds.includes(permission.name)
    ).length;

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <code className="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                {permission.name}
              </code>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {permission.description}
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="capitalize">{permission.resource}</span>
              <span>•</span>
              <span>{rolesWithPermission} roles</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Delete handlers (only non-system roles have delete icon)
   */
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === "role") {
      const roleToDelete = itemToDelete.item as Role;

      // Protect system roles even if somehow triggered
      if (roleToDelete.isDefault) {
        setShowDeleteAnimatedModalLayout(false);
        setItemToDelete(null);
        return;
      }

      const nextRoles = roles.filter((r) => r.id !== roleToDelete.id);
      setRoles(nextRoles);

      if (selectedRole?.id === roleToDelete.id) {
        setSelectedRole(nextRoles[0] ?? null);
      }
    }

    setShowDeleteAnimatedModalLayout(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <GoBack fallbackUrl="/admin/settings" className="px-0" />

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Role &amp; Permission Management
          </h1>
          <p className="text-gray-600">
            Manage roles and their permissions using the resource:action format
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={() => setShowCreateRoleAnimatedModalLayout(true)}
            disabled={isLoading}
          >
            <i className="fas fa-plus mr-2"></i>
            New Role
          </Button>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2 text-green-800">
            <i className="fas fa-check-circle"></i>
            <span className="font-medium">Changes saved successfully!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Sidebar - Role List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                All Roles ({roles.length})
              </h3>
              <p className="text-sm text-gray-600">
                Select a role to manage its permissions
              </p>
            </div>
            <div className="space-y-3">
              {roles.map((role) => (
                <RoleCard key={role.id} role={role} />
              ))}
            </div>
          </div>

          {/* Available Permissions Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Available Permissions ({permissions.length})
              </h3>
              <p className="text-sm text-gray-600">
                System permissions cannot be deleted
              </p>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {permissions.map((permission) => (
                <PermissionCard key={permission.name} permission={permission} />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Permissions */}
        <div className="lg:col-span-3">
          {selectedRole ? (
            <div className="space-y-6">
              {/* Selected Role Header */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedRole.name}
                      </h2>
                      {selectedRole.isDefault && (
                        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                          Default Role
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{selectedRole.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      Users with this role
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedRole.userCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Permission Categories – single switch per resource */}
              <div className="space-y-6">
                {resources.map((category) => (
                  <PermissionCategoryCard
                    key={category.resource}
                    category={category}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <i className="fas fa-user-shield text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Role
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a role from the sidebar to view and edit its permissions
              </p>
              <Button
                variant="primary"
                onClick={() => setShowCreateRoleAnimatedModalLayout(true)}
              >
                <i className="fas fa-plus mr-2"></i>
                Create New Role
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Permission Summary */}
      {selectedRole && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Permission Summary for {selectedRole.name}
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Users with this role can perform these actions:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedRole.permissionIds.length === 0 && (
                  <span className="text-sm text-blue-700">
                    No permissions assigned yet.
                  </span>
                )}
                {selectedRole.permissionIds.map((permissionId) => (
                  <span
                    key={permissionId}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {permissionId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Role Modal */}
      <CreateRoleModal
        isOpen={showCreateRoleAnimatedModalLayout}
        formik={roleFormik}
        isLoading={isLoading}
        onClose={() => {
          setShowCreateRoleAnimatedModalLayout(false);
          roleFormik.resetForm();
        }}
      />

      {/* Delete Role Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteAnimatedModalLayout && !!itemToDelete}
        itemName={
          itemToDelete?.type === "role" ? itemToDelete.item.name : "item"
        }
        onCancel={() => {
          setShowDeleteAnimatedModalLayout(false);
          setItemToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default RoleManagement;
