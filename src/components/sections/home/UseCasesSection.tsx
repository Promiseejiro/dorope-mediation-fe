"use client";
import Link from "next/link";
import Button from "../../ui/Button";
import { UseCase } from "../../../types";
import { useState } from "react";
import UseCaseTabs from "../../ui/UseCaseTabs";

const UseCasesSection: React.FC = () => {
  const [useCase, setUseCase] = useState("business");

  const tabs = [
    { Name: "Business", value: "business", icon: "fas fa-briefcase" },
    { Name: "Education", value: "education", icon: "fas fa-graduation-cap" },
  ];

  const businessUseCases: (UseCase & { icon: string })[] = [
    {
      title: "Recruitment",
      description: "Identify real talents without...",
      icon: "fas fa-users",
    },
    {
      title: "Employee Assessments",
      description: "Online workforce assessments...",
      icon: "fas fa-chart-bar",
    },
    {
      title: "Training",
      description: "Evaluate skills and knowledge...",
      icon: "fas fa-bullseye",
    },
    {
      title: "Sales Training",
      description: "Assess and improve sales...",
      icon: "fas fa-dollar-sign",
    },
    {
      title: "Customer Service",
      description: "Ensure your support team excels...",
      icon: "fas fa-headset",
    },
    {
      title: "Safety Procedures",
      description: "Test employee safety protocol...",
      icon: "fas fa-shield-alt",
    },
  ];

  const educationUseCases: (UseCase & { icon: string })[] = [
    {
      title: "Quizzes",
      description: "Engage your students...",
      icon: "fas fa-edit",
    },
    {
      title: "Exams",
      description: "Test skills in a distraction-free environment",
      icon: "fas fa-book",
    },
    {
      title: "Homework",
      description: "Interactive assignments",
      icon: "fas fa-home",
    },
    {
      title: "Competition",
      description: "Encourage healthy academic competition",
      icon: "fas fa-trophy",
    },
    {
      title: "Formative Assessment",
      description: "Immediate feedback for improvement",
      icon: "fas fa-chart-line",
    },
    {
      title: "Course Evaluation",
      description: "Gather feedback for improvement",
      icon: "fas fa-star",
    },
  ];

  const currentUseCases =
    useCase === "business" ? businessUseCases : educationUseCases;

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto px-4">
        {/* ✔ Reusable Tabs */}
        <UseCaseTabs
          tabs={tabs}
          active={useCase}
          onChange={setUseCase}
          className="mb-12"
        />

        {/* Title */}
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentUseCases.map((useCaseItem, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="text-2xl text-primary mb-4">
                <i className={useCaseItem.icon}></i>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                {useCaseItem.title}
              </h3>

              <p className="text-gray-600 mb-4">{useCaseItem.description}</p>

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

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Ready to get started with{" "}
            {useCase === "business" ? "business" : "educational"} assessments?
          </p>

          <Link
            href={useCase === "business" ? "/business-demo" : "/education-demo"}
          >
            <div className="flex items-center justify-center">
              <Button variant="primary" size="lg">
                Get Started Free <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
