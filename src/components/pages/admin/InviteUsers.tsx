"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { InvitedUser } from "@/types/invite-user";
import InvitationModal from "./InvitationModal";

const InviteUsers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<InvitedUser | null>(null);
  const [invitedUsers, setInvitedUsers] = useState<InvitedUser[]>([
    {
      id: "1",
      email: "john.doe@school.edu",
      role: "Teacher",
      organization: "Prestige High School",
      status: "sent",
      invitedAt: "2024-01-10 14:30",
      invitedBy: "Super Admin",
    },
    {
      id: "2",
      email: "jane.smith@college.edu",
      role: "Organization Admin",
      organization: "Global University",
      status: "accepted",
      invitedAt: "2024-01-08 10:15",
      invitedBy: "Super Admin",
    },
    {
      id: "3",
      email: "michael.brown@institute.edu",
      role: "Teacher",
      organization: "Tech Institute",
      status: "pending",
      invitedAt: "2024-01-12 16:45",
      invitedBy: "Super Admin",
    },
    {
      id: "4",
      email: "sarah.wilson@academy.edu",
      role: "Student",
      organization: "Science Academy",
      status: "expired",
      invitedAt: "2023-12-20 09:30",
      invitedBy: "Super Admin",
    },
  ]);

  const openCreateModal = (inviteMode: "single" | "bulk") => {
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openEditModal = (user: InvitedUser) => {
    setModalMode("edit");
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmitInvite = async (data: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (modalMode === "create") {
      if (data.emails) {
        // Bulk invite
        const newUsers: InvitedUser[] = data.emails.map((email: string) => ({
          id: Date.now().toString() + Math.random(),
          email,
          role:
            data.role === "teacher"
              ? "Teacher"
              : data.role === "org-admin"
              ? "Organization Admin"
              : "Student",
          organization: data.organization,
          status: "sent",
          invitedAt: new Date().toLocaleString(),
          invitedBy: "Super Admin",
        }));
        setInvitedUsers([...newUsers, ...invitedUsers]);
      } else {
        // Single invite
        const newUser: InvitedUser = {
          id: Date.now().toString(),
          email: data.email,
          role:
            data.role === "teacher"
              ? "Teacher"
              : data.role === "org-admin"
              ? "Organization Admin"
              : "Student",
          organization: data.organization,
          status: "sent",
          invitedAt: new Date().toLocaleString(),
          invitedBy: "Super Admin",
          customMessage: data.customMessage,
        };
        setInvitedUsers([newUser, ...invitedUsers]);
      }
    } else if (modalMode === "edit" && selectedUser) {
      // Update existing user
      setInvitedUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                role:
                  data.role === "teacher"
                    ? "Teacher"
                    : data.role === "org-admin"
                    ? "Organization Admin"
                    : "Student",
                organization: data.organization,
                customMessage: data.customMessage,
              }
            : user
        )
      );
    }

    // toast.success(
    //   modalMode === "create"
    //     ? "Invitation(s) sent successfully!"
    //     : "Invitation updated successfully!"
    // );
  };

  const handleResendInvite = async (user: InvitedUser) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setInvitedUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? { ...u, status: "sent", invitedAt: new Date().toLocaleString() }
            : u
        )
      );
    } catch (error) {
      // Handle error
    }
  };

  const handleRevokeInvite = async (userId: string) => {
    if (!confirm("Are you sure you want to revoke this invitation?")) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInvitedUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      // Handle error
    }
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      sent: { color: "bg-blue-100 text-blue-800", text: "Sent" },
      accepted: { color: "bg-green-100 text-green-800", text: "Accepted" },
      expired: { color: "bg-red-100 text-red-800", text: "Expired" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    const roleConfig = {
      Teacher: { color: "bg-purple-100 text-purple-800" },
      "Organization Admin": { color: "bg-indigo-100 text-indigo-800" },
      Student: { color: "bg-gray-100 text-gray-800" },
    };

    const config = roleConfig[role as keyof typeof roleConfig] || {
      color: "bg-gray-100 text-gray-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {role}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invite Users</h1>
          <p className="text-gray-600">
            Invite teachers, organization admins, and students to join EduAssess
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">
            Total Invited: {invitedUsers.length}
          </span>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              onClick={() => openCreateModal("single")}
              className="flex items-center"
            >
              <i className="fas fa-user-plus mr-2"></i>
              Invite User
            </Button>
          </div>
        </div>
      </div>

      {/* Invited Users List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Invitation History
            </h3>
            <div className="flex items-center space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>All Status</option>
                <option>Pending</option>
                <option>Sent</option>
                <option>Accepted</option>
                <option>Expired</option>
              </select>
              <Button variant="outline" size="sm">
                <i className="fas fa-download mr-2"></i>
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invited At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invitedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-user text-gray-400"></i>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {user.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          Invited by: {user.invitedBy}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.organization || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.invitedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Invitation"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      {user.status !== "accepted" && (
                        <button
                          onClick={() => handleResendInvite(user)}
                          className="text-green-600 hover:text-green-900"
                          title="Resend Invitation"
                        >
                          <i className="fas fa-redo"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleRevokeInvite(user.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Revoke Invitation"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {invitedUsers.length === 0 && (
            <div className="text-center py-12">
              <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Invitations Sent Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start by inviting users to join your EduAssess platform.
              </p>
              <div className="space-x-3">
                <Button
                  variant="primary"
                  onClick={() => openCreateModal("single")}
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Invite First User
                </Button>
                <Button
                  variant="outline"
                  onClick={() => openCreateModal("bulk")}
                >
                  <i className="fas fa-users mr-2"></i>
                  Bulk Invite
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {invitedUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{invitedUsers.length}</span> of{" "}
                <span className="font-medium">{invitedUsers.length}</span>{" "}
                results
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  Previous
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-lightbulb text-blue-600 mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">
              Invitation Tips
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Invitations expire after 7 days</li>
              <li>• Users can be invited to multiple organizations</li>
              <li>• Organization admins can invite teachers and students</li>
              <li>
                • Use bulk invite for onboarding entire classes or departments
              </li>
              <li>• Check invitation status regularly and resend if needed</li>
            </ul>
          </div>
        </div>
      </div>

      <InvitationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        mode={modalMode}
        initialData={selectedUser || undefined}
        onSubmit={handleSubmitInvite}
      />
    </div>
  );
};

export default InviteUsers;
