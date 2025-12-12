// components/pages/exam/ExamPage.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import SimpleRichTextEditor from "@/components/ui/SimpleRichTextEditor";

interface ExamPageProps {
  examId: string;
}

interface Question {
  id: string;
  type: "mcq" | "true-false" | "short-answer" | "essay";
  question: string;
  options?: string[];
  marks: number;
  answer?: string;
  answered?: boolean;
}

interface ExamState {
  questions: Question[];
  currentQuestionIndex: number;
  timeRemaining: number;
  isSubmitted: boolean;
  warnings: number;
}

const ExamPage: React.FC<ExamPageProps> = ({ examId }) => {
  const router = useRouter();
  const [examState, setExamState] = useState<ExamState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  // Security monitoring
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [visibilityState, setVisibilityState] = useState("visible");

  // Check authentication and initialize exam
  useEffect(() => {
    const initializeExam = async () => {
      const token = localStorage.getItem("examToken");
      const storedExamId = localStorage.getItem("currentExamId");
      const startTime = localStorage.getItem("examStartTime");

      if (!token || storedExamId !== examId || !startTime) {
        router.push(`/start-exam/${examId}`);
        return;
      }

      // Calculate time remaining
      const examDuration = 120 * 60 * 1000; // 2 hours in milliseconds
      const elapsed = Date.now() - parseInt(startTime);
      const timeRemaining = Math.max(examDuration - elapsed, 0);

      if (timeRemaining <= 0) {
        // Time's up
        handleAutoSubmit();
        return;
      }

      // Load exam questions
      try {
        const questions: Question[] = [
          {
            id: "1",
            type: "mcq",
            question: "What is the value of π (pi) approximately?",
            options: ["3.14", "2.71", "1.62", "4.67"],
            marks: 2,
          },
          {
            id: "2",
            type: "true-false",
            question: "The sum of angles in a triangle is 180 degrees.",
            options: ["True", "False"],
            marks: 1,
          },
          {
            id: "3",
            type: "short-answer",
            question: "Solve for x: 2x + 5 = 13",
            marks: 3,
          },
          {
            id: "4",
            type: "essay",
            question: "Explain the importance of mathematics in daily life.",
            marks: 10,
          },
        ];

        setExamState({
          questions,
          currentQuestionIndex: 0,
          timeRemaining,
          isSubmitted: false,
          warnings: 0,
        });

        enterFullScreen();
      } catch (error) {
        console.error("Error loading exam:", error);
        router.push(`/start-exam/${examId}`);
      } finally {
        setIsLoading(false);
      }
    };

    initializeExam();
  }, [examId, router]);

  // Tab visibility monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisibilityState("hidden");
        setTabSwitchCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 3) {
            handleAutoSubmit("Excessive tab switching detected");
          }
          return newCount;
        });

        // Show warning
        alert(
          "Warning: Tab switching detected. Multiple violations may result in automatic submission."
        );
      } else {
        setVisibilityState("visible");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!examState || examState.isSubmitted) return;

    const timer = setInterval(() => {
      setExamState((prev) => {
        if (!prev) return prev;

        const newTimeRemaining = prev.timeRemaining - 1000;

        if (newTimeRemaining <= 0) {
          handleAutoSubmit();
          return { ...prev, timeRemaining: 0, isSubmitted: true };
        }

        return { ...prev, timeRemaining: newTimeRemaining };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examState?.isSubmitted]);

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
      setFullScreen(true);
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    if (!examState) return;

    setExamState((prev) => {
      if (!prev) return prev;

      const updatedQuestions = prev.questions.map((q) =>
        q.id === questionId ? { ...q, answer, answered: true } : q
      );

      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleAutoSubmit = (reason?: string) => {
    if (examState?.isSubmitted) return;

    console.log("Auto-submitting exam:", reason);
    submitExam();
  };

  const submitExam = async () => {
    if (!examState) return;

    setIsSubmitting(true);

    try {
      // Save answers to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear exam session
      localStorage.removeItem("examToken");
      localStorage.removeItem("currentExamId");
      localStorage.removeItem("examStartTime");

      setExamState((prev) => (prev ? { ...prev, isSubmitted: true } : null));

      // Exit full screen
      exitFullScreen();

      // Show success message
      alert("Exam submitted successfully!");

      // Redirect to results or dashboard
      router.push("/dashboard/student");
    } catch (error) {
      console.error("Error submitting exam:", error);
      alert("Error submitting exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const currentQuestion = examState?.questions[examState.currentQuestionIndex];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-gray-300">Loading exam...</p>
        </div>
      </div>
    );
  }

  if (!examState || !currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold mb-2">Exam Error</h2>
          <p className="text-gray-300">
            Unable to load exam. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Exam Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Mathematics Final Exam</h1>
            <p className="text-gray-400 text-sm">
              Question {examState.currentQuestionIndex + 1} of{" "}
              {examState.questions.length}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Time Display */}
            <div
              className={`text-lg font-mono ${
                examState.timeRemaining < 300000
                  ? "text-red-400 animate-pulse"
                  : "text-green-400"
              }`}
            >
              <i className="fas fa-clock mr-2"></i>
              {formatTime(examState.timeRemaining)}
            </div>

            {/* Security Indicators */}
            <div className="flex items-center space-x-2 text-sm">
              <div
                className={`w-3 h-3 rounded-full ${
                  visibilityState === "visible" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span>Security: {tabSwitchCount} violations</span>
            </div>

            {/* Full Screen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={fullScreen ? exitFullScreen : enterFullScreen}
              className="text-white border-gray-600 hover:bg-gray-700"
            >
              <i
                className={`fas ${
                  fullScreen ? "fa-compress" : "fa-expand"
                } mr-2`}
              ></i>
              {fullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>
              {examState.questions.filter((q) => q.answered).length} /{" "}
              {examState.questions.length} answered
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (examState.questions.filter((q) => q.answered).length /
                    examState.questions.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {examState.questions.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setExamState((prev) =>
                    prev ? { ...prev, currentQuestionIndex: index } : null
                  )
                }
                className={`w-10 h-10 rounded-lg border text-sm font-medium transition-colors ${
                  index === examState.currentQuestionIndex
                    ? "bg-primary border-primary text-white"
                    : examState.questions[index].answered
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">
              Question {examState.currentQuestionIndex + 1}
            </h2>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {currentQuestion.marks} mark
              {currentQuestion.marks !== 1 ? "s" : ""}
            </span>
          </div>

          <p className="text-gray-300 mb-6 text-lg">
            {currentQuestion.question}
          </p>

          {/* Answer Input */}
          <div className="space-y-4">
            {currentQuestion.type === "mcq" && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option}
                      checked={currentQuestion.answer === option}
                      onChange={(e) =>
                        handleAnswerChange(currentQuestion.id, e.target.value)
                      }
                      className="text-primary focus:ring-primary border-gray-600 bg-gray-700"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "true-false" &&
              currentQuestion.options && (
                <div className="flex space-x-4">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-3 p-3 border border-gray-600 rounded-lg hover:bg-gray-700 cursor-pointer flex-1 text-center"
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={currentQuestion.answer === option}
                        onChange={(e) =>
                          handleAnswerChange(currentQuestion.id, e.target.value)
                        }
                        className="text-primary focus:ring-primary border-gray-600 bg-gray-700"
                      />
                      <span className="text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              )}

            {currentQuestion.type === "short-answer" && (
              <textarea
                value={currentQuestion.answer || ""}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.id, e.target.value)
                }
                placeholder="Type your short answer here..."
                className="w-full h-32 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 resize-none"
              />
            )}

            {currentQuestion.type === "essay" && (
              <SimpleRichTextEditor
                value={currentQuestion.answer || ""}
                onChange={(content) =>
                  handleAnswerChange(currentQuestion.id, content)
                }
                placeholder="Type your essay here... You can format your text using the toolbar above."
                disabled={isSubmitting}
              />
            )}
          </div>

          {/* Simple Formatting Tips for Essay */}
          {currentQuestion.type === "essay" && (
            <div className="mt-4 p-3 bg-gray-750 rounded-lg border border-gray-600">
              <p className="text-sm text-gray-300 font-medium mb-2">
                Formatting Tips:
              </p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Use the toolbar above to format your text</li>
                <li>• Click the eye icon to preview your answer</li>
                <li>• Structure your essay with clear paragraphs</li>
                <li>• Use lists for multiple points</li>
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() =>
              setExamState((prev) =>
                prev
                  ? {
                      ...prev,
                      currentQuestionIndex: Math.max(
                        0,
                        prev.currentQuestionIndex - 1
                      ),
                    }
                  : null
              )
            }
            disabled={examState.currentQuestionIndex === 0}
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Previous
          </Button>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                // Mark for review logic
                console.log("Marked for review");
              }}
              className="text-yellow-400 border-yellow-600 hover:bg-yellow-900"
            >
              <i className="fas fa-flag mr-2"></i>
              Mark for Review
            </Button>

            {examState.currentQuestionIndex < examState.questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() =>
                  setExamState((prev) =>
                    prev
                      ? {
                          ...prev,
                          currentQuestionIndex: Math.min(
                            prev.questions.length - 1,
                            prev.currentQuestionIndex + 1
                          ),
                        }
                      : null
                  )
                }
              >
                Next
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={submitExam}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Submit Exam
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Quick Navigation Panel */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-3">Question Summary</h3>
          <div className="grid grid-cols-5 gap-2 text-sm">
            {examState.questions.map((question, index) => (
              <div
                key={question.id}
                className={`p-2 rounded text-center cursor-pointer border ${
                  index === examState.currentQuestionIndex
                    ? "bg-primary border-primary text-white"
                    : question.answered
                    ? "bg-green-500 border-green-500 text-white"
                    : "bg-gray-700 border-gray-600 text-gray-300"
                }`}
                onClick={() =>
                  setExamState((prev) =>
                    prev ? { ...prev, currentQuestionIndex: index } : null
                  )
                }
              >
                {index + 1}
                {question.answered && (
                  <i className="fas fa-check ml-1 text-xs"></i>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center space-x-4 mt-3 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-700 rounded"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Warning Modal */}
      {tabSwitchCount > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <div className="text-center">
              <i className="fas fa-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">
                Security Warning
              </h3>
              <p className="text-gray-300 mb-4">
                Tab switching detected! This is a violation of exam rules.
                {tabSwitchCount >= 2 &&
                  " One more violation will result in automatic submission."}
              </p>
              <p className="text-sm text-gray-400 mb-4">
                Violations: {tabSwitchCount} / 3
              </p>
              <Button
                variant="primary"
                onClick={() => setVisibilityState("visible")}
                className="w-full"
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Low Time Warning */}
      {examState.timeRemaining < 300000 && examState.timeRemaining > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-40">
          <div className="flex items-center space-x-2">
            <i className="fas fa-exclamation-triangle"></i>
            <span className="font-semibold">
              Low Time! {formatTime(examState.timeRemaining)} remaining
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
