// components/pages/dashboard/student/AvailableExams.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number;
  totalMarks: number;
  status: "upcoming" | "ongoing" | "completed";
  startTime: string;
  endTime: string;
  instructions?: string;
  teacher?: string;
  attempted?: boolean;
}

const AvailableExams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      title: "Mathematics Midterm Examination",
      subject: "Mathematics",
      duration: 120,
      totalMarks: 100,
      status: "upcoming",
      startTime: "2024-01-15T10:00:00",
      endTime: "2024-01-15T12:00:00",
      instructions:
        "This exam covers chapters 1-5. Calculators are allowed but no internet access.",
      teacher: "Mr. Johnson",
    },
    {
      id: "2",
      title: "Science Weekly Quiz",
      subject: "Science",
      duration: 45,
      totalMarks: 50,
      status: "ongoing",
      startTime: "2024-01-10T09:00:00",
      endTime: "2024-01-10T17:00:00",
      instructions: "Multiple choice questions only. No negative marking.",
      teacher: "Dr. Smith",
    },
    {
      id: "3",
      title: "Physics Chapter Test - Motion",
      subject: "Physics",
      duration: 60,
      totalMarks: 75,
      status: "ongoing",
      startTime: "2024-01-08T08:00:00",
      endTime: "2024-01-12T23:59:00",
      instructions: "Show all your workings for calculation questions.",
      teacher: "Prof. Davis",
    },
    {
      id: "4",
      title: "Chemistry Periodic Table Quiz",
      subject: "Chemistry",
      duration: 30,
      totalMarks: 40,
      status: "upcoming",
      startTime: "2024-01-20T14:00:00",
      endTime: "2024-01-20T14:30:00",
      instructions: "Memorize the first 20 elements of periodic table.",
      teacher: "Mrs. Wilson",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "upcoming" | "ongoing">("all");

  const filteredExams = exams.filter(
    (exam) => filter === "all" || exam.status === filter
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: {
        color: "bg-blue-100 text-blue-800",
        text: "Upcoming",
        icon: "fa-clock",
      },
      ongoing: {
        color: "bg-green-100 text-green-800",
        text: "Available Now",
        icon: "fa-play-circle",
      },
      completed: {
        color: "bg-gray-100 text-gray-800",
        text: "Completed",
        icon: "fa-check",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${config.color} flex items-center space-x-1`}
      >
        <i className={`fas ${config.icon}`}></i>
        <span>{config.text}</span>
      </span>
    );
  };

  const getActionButton = (exam: Exam) => {
    switch (exam.status) {
      case "upcoming":
        return (
          <div className="lg:text-right">
            <Button variant="outline" disabled className="mb-2">
              <i className="fas fa-clock mr-2"></i>
              Starts Soon
            </Button>
            <p className="text-xs text-gray-500">
              Available: {new Date(exam.startTime).toLocaleDateString()}
            </p>
          </div>
        );
      case "ongoing":
        return (
          <div className="lg:text-right">
            <Button
              variant="primary"
              href={`/exam/start-exam/${exam.id}`}
              className="mb-2"
            >
              <i className="fas fa-play mr-2"></i>
              Start Exam
            </Button>
            <p className="text-xs text-gray-500 mt-4">
              Ends: {new Date(exam.endTime).toLocaleDateString()}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const getTimeRemaining = (endTime: string) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Time's up";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;

    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}m left`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start  lg:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Available Exams</h1>
          <p className="text-gray-600">Browse and take your assigned exams</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <i className="fas fa-info-circle"></i>
          <span>{filteredExams.length} exams found</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col lg:flex-row space-x-1">
          {[
            { key: "all", label: "All Exams", icon: "fa-list" },
            { key: "ongoing", label: "Available Now", icon: "fa-play-circle" },
            { key: "upcoming", label: "Upcoming", icon: "fa-clock" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <i className={`fas ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-2 justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {exam.title}
                  </h3>
                  <p className="text-gray-600 flex items-center space-x-2">
                    <i className="fas fa-book"></i>
                    <span>{exam.subject}</span>
                    <span>•</span>
                    <i className="fas fa-user"></i>
                    <span>{exam.teacher}</span>
                  </p>
                </div>
                {getStatusBadge(exam.status)}
              </div>

              {/* Exam Details */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <i className="fas fa-clock text-gray-400"></i>
                  <span>{exam.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <i className="fas fa-star text-gray-400"></i>
                  <span>{exam.totalMarks} marks</span>
                </div>
              </div>

              {/* Instructions */}
              {exam.instructions && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 flex items-start space-x-2">
                    <i className="fas fa-info-circle mt-0.5"></i>
                    <span>{exam.instructions}</span>
                  </p>
                </div>
              )}

              {/* Time Information */}
              <div className="flex flex-col lg:flex-row gap-4 justify-between  lg:items-center mb-4">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>
                      <i className="fas fa-play mr-1"></i>
                      {new Date(exam.startTime).toLocaleString()}
                    </span>
                    <span>
                      <i className="fas fa-stop mr-1"></i>
                      {new Date(exam.endTime).toLocaleString()}
                    </span>
                  </div>
                </div>
                {exam.status === "ongoing" && (
                  <div className="text-sm font-medium text-orange-600">
                    <i className="fas fa-hourglass-half mr-1"></i>
                    {getTimeRemaining(exam.endTime)}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Make sure you have stable internet connection
                </div>
                {getActionButton(exam)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredExams.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <i className="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No exams available
          </h3>
          <p className="text-gray-600 mb-4">
            {filter === "all"
              ? "You don't have any exams assigned yet."
              : `You don't have any ${filter} exams at the moment.`}
          </p>
          <Button variant="outline" onClick={() => setFilter("all")}>
            View All Exams
          </Button>
        </div>
      )}

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">
              Important Notes
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                • Ensure you have a stable internet connection before starting
                any exam
              </li>
              <li>• Once started, the timer cannot be paused</li>
              <li>• Answers are auto-saved as you progress through the exam</li>
              <li>• You cannot re-attempt an exam once submitted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableExams;
