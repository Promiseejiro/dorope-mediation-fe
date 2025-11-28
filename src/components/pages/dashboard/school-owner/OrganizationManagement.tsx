// components/dashboard/super-admin/OrganizationManagement.tsx
const OrganizationManagement: React.FC = () => {
  const organizations = [
    {
      id: 1,
      name: "Greenwood High School",
      users: 1247,
      plan: "Enterprise",
      status: "active",
    },
    {
      id: 2,
      name: "Riverside Academy",
      users: 845,
      plan: "Premium",
      status: "active",
    },
    {
      id: 3,
      name: "Sunrise College",
      users: 320,
      plan: "Basic",
      status: "trial",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Organization Management
      </h3>
      <div className="space-y-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-gray-900">{org.name}</h4>
              <p className="text-sm text-gray-500">
                {org.users} users • {org.plan} Plan
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  org.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {org.status}
              </span>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationManagement;
