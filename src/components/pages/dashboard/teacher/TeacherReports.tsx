// components/teacher/TeacherReports.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

interface ReportData {
  examTitle: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  totalStudents: number;
  completedStudents: number;
}

const TeacherReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string>("overview");
  const [dateRange, setDateRange] = useState({
    start: "2024-12-01",
    end: "2024-12-31",
  });

  const reportData: ReportData[] = [
    {
      examTitle: "Mathematics Final Exam",
      averageScore: 78,
      highestScore: 95,
      lowestScore: 45,
      passRate: 85,
      totalStudents: 32,
      completedStudents: 30,
    },
    {
      examTitle: "Science Quiz",
      averageScore: 82,
      highestScore: 98,
      lowestScore: 60,
      passRate: 92,
      totalStudents: 28,
      completedStudents: 28,
    },
    {
      examTitle: "English Assignment",
      averageScore: 75,
      highestScore: 92,
      lowestScore: 55,
      passRate: 80,
      totalStudents: 32,
      completedStudents: 29,
    },
  ];

  const overallStats = {
    totalExams: reportData.length,
    averageScore: Math.round(
      reportData.reduce((acc, curr) => acc + curr.averageScore, 0) /
        reportData.length
    ),
    totalStudents: reportData.reduce(
      (acc, curr) => acc + curr.totalStudents,
      0
    ),
    overallPassRate: Math.round(
      reportData.reduce((acc, curr) => acc + curr.passRate, 0) /
        reportData.length
    ),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            View performance insights and analytics
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <span className="flex items-center text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <Button variant="primary" className="flex items-center">
            <i className="fas fa-download mr-2"></i>
            Export Report
          </Button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex space-x-4">
          {[
            { id: "overview", name: "Overview", icon: "fas fa-chart-pie" },
            {
              id: "performance",
              name: "Performance",
              icon: "fas fa-chart-line",
            },
            { id: "students", name: "Students", icon: "fas fa-user-graduate" },
            { id: "exams", name: "Exams", icon: "fas fa-file-alt" },
          ].map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedReport === report.id
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <i className={report.icon}></i>
              <span>{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      {selectedReport === "overview" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {overallStats.totalExams}
              </div>
              <div className="text-sm text-gray-600">Total Exams</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">
                {overallStats.averageScore}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {overallStats.totalStudents}
              </div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">
                {overallStats.overallPassRate}%
              </div>
              <div className="text-sm text-gray-600">Overall Pass Rate</div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Exam Performance
            </h3>
            <div className="space-y-4">
              {reportData.map((exam, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {exam.examTitle}
                      </span>
                      <span className="text-sm text-gray-600">
                        {exam.averageScore}% Average
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: `${exam.averageScore}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>
                        {exam.completedStudents}/{exam.totalStudents} students
                      </span>
                      <span>{exam.passRate}% pass rate</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Exam Results Summary
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Highest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lowest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pass Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reportData.map((exam, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {exam.examTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">
                      {exam.averageScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
                    {exam.highestScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600 font-medium">
                    {exam.lowestScore}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">
                      {exam.passRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">
                      {exam.completedStudents}/{exam.totalStudents}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherReports;
