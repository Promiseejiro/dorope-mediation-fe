// components/use-cases/UseCasesFeatures.tsx
"use client";
import { motion } from "framer-motion";

const UseCasesFeatures: React.FC = () => {
  const features = [
    {
      icon: "fas fa-robot",
      title: "AI-Powered Assessment",
      description:
        "Generate relevant questions automatically and provide intelligent feedback using advanced AI algorithms.",
      useCases: [
        "Training Evaluation",
        "Skills Assessment",
        "Adaptive Testing",
      ],
    },
    {
      icon: "fas fa-chart-line",
      title: "Advanced Analytics",
      description:
        "Gain deep insights with comprehensive analytics dashboards and performance tracking across all assessments.",
      useCases: [
        "Progress Monitoring",
        "ROI Measurement",
        "Performance Benchmarking",
      ],
    },
    {
      icon: "fas fa-shield-alt",
      title: "Enterprise Security",
      description:
        "Bank-level security with advanced proctoring, cheating prevention, and data encryption for high-stakes testing.",
      useCases: [
        "Certification Exams",
        "Compliance Testing",
        "Secure Assessments",
      ],
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Remote Accessibility",
      description:
        "Conduct assessments from anywhere on any device with our responsive, mobile-friendly platform.",
      useCases: ["Remote Learning", "Distributed Teams", "Flexible Testing"],
    },
    {
      icon: "fas fa-sync",
      title: "Automated Workflows",
      description:
        "Streamline assessment processes with automated grading, reporting, and notification systems.",
      useCases: [
        "Large-scale Testing",
        "Regular Assessments",
        "Efficient Grading",
      ],
    },
    {
      icon: "fas fa-puzzle-piece",
      title: "Customizable Templates",
      description:
        "Choose from pre-built templates or create custom assessments tailored to your specific needs.",
      useCases: [
        "Rapid Deployment",
        "Brand Consistency",
        "Specialized Testing",
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
            Powerful Features for Every Use Case
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive feature set supports a wide range of assessment
            scenarios and requirements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl text-[#005cad] mb-4">
                <i className={feature.icon}></i>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Common Use Cases:
                </h4>
                <div className="space-y-2">
                  {feature.useCases.map((useCase) => (
                    <div
                      key={useCase}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <i className="fas fa-check text-green-500 text-xs"></i>
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesFeatures;
