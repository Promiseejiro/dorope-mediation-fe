// components/dashboard/student/AvailableExams.tsx
const AvailableExams: React.FC = () => {
  const exams = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      dueDate: "Dec 15, 2024",
      duration: "2 hours",
      status: "available",
    },
    {
      id: 2,
      title: "Science Practical Test",
      subject: "Science",
      dueDate: "Dec 18, 2024",
      duration: "1.5 hours",
      status: "available",
    },
    {
      id: 3,
      title: "English Literature Quiz",
      subject: "English",
      dueDate: "Dec 20, 2024",
      duration: "1 hour",
      status: "upcoming",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Available Exams
      </h3>
      <div className="space-y-4">
        {exams.map((exam) => (
          <div key={exam.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-900">{exam.title}</h4>
                <p className="text-sm text-gray-600">{exam.subject}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exam.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {exam.status === "available" ? "Available" : "Upcoming"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
              <span>Due: {exam.dueDate}</span>
              <span>Duration: {exam.duration}</span>
            </div>
            <button className="w-full bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-primary-dark transition-colors">
              {exam.status === "available" ? "Start Exam" : "View Details"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableExams;
