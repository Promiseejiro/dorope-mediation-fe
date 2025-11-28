// components/dashboard/teacher/UpcomingExams.tsx
const UpcomingExams: React.FC = () => {
  const exams = [
    {
      id: 1,
      title: "Physics Final",
      date: "Dec 20, 2024",
      class: "Grade 11 Physics",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Chemistry Quiz",
      date: "Dec 22, 2024",
      class: "Grade 10 Science",
      status: "draft",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        My Upcoming Exams
      </h3>
      <div className="space-y-3">
        {exams.map((exam) => (
          <div key={exam.id} className="p-3 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">{exam.title}</h4>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exam.status === "scheduled"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {exam.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exam.class}</p>
            <p className="text-xs text-gray-500">Scheduled: {exam.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingExams;
