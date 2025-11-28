// components/dashboard/teacher/RecentClasses.tsx
const RecentClasses: React.FC = () => {
  const classes = [
    { id: 1, name: "Mathematics Grade 10A", students: 32, activeExams: 2 },
    { id: 2, name: "Science Grade 10B", students: 28, activeExams: 1 },
    { id: 3, name: "Physics Grade 11", students: 24, activeExams: 0 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Classes
      </h3>
      <div className="space-y-4">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <h4 className="font-medium text-gray-900">{classItem.name}</h4>
              <p className="text-sm text-gray-500">
                {classItem.students} students
              </p>
            </div>
            <div className="text-right">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  classItem.activeExams > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {classItem.activeExams} active exams
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClasses;
