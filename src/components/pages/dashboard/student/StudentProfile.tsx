// components/pages/dashboard/student/StudentProfile.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import DateInput from "@/components/ui/DateInput";
import { useRouter } from "next/navigation";

interface StudentProfile {
  id: string;
  name: string;
  email: string;
  studentId: string;
  class: string;
  grade: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  joinDate: string;
}

const StudentProfile: React.FC = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile>({
    id: "1",
    name: "John Smith",
    email: "john.smith@student.school.edu",
    studentId: "STU2024001",
    class: "Grade 10A",
    grade: "10",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "2007-05-15",
    address: "123 Main Street, City, State 12345",
    emergencyContact: "Jane Smith - +1 (555) 987-6543",
    joinDate: "2023-09-01",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<StudentProfile>({
    ...profile,
  });

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (field: keyof StudentProfile, value: string) => {
    setEditedProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Calculate min and max dates for date of birth (assuming students are between 10-25 years old)
  const getMinMaxDates = () => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 25,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
    const maxDate = new Date(
      today.getFullYear() - 10,
      today.getMonth(),
      today.getDate()
    )
      .toISOString()
      .split("T")[0];
    return { minDate, maxDate };
  };

  const { minDate, maxDate } = getMinMaxDates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row  justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">
            Manage your personal information and settings
          </p>
        </div>
        {!isEditing ? (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <i className="fas fa-edit mr-2"></i>
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {/* Profile Photo */}
            <div className="text-center mb-6">
              <div className="w-32 h-32 bg-linear-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                {profile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-gray-600">{profile.studentId}</p>
              <p className="text-sm text-gray-500">{profile.class}</p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Exams Taken</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Average Score</span>
                <span className="font-semibold text-green-600">85.2%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Member Since</span>
                <span className="font-semibold text-gray-900">
                  {new Date(profile.joinDate).getFullYear()}
                </span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h3 className="font-semibold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  router.push("/student/change-password");
                }}
              >
                <i className="fas fa-lock mr-3"></i>
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  router.push("/student/notification-settings");
                }}
              >
                <i className="fas fa-bell mr-3"></i>
                Notification Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <i className="fas fa-download mr-3"></i>
                Download Data
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Personal Information
            </h3>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <i className="fas fa-user text-gray-400"></i>
                  <span>Basic Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Full Name"
                    value={isEditing ? editedProfile.name : profile.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    id="studentId"
                    label="Student ID"
                    value={profile.studentId}
                    disabled
                  />
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    id="phone"
                    label="Phone Number"
                    value={isEditing ? editedProfile.phone : profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <i className="fas fa-graduation-cap text-gray-400"></i>
                  <span>Academic Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="class"
                    label="Class"
                    value={isEditing ? editedProfile.class : profile.class}
                    onChange={(e) => handleChange("class", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    id="grade"
                    label="Grade"
                    value={isEditing ? editedProfile.grade : profile.grade}
                    onChange={(e) => handleChange("grade", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <i className="fas fa-address-card text-gray-400"></i>
                  <span>Personal Details</span>
                </h4>
                <div className="space-y-4">
                  <DateInput
                    id="dateOfBirth"
                    label="Date of Birth"
                    value={
                      isEditing
                        ? editedProfile.dateOfBirth
                        : profile.dateOfBirth
                    }
                    onChange={(e) =>
                      handleChange("dateOfBirth", e.target.value)
                    }
                    disabled={!isEditing}
                    min={minDate}
                    max={maxDate}
                  />
                  <Input
                    id="address"
                    label="Address"
                    value={isEditing ? editedProfile.address : profile.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    id="emergencyContact"
                    label="Emergency Contact"
                    value={
                      isEditing
                        ? editedProfile.emergencyContact
                        : profile.emergencyContact
                    }
                    onChange={(e) =>
                      handleChange("emergencyContact", e.target.value)
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* System Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4 flex items-center space-x-2">
                  <i className="fas fa-info-circle text-gray-400"></i>
                  <span>System Information</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Account Created</p>
                    <p className="font-medium text-gray-900">
                      {new Date(profile.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Login</p>
                    <p className="font-medium text-gray-900">
                      {new Date().toLocaleDateString()} at{" "}
                      {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Mode Actions */}
            {isEditing && (
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <div className="flex items-start space-x-3">
              <i className="fas fa-shield-alt text-blue-600 mt-0.5"></i>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">
                  Security Notice
                </h4>
                <p className="text-sm text-blue-700">
                  Your personal information is secure and protected. We never
                  share your data with third parties. Keep your login
                  credentials safe and do not share them with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
