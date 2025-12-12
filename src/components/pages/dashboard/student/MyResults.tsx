// components/pages/dashboard/student/MyResults.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import AnimatedModalLayout from "@/components/layout/animatedModalLayout";

interface Result {
  id: string;
  examId: string;
  examTitle: string;
  subject: string;
  completedDate: string;
  totalMarks: number;
  score: number;
  percentage: number;
  grade: string;
  status: "pass" | "fail";
  teacherFeedback?: string;
  timeSpent: number; // in minutes
  correctAnswers: number;
  totalQuestions: number;
}

const MyResults: React.FC = () => {
  const [results, setResults] = useState<Result[]>([
    {
      id: "1",
      examId: "3",
      examTitle: "Physics Chapter Test - Motion",
      subject: "Physics",
      completedDate: "2024-01-05T11:00:00",
      totalMarks: 75,
      score: 68,
      percentage: 90.7,
      grade: "A",
      status: "pass",
      teacherFeedback:
        "Excellent work on the practical questions. Your understanding of motion concepts is very good. Keep it up!",
      timeSpent: 52,
      correctAnswers: 34,
      totalQuestions: 38,
    },
    {
      id: "2",
      examId: "4",
      examTitle: "Chemistry Periodic Table Quiz",
      subject: "Chemistry",
      completedDate: "2024-01-03T15:30:00",
      totalMarks: 40,
      score: 36,
      percentage: 90.0,
      grade: "A-",
      status: "pass",
      teacherFeedback:
        "Good understanding of chemical elements and their properties. Practice more on transition metals.",
      timeSpent: 25,
      correctAnswers: 18,
      totalQuestions: 20,
    },
    {
      id: "3",
      examId: "5",
      examTitle: "Mathematics Algebra Basics",
      subject: "Mathematics",
      completedDate: "2023-12-20T10:30:00",
      totalMarks: 50,
      score: 35,
      percentage: 70.0,
      grade: "C+",
      status: "pass",
      timeSpent: 45,
      correctAnswers: 14,
      totalQuestions: 20,
    },
    {
      id: "4",
      examId: "6",
      examTitle: "Biology Cell Structure",
      subject: "Biology",
      completedDate: "2023-12-15T14:20:00",
      totalMarks: 60,
      score: 42,
      percentage: 70.0,
      grade: "B-",
      status: "pass",
      teacherFeedback:
        "Good effort. Focus more on organelle functions for better scores.",
      timeSpent: 38,
      correctAnswers: 21,
      totalQuestions: 30,
    },
  ]);

  const [selectedResult, setSelectedResult] = useState<Result | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "score" | "subject">("date");

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return (
          new Date(b.completedDate).getTime() -
          new Date(a.completedDate).getTime()
        );
      case "score":
        return b.percentage - a.percentage;
      case "subject":
        return a.subject.localeCompare(b.subject);
      default:
        return 0;
    }
  });

  const getStatusBadge = (status: string) => {
    return status === "pass" ? (
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center space-x-1">
        <i className="fas fa-check-circle"></i>
        <span>Passed</span>
      </span>
    ) : (
      <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center space-x-1">
        <i className="fas fa-times-circle"></i>
        <span>Failed</span>
      </span>
    );
  };

  const getGradeColor = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      A: "text-green-600 bg-green-100",
      "A-": "text-green-600 bg-green-100",
      "B+": "text-blue-600 bg-blue-100",
      B: "text-blue-600 bg-blue-100",
      "B-": "text-blue-600 bg-blue-100",
      "C+": "text-yellow-600 bg-yellow-100",
      C: "text-yellow-600 bg-yellow-100",
      D: "text-orange-600 bg-orange-100",
      F: "text-red-600 bg-red-100",
    };
    return gradeColors[grade] || "text-gray-600 bg-gray-100";
  };

  const getPerformanceStats = () => {
    const totalExams = results.length;
    const averageScore =
      results.reduce((acc, result) => acc + result.percentage, 0) / totalExams;
    const passedExams = results.filter((r) => r.status === "pass").length;
    const bestScore = Math.max(...results.map((r) => r.percentage));
    const bestExam = results.find((r) => r.percentage === bestScore);

    return { totalExams, averageScore, passedExams, bestScore, bestExam };
  };

  const stats = getPerformanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Results</h1>
          <p className="text-gray-600">
            Track your exam performance and progress
          </p>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <i className="fas fa-chart-line text-blue-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.averageScore.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <i className="fas fa-check-circle text-green-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Exams Passed</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.passedExams}/{stats.totalExams}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <i className="fas fa-trophy text-purple-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Best Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.bestScore.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <i className="fas fa-clock text-orange-600"></i>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {((stats.totalExams / (stats.totalExams + 2)) * 100).toFixed(0)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">Exam Results</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date">Most Recent</option>
              <option value="score">Highest Score</option>
              <option value="subject">Subject</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {sortedResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col  lg:flex-row gap-4 items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {result.examTitle}
                  </h3>
                  {getStatusBadge(result.status)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-book text-gray-400"></i>
                    <span className="text-gray-600">Subject:</span>
                    <span className="font-medium text-gray-900">
                      {result.subject}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-calendar text-gray-400"></i>
                    <span className="text-gray-600">Completed:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(result.completedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-clock text-gray-400"></i>
                    <span className="text-gray-600">Time Spent:</span>
                    <span className="font-medium text-gray-900">
                      {result.timeSpent}m
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-check-circle text-gray-400"></i>
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-medium text-gray-900">
                      {(
                        (result.correctAnswers / result.totalQuestions) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>

                {/* Score and Grade */}
                <div className="flex items-center space-x-6 mb-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {result.score}/{result.totalMarks}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {result.percentage}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Grade</p>
                    <p
                      className={`text-2xl font-bold px-3 py-1 rounded-lg ${getGradeColor(
                        result.grade
                      )}`}
                    >
                      {result.grade}
                    </p>
                  </div>
                </div>

                {/* Teacher Feedback */}
                {result.teacherFeedback && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-800 mb-1 flex items-center space-x-2">
                      <i className="fas fa-comment"></i>
                      <span>Teacher Feedback</span>
                    </p>
                    <p className="text-sm text-blue-700">
                      {result.teacherFeedback}
                    </p>
                  </div>
                )}
              </div>

              <div className="lg:ml-6 flex flex-col lg:space-y-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedResult(result)}
                  className="whitespace-nowrap"
                >
                  <i className="fas fa-eye mr-2"></i>
                  View Details
                </Button>
                <Button variant="link" className="text-sm">
                  <i className="fas fa-download mr-2"></i>
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {results.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <i className="fas fa-chart-line text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No results available
          </h3>
          <p className="text-gray-600 mb-4">
            You haven't completed any exams yet.
          </p>
          <Button variant="primary" href="/dashboard/student/available-exams">
            Browse Available Exams
          </Button>
        </div>
      )}

      {/* Result Detail Modal */}
      {selectedResult && (
        <AnimatedModalLayout
          maxWidth={896}
          children={
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedResult.examTitle} - Detailed Results
                  </h3>
                  <button
                    onClick={() => setSelectedResult(null)}
                    className="text-gray-400 hover:text-gray-600 text-xl"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Performance Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Final Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedResult.score}/{selectedResult.totalMarks}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Percentage</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedResult.percentage}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Grade</p>
                    <p
                      className={`text-2xl font-bold ${
                        getGradeColor(selectedResult.grade).split(" ")[0]
                      }`}
                    >
                      {selectedResult.grade}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <div className="mt-1">
                      {getStatusBadge(selectedResult.status)}
                    </div>
                  </div>
                </div>

                {/* Exam Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Exam Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subject:</span>
                        <span className="font-medium">
                          {selectedResult.subject}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed Date:</span>
                        <span className="font-medium">
                          {new Date(
                            selectedResult.completedDate
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time Spent:</span>
                        <span className="font-medium">
                          {selectedResult.timeSpent} minutes
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Questions Correct:
                        </span>
                        <span className="font-medium">
                          {selectedResult.correctAnswers}/
                          {selectedResult.totalQuestions}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Performance Metrics
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Accuracy Rate</span>
                          <span className="font-medium">
                            {(
                              (selectedResult.correctAnswers /
                                selectedResult.totalQuestions) *
                              100
                            ).toFixed(1)}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (selectedResult.correctAnswers /
                                  selectedResult.totalQuestions) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">
                            Score Percentage
                          </span>
                          <span className="font-medium">
                            {selectedResult.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${selectedResult.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Teacher Feedback */}
                {selectedResult.teacherFeedback && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Teacher Feedback
                    </h4>
                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                      {selectedResult.teacherFeedback}
                    </p>
                  </div>
                )}

                <div className="flex flex-col-reverse gap-4 lg:flex-row justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedResult(null)}
                  >
                    Close
                  </Button>
                  <Button variant="primary">
                    <i className="fas fa-download mr-2"></i>
                    Download Result
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default MyResults;
