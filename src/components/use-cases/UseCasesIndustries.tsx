// components/use-cases/UseCasesIndustries.tsx
"use client";
import { motion } from "framer-motion";

const UseCasesIndustries: React.FC = () => {
  const industries = [
    {
      name: "Education",
      icon: "fas fa-graduation-cap",
      description:
        "Transform learning assessment from K-12 to higher education",
      useCases: [
        "Classroom Assessments",
        "Standardized Testing",
        "Research Studies",
        "Student Placement",
      ],
      stats: "Used by 5,000+ schools",
    },
    {
      name: "Corporate",
      icon: "fas fa-building",
      description: "Streamline employee assessment and development processes",
      useCases: [
        "Skills Evaluation",
        "Training Assessment",
        "Performance Reviews",
        "Promotion Testing",
      ],
      stats: "Trusted by Fortune 500 companies",
    },
    {
      name: "Healthcare",
      icon: "fas fa-heartbeat",
      description:
        "Ensure medical professionals maintain required competencies",
      useCases: [
        "Medical Certification",
        "Compliance Training",
        "Skill Validation",
        "Continuing Education",
      ],
      stats: "HIPAA compliant",
    },
    {
      name: "Technology",
      icon: "fas fa-laptop-code",
      description: "Assess technical skills and coding abilities accurately",
      useCases: [
        "Technical Interviews",
        "Code Assessment",
        "Product Knowledge",
        "Security Training",
      ],
      stats: "Integrated with development tools",
    },
    {
      name: "Government",
      icon: "fas fa-landmark",
      description: "Secure testing for public sector recruitment and training",
      useCases: [
        "Civil Service Exams",
        "Security Clearance",
        "Regulatory Compliance",
        "Public Training",
      ],
      stats: "FedRAMP compliant",
    },
    {
      name: "Non-Profit",
      icon: "fas fa-hands-helping",
      description: "Measure program effectiveness and volunteer training",
      useCases: [
        "Program Evaluation",
        "Volunteer Training",
        "Grant Reporting",
        "Impact Measurement",
      ],
      stats: "Special pricing available",
    },
  ];

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
            Industry Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored assessment solutions for specific industry needs and
            compliance requirements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl text-[#005cad]">
                  <i className={industry.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {industry.name}
                </h3>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {industry.description}
              </p>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Common Applications:
                </h4>
                <ul className="space-y-2">
                  {industry.useCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <i className="fas fa-check text-green-500 text-xs"></i>
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#005cad] text-white px-4 py-2 rounded-lg text-center text-sm font-medium">
                {industry.stats}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesIndustries;
