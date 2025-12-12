// components/teacher/TeacherMarking.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface Submission {
  id: string;
  studentName: string;
  examTitle: string;
  submittedAt: string;
  status: "pending" | "in-progress" | "completed";
  score?: number;
  totalMarks: number;
}

const TeacherMarking: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      studentName: "John Smith",
      examTitle: "Mathematics Quiz",
      submittedAt: "2024-12-10T14:30:00",
      status: "pending",
      totalMarks: 20,
    },
    {
      id: "2",
      studentName: "Sarah Johnson",
      examTitle: "Science Midterm",
      submittedAt: "2024-12-10T10:15:00",
      status: "in-progress",
      totalMarks: 100,
    },
    {
      id: "3",
      studentName: "Mike Brown",
      examTitle: "English Essay",
      submittedAt: "2024-12-09T16:45:00",
      status: "completed",
      score: 85,
      totalMarks: 100,
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [currentScore, setCurrentScore] = useState(0);

  const handleStartMarking = (submission: Submission) => {
    setSelectedSubmission(submission);
    setCurrentScore(submission.score || 0);
  };

  const handleSaveScore = () => {
    if (selectedSubmission) {
      setSubmissions(
        submissions.map((sub) =>
          sub.id === selectedSubmission.id
            ? { ...sub, score: currentScore, status: "completed" as const }
            : sub
        )
      );
      setSelectedSubmission(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marking</h1>
          <p className="text-gray-600">Review and grade student submissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Pending: {submissions.filter((s) => s.status === "pending").length}
          </span>
          <Button variant="outline">
            <i className="fas fa-download mr-2"></i>
            Export Grades
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Submissions ({submissions.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-6 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStartMarking(submission)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {submission.studentName}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {submission.examTitle}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {submission.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>
                      Submitted:{" "}
                      {new Date(submission.submittedAt).toLocaleDateString()}
                    </span>
                    <span>Total: {submission.totalMarks} marks</span>
                  </div>
                  {submission.score !== undefined && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          Score
                        </span>
                        <span className="font-bold text-green-600">
                          {submission.score}/{submission.totalMarks}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marking Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedSubmission ? "Mark Submission" : "Select a Submission"}
            </h3>

            {selectedSubmission ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Score
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={selectedSubmission.totalMarks}
                    value={currentScore}
                    onChange={(e) => setCurrentScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">0</span>
                    <span className="text-lg font-bold text-primary">
                      {currentScore}
                    </span>
                    <span className="text-sm text-gray-600">
                      {selectedSubmission.totalMarks}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Comments
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Add feedback for the student..."
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={handleSaveScore}
                    className="flex-1"
                  >
                    Save Score
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSubmission(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <i className="fas fa-file-alt text-4xl mb-3 opacity-50"></i>
                <p>Select a submission to start marking</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherMarking;
