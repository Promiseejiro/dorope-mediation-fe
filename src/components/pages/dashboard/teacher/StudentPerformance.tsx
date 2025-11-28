// components/dashboard/teacher/StudentPerformance.tsx
const StudentPerformance: React.FC = () => {
  const students = [
    { name: "John Smith", performance: 92, trend: "up" },
    { name: "Sarah Johnson", performance: 85, trend: "up" },
    { name: "Mike Brown", performance: 78, trend: "down" },
    { name: "Emily Davis", performance: 88, trend: "up" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Top Performing Students
      </h3>
      <div className="space-y-4">
        {students.map((student, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <span className="font-medium text-gray-900">{student.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">
                {student.performance}%
              </span>
              <i
                className={`fas fa-arrow-${student.trend} ${
                  student.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentPerformance;
