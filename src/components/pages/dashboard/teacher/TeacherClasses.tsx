// components/teacher/TeacherClasses.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface Class {
  id: string;
  name: string;
  subject: string;
  students: number;
  activeExams: number;
}

const TeacherClasses: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: "1",
      name: "Mathematics Grade 10A",
      subject: "Mathematics",
      students: 32,
      activeExams: 2,
    },
    {
      id: "2",
      name: "Science Grade 10B",
      subject: "Science",
      students: 28,
      activeExams: 1,
    },
    {
      id: "3",
      name: "Physics Grade 11",
      subject: "Physics",
      students: 24,
      activeExams: 0,
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    subject: "",
    description: "",
  });

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    const newClassData: Class = {
      id: Date.now().toString(),
      name: newClass.name,
      subject: newClass.subject,
      students: 0,
      activeExams: 0,
    };
    setClasses([...classes, newClassData]);
    setNewClass({ name: "", subject: "", description: "" });
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
          <p className="text-gray-600">
            Manage your classes and student groups
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          className="flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Create Class
        </Button>
      </div>

      {/* Create Class Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Create New Class
          </h3>
          <form onSubmit={handleCreateClass} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                id="className"
                label="Class Name"
                placeholder="e.g., Mathematics Grade 10A"
                value={newClass.name}
                onChange={(e) =>
                  setNewClass({ ...newClass, name: e.target.value })
                }
              />
              <Input
                id="subject"
                label="Subject"
                placeholder="e.g., Mathematics"
                value={newClass.subject}
                onChange={(e) =>
                  setNewClass({ ...newClass, subject: e.target.value })
                }
              />
            </div>
            <Input
              id="description"
              label="Description (Optional)"
              placeholder="Class description..."
              value={newClass.description}
              onChange={(e) =>
                setNewClass({ ...newClass, description: e.target.value })
              }
            />
            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                Create Class
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

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <div
            key={classItem.id}
            className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-primary"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {classItem.name}
                </h3>
                <p className="text-gray-600">{classItem.subject}</p>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Students</span>
                <span className="font-medium text-gray-900">
                  {classItem.students}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Active Exams</span>
                <span
                  className={`font-medium ${
                    classItem.activeExams > 0
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {classItem.activeExams}
                </span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Students
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;
