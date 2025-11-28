// components/dashboard/student/ProgressTracking.tsx
const ProgressTracking: React.FC = () => {
  const subjects = [
    { name: "Mathematics", progress: 85, trend: "up" },
    { name: "Science", progress: 78, trend: "up" },
    { name: "English", progress: 82, trend: "stable" },
    { name: "History", progress: 65, trend: "down" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Subject Progress
      </h3>
      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                {subject.name}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-gray-900">
                  {subject.progress}%
                </span>
                <i
                  className={`fas fa-arrow-${subject.trend} ${
                    subject.trend === "up"
                      ? "text-green-500"
                      : subject.trend === "down"
                      ? "text-red-500"
                      : "text-gray-500"
                  } text-xs`}
                ></i>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  subject.progress >= 80
                    ? "bg-green-500"
                    : subject.progress >= 70
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracking;
