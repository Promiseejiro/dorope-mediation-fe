// components/dashboard/RecentActivity.tsx
const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      type: "exam_created",
      message: "You created a new exam: Mathematics Final",
      time: "2 hours ago",
      icon: "fas fa-file-alt",
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "student_submission",
      message: "John Smith submitted the Science Quiz",
      time: "4 hours ago",
      icon: "fas fa-check-circle",
      color: "text-green-500",
    },
    {
      id: 3,
      type: "exam_published",
      message: "English Literature exam is now available to students",
      time: "1 day ago",
      icon: "fas fa-bullhorn",
      color: "text-purple-500",
    },
    {
      id: 4,
      type: "results_ready",
      message: "Physics Midterm results are ready",
      time: "2 days ago",
      icon: "fas fa-chart-bar",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary-dark font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
              <i className={`${activity.icon} ${activity.color} text-sm`}></i>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
