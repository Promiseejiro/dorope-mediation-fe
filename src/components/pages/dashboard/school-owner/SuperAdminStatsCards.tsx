// components/dashboard/super-admin/SuperAdminStatsCards.tsx
const SuperAdminStatsCards: React.FC = () => {
  const stats = [
    {
      label: "Total Organizations",
      value: "24",
      icon: "fas fa-building",
      color: "blue",
    },
    {
      label: "Active Users",
      value: "2,847",
      icon: "fas fa-users",
      color: "green",
    },
    {
      label: "Platform Uptime",
      value: "99.9%",
      icon: "fas fa-server",
      color: "purple",
    },
    {
      label: "Revenue",
      value: "$45.2K",
      icon: "fas fa-dollar-sign",
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary"
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
              <i className={`${stat.icon} text-${stat.color}-500 text-lg`}></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuperAdminStatsCards;
