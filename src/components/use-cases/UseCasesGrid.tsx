// components/use-cases/UseCasesGrid.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const UseCasesGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Use Cases", icon: "fas fa-th" },
    { id: "education", name: "Education", icon: "fas fa-graduation-cap" },
    { id: "business", name: "Business", icon: "fas fa-briefcase" },
    { id: "hr", name: "HR & Recruitment", icon: "fas fa-users" },
    { id: "training", name: "Training", icon: "fas fa-chalkboard-teacher" },
    { id: "certification", name: "Certification", icon: "fas fa-award" },
  ];

  const useCases = [
    {
      id: 1,
      title: "Classroom Quizzes & Tests",
      description:
        "Create engaging formative and summative assessments for students with instant feedback and automated grading.",
      category: "education",
      icon: "fas fa-pencil-alt",
      benefits: ["Instant feedback", "Automated grading", "Progress tracking"],
      complexity: "Simple",
      users: "Teachers, Professors",
    },
    {
      id: 2,
      title: "Employee Skills Assessment",
      description:
        "Evaluate current employee skills and identify training needs with comprehensive skills gap analysis.",
      category: "business",
      icon: "fas fa-chart-bar",
      benefits: [
        "Skills gap analysis",
        "Training planning",
        "Performance insights",
      ],
      complexity: "Intermediate",
      users: "HR Managers, Team Leads",
    },
    {
      id: 3,
      title: "Pre-Employment Testing",
      description:
        "Screen job candidates efficiently with role-specific assessments and reduce time-to-hire by up to 60%.",
      category: "hr",
      icon: "fas fa-user-tie",
      benefits: ["Faster hiring", "Better candidate fit", "Reduced bias"],
      complexity: "Intermediate",
      users: "Recruiters, Hiring Managers",
    },
    {
      id: 4,
      title: "Training Program Evaluation",
      description:
        "Measure training effectiveness and ROI with pre-and post-training assessments and detailed analytics.",
      category: "training",
      icon: "fas fa-chalkboard-teacher",
      benefits: [
        "ROI measurement",
        "Training effectiveness",
        "Knowledge retention",
      ],
      complexity: "Advanced",
      users: "Training Managers, L&D",
    },
    {
      id: 5,
      title: "Professional Certification",
      description:
        "Deliver secure, proctored certification exams with advanced security features and compliance tracking.",
      category: "certification",
      icon: "fas fa-award",
      benefits: [
        "Secure delivery",
        "Compliance tracking",
        "Certificate generation",
      ],
      complexity: "Advanced",
      users: "Certification Bodies",
    },
    {
      id: 6,
      title: "Language Proficiency Testing",
      description:
        "Assess language skills comprehensively with speaking, writing, reading, and listening components.",
      category: "education",
      icon: "fas fa-language",
      benefits: [
        "Comprehensive testing",
        "Progress tracking",
        "Certificate ready",
      ],
      complexity: "Intermediate",
      users: "Language Schools, Teachers",
    },
    {
      id: 7,
      title: "Compliance Training Assessment",
      description:
        "Ensure regulatory compliance with mandatory training assessments and automated reporting.",
      category: "business",
      icon: "fas fa-shield-alt",
      benefits: ["Regulatory compliance", "Automated reporting", "Audit ready"],
      complexity: "Intermediate",
      users: "Compliance Officers",
    },
    {
      id: 8,
      title: "Student Placement Testing",
      description:
        "Place students in appropriate courses or programs based on their current knowledge and skills.",
      category: "education",
      icon: "fas fa-user-graduate",
      benefits: [
        "Accurate placement",
        "Personalized learning",
        "Efficient grouping",
      ],
      complexity: "Simple",
      users: "Schools, Universities",
    },
    {
      id: 9,
      title: "Sales Team Evaluation",
      description:
        "Assess sales team knowledge, product understanding, and customer interaction skills.",
      category: "business",
      icon: "fas fa-chart-line",
      benefits: [
        "Performance benchmarking",
        "Skill development",
        "Revenue impact",
      ],
      complexity: "Intermediate",
      users: "Sales Managers",
    },
  ];

  const filteredUseCases =
    activeCategory === "all"
      ? useCases
      : useCases.filter((useCase) => useCase.category === activeCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Explore Use Cases
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how organizations across different sectors are using
            Testportal to solve their assessment challenges
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-[#005cad] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <i className={category.icon}></i>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUseCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.floor(index / 3) * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl text-[#005cad]">
                    <i className={useCase.icon}></i>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      useCase.complexity === "Simple"
                        ? "bg-green-100 text-green-800"
                        : useCase.complexity === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {useCase.complexity}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {useCase.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Key Benefits:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {useCase.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="bg-blue-50 text-[#005cad] px-3 py-1 rounded-full text-xs"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    <i className="fas fa-user mr-1"></i>
                    {useCase.users}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="text-[#005cad] hover:text-[#1e40af] font-medium text-sm transition-colors duration-300"
                  >
                    Learn More
                    <i className="fas fa-arrow-right ml-1"></i>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesGrid;
