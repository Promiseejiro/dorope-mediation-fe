// components/who/WhoUseCases.tsx
"use client";
import { motion } from "framer-motion";

const WhoUseCases: React.FC = () => {
  const useCases = [
    {
      category: "Education",
      icon: "fas fa-school",
      cases: [
        {
          title: "Classroom Quizzes",
          description:
            "Create engaging formative assessments for immediate feedback",
          icon: "fas fa-pencil-alt",
        },
        {
          title: "Final Exams",
          description:
            "Secure, proctored exams with advanced cheating prevention",
          icon: "fas fa-clipboard-check",
        },
        {
          title: "Homework Assignments",
          description:
            "Interactive assignments that students can complete remotely",
          icon: "fas fa-book",
        },
      ],
    },
    {
      category: "Business",
      icon: "fas fa-building",
      cases: [
        {
          title: "Recruitment Testing",
          description: "Evaluate candidate skills before interviews",
          icon: "fas fa-user-tie",
        },
        {
          title: "Employee Training",
          description: "Measure training effectiveness and knowledge retention",
          icon: "fas fa-chalkboard-teacher",
        },
        {
          title: "Skills Certification",
          description:
            "Validate employee competencies with certified assessments",
          icon: "fas fa-award",
        },
      ],
    },
    {
      category: "Professional",
      icon: "fas fa-users",
      cases: [
        {
          title: "Language Testing",
          description: "Comprehensive language proficiency assessments",
          icon: "fas fa-language",
        },
        {
          title: "Technical Skills",
          description: "Evaluate programming, design, and technical abilities",
          icon: "fas fa-code",
        },
        {
          title: "Compliance Training",
          description: "Ensure regulatory compliance with mandatory testing",
          icon: "fas fa-shield-alt",
        },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Real-World Use Cases
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how different organizations are using Testportal to solve
            their assessment challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="text-2xl text-[#005cad]">
                  <i className={category.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {category.category}
                </h3>
              </div>

              {/* Use Cases */}
              <div className="space-y-4">
                {category.cases.map((useCase, caseIndex) => (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: caseIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                  >
                    <div className="text-lg text-[#005cad] mt-1">
                      <i className={useCase.icon}></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {useCase.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {useCase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoUseCases;
