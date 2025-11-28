// components/dashboard/student/StudentStatsCards.tsx
const StudentStatsCards: React.FC = () => {
  const stats = [
    {
      label: "Upcoming Exams",
      value: "3",
      icon: "fas fa-calendar",
      color: "blue",
    },
    {
      label: "Completed Exams",
      value: "15",
      icon: "fas fa-check",
      color: "green",
    },
    {
      label: "Average Score",
      value: "82%",
      icon: "fas fa-chart-line",
      color: "purple",
    },
    {
      label: "Class Rank",
      value: "3rd",
      icon: "fas fa-trophy",
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

export default StudentStatsCards;
