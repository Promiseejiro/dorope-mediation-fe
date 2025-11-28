// components/dashboard/student/ExamHistory.tsx
const ExamHistory: React.FC = () => {
  const exams = [
    {
      id: 1,
      title: "Mathematics Quiz",
      date: "Dec 10, 2024",
      score: 85,
      total: 100,
    },
    {
      id: 2,
      title: "Science Test",
      date: "Dec 5, 2024",
      score: 92,
      total: 100,
    },
    {
      id: 3,
      title: "English Assignment",
      date: "Nov 28, 2024",
      score: 78,
      total: 100,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam History</h3>
      <div className="space-y-3">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{exam.title}</p>
              <p className="text-sm text-gray-500">Completed: {exam.date}</p>
            </div>
            <div className="text-right">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exam.score >= 80
                    ? "bg-green-100 text-green-800"
                    : exam.score >= 70
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {exam.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamHistory;
