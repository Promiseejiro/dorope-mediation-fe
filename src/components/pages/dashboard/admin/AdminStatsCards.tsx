// components/dashboard/admin/AdminStatsCards.tsx
const AdminStatsCards: React.FC = () => {
  const stats = [
    {
      label: "Total Students",
      value: "1,247",
      icon: "fas fa-user-graduate",
      color: "blue",
    },
    {
      label: "Teaching Staff",
      value: "48",
      icon: "fas fa-chalkboard-teacher",
      color: "green",
    },
    {
      label: "Active Exams",
      value: "12",
      icon: "fas fa-file-alt",
      color: "purple",
    },
    {
      label: "School Performance",
      value: "76%",
      icon: "fas fa-chart-line",
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

export default AdminStatsCards;
