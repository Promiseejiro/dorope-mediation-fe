// components/dashboard/super-admin/UserManagement.tsx
const UserManagement: React.FC = () => {
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@school.edu",
      role: "super-admin",
      lastActive: "2 min ago",
    },
    {
      id: 2,
      name: "School Principal",
      email: "principal@school.edu",
      role: "admin",
      lastActive: "1 hour ago",
    },
    {
      id: 3,
      name: "Math Teacher",
      email: "teacher@school.edu",
      role: "teacher",
      lastActive: "30 min ago",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <span className="px-2 py-1 bg-primary text-white rounded-full text-xs font-medium">
          {users.length} users
        </span>
      </div>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="text-right">
              <span className="block text-sm font-medium text-gray-700 capitalize">
                {user.role}
              </span>
              <span className="text-xs text-gray-500">{user.lastActive}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
