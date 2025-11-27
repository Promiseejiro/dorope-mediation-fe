"use client";
import Link from "next/link";
import Button from "../../ui/Button";
import { UseCase } from "../../../../types";
import { useState } from "react";

const UseCasesSection: React.FC = () => {
  const [useCase, setUseCase] = useState<"business" | "education">("business");

  const businessUseCases: (UseCase & { icon: string })[] = [
    {
      title: "Recruitment",
      description:
        "Identify real talents without the hassle of time-consuming CV screening",
      icon: "fas fa-users",
    },
    {
      title: "Employee Assessments",
      description:
        "Online workforce assessments encourage your employees to grow and cultivate a positive team spirit",
      icon: "fas fa-chart-bar",
    },
    {
      title: "Training",
      description:
        "Evaluate skills and knowledge in a professional and distraction-free environment",
      icon: "fas fa-bullseye",
    },
    {
      title: "Sales Training",
      description:
        "Assess and improve sales team performance with targeted training assessments",
      icon: "fas fa-dollar-sign",
    },
    {
      title: "Customer Service",
      description:
        "Ensure your customer service team delivers exceptional support experiences",
      icon: "fas fa-headset",
    },
    {
      title: "Safety Procedures",
      description:
        "Test employee knowledge of safety protocols and compliance requirements",
      icon: "fas fa-shield-alt",
    },
  ];

  const educationUseCases: (UseCase & { icon: string })[] = [
    {
      title: "Quizzes",
      description:
        "Engage your remote students or connected classrooms in a way that's efficient and fun",
      icon: "fas fa-edit",
    },
    {
      title: "Exams",
      description:
        "Test skills and knowledge in a professional and no-distraction environment",
      icon: "fas fa-book",
    },
    {
      title: "Homework",
      description: "Give friendly and interactive after school assignments",
      icon: "fas fa-home",
    },
    {
      title: "Competition",
      description:
        "Experience learners, showcase skills and foster healthy academic competition",
      icon: "fas fa-trophy",
    },
    {
      title: "Formative Assessment",
      description:
        "Provide immediate feedback to guide student learning and improvement",
      icon: "fas fa-chart-line",
    },
    {
      title: "Course Evaluation",
      description:
        "Gather student feedback to improve teaching methods and course content",
      icon: "fas fa-star",
    },
  ];

  const currentUseCases =
    useCase === "business" ? businessUseCases : educationUseCases;

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto px-4">
        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-12">
          <div className="relative flex bg-gray-100 rounded-xl px-2 py-1 border border-gray-300 shadow-sm">
            <div
              className={`absolute top-1 bottom-1 rounded-lg bg-white shadow-sm border border-gray-200 transition-all duration-300 ease-in-out ${
                useCase === "business"
                  ? "left-2 w-[calc(50%-0.5rem)]"
                  : "left-[calc(50%+0.5rem)] w-[calc(50%-0.5rem)]"
              }`}
            />

            <button
              onClick={() => setUseCase("business")}
              className={`relative z-10 px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
                useCase === "business"
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="fas fa-briefcase text-lg"></i>
              Business
            </button>

            <button
              onClick={() => setUseCase("education")}
              className={`relative z-10 px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 min-w-[140px] justify-center ${
                useCase === "education"
                  ? "text-primary font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <i className="fas fa-graduation-cap text-lg"></i>
              Education
            </button>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          {useCase === "business"
            ? "Business Use Cases"
            : "Education Use Cases"}
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {useCase === "business"
            ? "Streamline your business processes with our comprehensive assessment solutions"
            : "Enhance learning experiences with our interactive educational assessment tools"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentUseCases.map((useCaseItem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="text-2xl text-primary mb-4 ">
                <i className={useCaseItem.icon}></i>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                {useCaseItem.title}
              </h3>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {useCaseItem.description}
              </p>

              <Link href="#">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium group/link"
                >
                  Learn more
                  <i className="fas fa-arrow-right ml-2 group-hover/link:translate-x-1 transition-transform duration-300"></i>
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to get started with{" "}
            {useCase === "business" ? "business" : "educational"} assessments?
          </p>
          <Link
            href={useCase === "business" ? "/business-demo" : "/education-demo"}
          >
            <Button variant="primary" size="lg">
              Get Started Free
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
