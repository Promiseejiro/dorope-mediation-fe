// components/dashboard/admin/SchoolOverview.tsx
const SchoolOverview: React.FC = () => {
  const departments = [
    { name: "Mathematics", performance: 82, students: 320 },
    { name: "Science", performance: 78, students: 280 },
    { name: "Languages", performance: 75, students: 250 },
    { name: "Arts", performance: 85, students: 180 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Department Performance
      </h3>
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium text-gray-900">{dept.name}</span>
                <span className="text-sm text-gray-600">
                  {dept.performance}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${dept.performance}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {dept.students} students
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolOverview;
