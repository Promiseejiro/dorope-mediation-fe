// components/dashboard/StatsCards.tsx
interface StatsCardsProps {
  userRole: string;
}

const StatsCards: React.FC<StatsCardsProps> = ({ userRole }) => {
  const adminStats = [
    {
      label: "Total Organizations",
      value: "12",
      icon: "fas fa-building",
      color: "blue",
    },
    {
      label: "Active Teachers",
      value: "45",
      icon: "fas fa-chalkboard-teacher",
      color: "green",
    },
    {
      label: "Total Students",
      value: "1,234",
      icon: "fas fa-user-graduate",
      color: "purple",
    },
    {
      label: "Exams This Month",
      value: "28",
      icon: "fas fa-file-alt",
      color: "orange",
    },
  ];

  const teacherStats = [
    { label: "My Classes", value: "6", icon: "fas fa-users", color: "blue" },
    {
      label: "Active Exams",
      value: "3",
      icon: "fas fa-file-alt",
      color: "green",
    },
    {
      label: "Pending Marking",
      value: "12",
      icon: "fas fa-check-circle",
      color: "orange",
    },
    {
      label: "Student Average",
      value: "78%",
      icon: "fas fa-chart-line",
      color: "purple",
    },
  ];

  const studentStats = [
    {
      label: "Upcoming Exams",
      value: "2",
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
      label: "Rank in Class",
      value: "3rd",
      icon: "fas fa-trophy",
      color: "orange",
    },
  ];

  const stats =
    userRole === "admin"
      ? adminStats
      : userRole === "teacher"
      ? teacherStats
      : studentStats;

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary"
        >
          <div className="flex items-center">
            <div
              className={`p-3 rounded-lg ${getColorClasses(
                stat.color
              )} bg-opacity-10`}
            >
              <i
                className={`${stat.icon} ${getColorClasses(
                  stat.color
                )} text-lg`}
              ></i>
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

export default StatsCards;
