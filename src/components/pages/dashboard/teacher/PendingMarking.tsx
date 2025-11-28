// components/dashboard/teacher/PendingMarking.tsx
import Link from "next/link";

const PendingMarking: React.FC = () => {
  const pendingExams = [
    { id: 1, title: "Mathematics Quiz", students: 8, due: "2 days ago" },
    { id: 2, title: "Science Midterm", students: 24, due: "1 day ago" },
    { id: 3, title: "English Essay", students: 5, due: "Today" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Pending Marking</h3>
        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
          {pendingExams.reduce((acc, exam) => acc + exam.students, 0)}
        </span>
      </div>
      <div className="space-y-3">
        {pendingExams.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{exam.title}</p>
              <p className="text-sm text-gray-500">
                {exam.students} students • Due {exam.due}
              </p>
            </div>
            <Link
              href={`/dashboard/marking/${exam.id}`}
              className="px-3 py-1 bg-primary text-white rounded text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Mark
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingMarking;
