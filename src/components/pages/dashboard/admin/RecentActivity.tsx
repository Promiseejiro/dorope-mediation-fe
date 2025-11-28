// components/dashboard/admin/RecentActivity.tsx
const RecentActivity: React.FC = () => {
  const activities = [
    { action: "Teacher added", user: "Dr. James Wilson", time: "10:30 AM" },
    {
      action: "Exam published",
      user: "Mathematics Department",
      time: "Yesterday",
    },
    { action: "Student batch imported", user: "Admin", time: "2 days ago" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.action}</p>
              <p className="text-xs text-gray-500">
                By {activity.user} • {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
