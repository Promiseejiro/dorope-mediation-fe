// components/teacher/TeacherQuestionBank.tsx
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";

interface Question {
  id: string;
  question: string;
  type: "mcq" | "true-false" | "short-answer" | "essay";
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  marks: number;
  options?: string[];
  correctAnswer: string;
}

const TeacherQuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the capital of France?",
      type: "mcq",
      subject: "Geography",
      difficulty: "easy",
      marks: 2,
      options: ["London", "Paris", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    },
    {
      id: "2",
      question: "The Earth is flat.",
      type: "true-false",
      subject: "Science",
      difficulty: "easy",
      marks: 1,
      correctAnswer: "false",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    subject: "",
    type: "",
    difficulty: "",
  });

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    type: "mcq",
    subject: "",
    difficulty: "medium",
    marks: 1,
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const questionData: Question = {
      id: Date.now().toString(),
      question: newQuestion.question,
      type: newQuestion.type as any,
      subject: newQuestion.subject,
      difficulty: newQuestion.difficulty as any,
      marks: newQuestion.marks,
      options: newQuestion.type === "mcq" ? newQuestion.options : undefined,
      correctAnswer: newQuestion.correctAnswer,
    };
    setQuestions([...questions, questionData]);
    setNewQuestion({
      question: "",
      type: "mcq",
      subject: "",
      difficulty: "medium",
      marks: 1,
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setShowCreateForm(false);
  };

  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const filteredQuestions = questions.filter((question) => {
    return (
      (filter.subject === "" || question.subject === filter.subject) &&
      (filter.type === "" || question.type === filter.type) &&
      (filter.difficulty === "" || question.difficulty === filter.difficulty)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-600">
            Manage and organize your assessment questions
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setShowCreateForm(true)}
          className="flex items-center"
        >
          <i className="fas fa-plus mr-2"></i>
          Add Question
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <option value="History">History</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question Type
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="mcq">Multiple Choice</option>
              <option value="true-false">True/False</option>
              <option value="short-answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <select
              value={filter.difficulty}
              onChange={(e) =>
                setFilter({ ...filter, difficulty: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Create Question Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Add New Question
          </h3>
          <form onSubmit={handleCreateQuestion} className="space-y-4">
            <Input
              id="question"
              label="Question"
              placeholder="Enter your question here..."
              value={newQuestion.question}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, question: e.target.value })
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newQuestion.type}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="mcq">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                  <option value="essay">Essay</option>
                </select>
              </div>
              <Input
                id="subject"
                label="Subject"
                placeholder="e.g., Mathematics"
                value={newQuestion.subject}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, subject: e.target.value })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  value={newQuestion.difficulty}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      difficulty: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {newQuestion.type === "mcq" && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {newQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      value={option}
                      checked={newQuestion.correctAnswer === option}
                      onChange={(e) =>
                        setNewQuestion({
                          ...newQuestion,
                          correctAnswer: e.target.value,
                        })
                      }
                      className="text-primary focus:ring-primary"
                    />
                    <Input
                      id={`option-${index}`}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...newQuestion.options];
                        newOptions[index] = e.target.value;
                        setNewQuestion({ ...newQuestion, options: newOptions });
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {newQuestion.type !== "mcq" && (
              <Input
                id="correctAnswer"
                label="Correct Answer"
                placeholder="Enter the correct answer..."
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    correctAnswer: e.target.value,
                  })
                }
              />
            )}

            <Input
              id="marks"
              label="Marks"
              type="number"
              value={String(newQuestion.marks)}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  marks: parseInt(e.target.value),
                })
              }
            />

            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                Add Question
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

      {/* Questions List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Questions ({filteredQuestions.length})
            </h3>
            {selectedQuestions.length > 0 && (
              <Button variant="outline" size="sm">
                Delete Selected ({selectedQuestions.length})
              </Button>
            )}
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredQuestions.map((question) => (
            <div key={question.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <Checkbox
                  id={`question-${question.id}`}
                  checked={selectedQuestions.includes(question.id)}
                  onChange={() => toggleQuestionSelection(question.id)}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {question.question}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          question.difficulty === "easy"
                            ? "bg-green-100 text-green-800"
                            : question.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {question.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {question.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {question.subject} • {question.marks} marks
                  </p>
                  {question.options && (
                    <div className="space-y-1">
                      {question.options.map((option, index) => (
                        <p
                          key={index}
                          className={`text-sm ${
                            option === question.correctAnswer
                              ? "text-green-600 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Use in Exam
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherQuestionBank;
