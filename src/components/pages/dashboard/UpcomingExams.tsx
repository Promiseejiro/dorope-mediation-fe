// components/dashboard/UpcomingExams.tsx
import Link from "next/link";

const UpcomingExams: React.FC = () => {
  const upcomingExams = [
    {
      id: 1,
      title: "Mathematics Final Exam",
      date: "Dec 15, 2024",
      time: "10:00 AM - 12:00 PM",
      duration: "2 hours",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Science Practical Test",
      date: "Dec 18, 2024",
      time: "2:00 PM - 3:30 PM",
      duration: "1.5 hours",
      status: "scheduled",
    },
    {
      id: 3,
      title: "English Literature Quiz",
      date: "Dec 20, 2024",
      time: "9:00 AM - 10:00 AM",
      duration: "1 hour",
      status: "scheduled",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Exams</h3>
        <Link
          href="/dashboard/exams"
          className="text-sm text-primary hover:text-primary-dark font-medium"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {upcomingExams.map((exam) => (
          <div
            key={exam.id}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors"
          >
            <h4 className="font-medium text-gray-900 mb-2">{exam.title}</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center">
                <i className="fas fa-calendar mr-2 w-4"></i>
                <span>{exam.date}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-clock mr-2 w-4"></i>
                <span>{exam.time}</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-hourglass-half mr-2 w-4"></i>
                <span>{exam.duration}</span>
              </div>
            </div>
            <div className="mt-3 flex space-x-2">
              <button className="flex-1 bg-primary text-white py-2 px-3 rounded text-sm font-medium hover:bg-primary-dark transition-colors">
                Start Exam
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded hover:border-gray-400 transition-colors">
                <i className="fas fa-info-circle"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingExams;
