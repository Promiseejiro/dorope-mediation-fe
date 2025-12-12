// components/teacher/TeacherExams.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import DateTimePicker from "@/components/ui/DateTimePicker";

interface Exam {
  id: string;
  title: string;
  subject: string;
  class: string;
  duration: number;
  totalMarks: number;
  status: "draft" | "scheduled" | "active" | "completed";
  startDate: string;
  endDate: string;
  participants: number;
}

const TeacherExams: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      title: "Mathematics Final Exam",
      subject: "Mathematics",
      class: "Grade 10A",
      duration: 120,
      totalMarks: 100,
      status: "scheduled",
      startDate: "2024-12-15T10:00",
      endDate: "2024-12-15T12:00",
      participants: 32,
    },
    {
      id: "2",
      title: "Science Quiz",
      subject: "Science",
      class: "Grade 10B",
      duration: 45,
      totalMarks: 50,
      status: "draft",
      startDate: "2024-12-20T14:30",
      endDate: "2024-12-20T15:15",
      participants: 28,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState({
    status: "",
    subject: "",
  });

  const [newExam, setNewExam] = useState({
    title: "",
    subject: "",
    class: "",
    duration: 60,
    totalMarks: 100,
    startDate: "",
    endDate: "",
  });

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that end date is after start date
    if (new Date(newExam.endDate) <= new Date(newExam.startDate)) {
      alert("End date must be after start date");
      return;
    }

    const examData: Exam = {
      id: Date.now().toString(),
      title: newExam.title,
      subject: newExam.subject,
      class: newExam.class,
      duration: newExam.duration,
      totalMarks: newExam.totalMarks,
      status: "draft",
      startDate: newExam.startDate,
      endDate: newExam.endDate,
      participants: 0,
    };
    setExams([...exams, examData]);
    setNewExam({
      title: "",
      subject: "",
      class: "",
      duration: 60,
      totalMarks: 100,
      startDate: "",
      endDate: "",
    });
    setShowCreateForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredExams = exams.filter((exam) => {
    return (
      (filter.status === "" || exam.status === filter.status) &&
      (filter.subject === "" || exam.subject === filter.subject)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
          <p className="text-gray-600">Create and manage your assessments</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          className="flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Create Exam
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              value={filter.subject}
              onChange={(e) =>
                setFilter({ ...filter, subject: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Exam Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Exam
          </h3>
          <form onSubmit={handleCreateExam} className="space-y-4">
            <Input
              id="title"
              label="Exam Title"
              placeholder="e.g., Mathematics Final Exam"
              value={newExam.title}
              onChange={(e) =>
                setNewExam({ ...newExam, title: e.target.value })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="subject"
                label="Subject"
                placeholder="e.g., Mathematics"
                value={newExam.subject}
                onChange={(e) =>
                  setNewExam({ ...newExam, subject: e.target.value })
                }
              />
              <Input
                id="class"
                label="Class"
                placeholder="e.g., Grade 10A"
                value={newExam.class}
                onChange={(e) =>
                  setNewExam({ ...newExam, class: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                id="duration"
                label="Duration (minutes)"
                type="number"
                value={String(newExam.duration)}
                onChange={(e) =>
                  setNewExam({ ...newExam, duration: parseInt(e.target.value) })
                }
                // min="1"
              />
              <Input
                id="totalMarks"
                label="Total Marks"
                type="number"
                value={String(newExam.totalMarks)}
                onChange={(e) =>
                  setNewExam({
                    ...newExam,
                    totalMarks: parseInt(e.target.value),
                  })
                }
                // min="1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateTimePicker
                id="startDate"
                label="Start Date & Time"
                value={newExam.startDate}
                onChange={(value) =>
                  setNewExam({ ...newExam, startDate: value })
                }
                required
              />
              <DateTimePicker
                id="endDate"
                label="End Date & Time"
                value={newExam.endDate}
                onChange={(value) => setNewExam({ ...newExam, endDate: value })}
                required
                minDate={newExam.startDate} // End date must be after start date
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                Create Exam
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Exams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {exam.title}
                </h3>
                <p className="text-gray-600">
                  {exam.subject} • {exam.class}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  exam.status
                )}`}
              >
                {exam.status}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">
                  {exam.duration} minutes
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Marks</span>
                <span className="font-medium text-gray-900">
                  {exam.totalMarks}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Participants</span>
                <span className="font-medium text-gray-900">
                  {exam.participants} students
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(exam.startDate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(exam.endDate).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                {exam.status === "draft" ? "Edit" : "Manage"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherExams;
