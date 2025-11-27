// components/who/WhoAudiences.tsx
"use client";
import { motion } from "framer-motion";

const WhoAudiences: React.FC = () => {
  const audiences = [
    {
      icon: "fas fa-graduation-cap",
      title: "Educators & Teachers",
      description:
        "Transform classroom assessments with digital tools that save time and provide deeper insights.",
      features: [
        "Create engaging quizzes and tests",
        "Automate grading and feedback",
        "Track student progress in real-time",
        "Differentiate instruction based on data",
      ],
      color: "blue",
    },
    {
      icon: "fas fa-university",
      title: "Schools & Universities",
      description:
        "Streamline institutional assessment processes with scalable, secure testing solutions.",
      features: [
        "Centralized assessment management",
        "Secure exam proctoring",
        "Institutional analytics",
        "Multi-department coordination",
      ],
      color: "green",
    },
    {
      icon: "fas fa-briefcase",
      title: "HR & Recruitment",
      description:
        "Identify top talent efficiently with customizable skills assessments and candidate evaluation.",
      features: [
        "Pre-employment testing",
        "Skills gap analysis",
        "Candidate comparison tools",
        "Compliance and reporting",
      ],
      color: "purple",
    },
    {
      icon: "fas fa-chart-line",
      title: "Corporate Training",
      description:
        "Measure training effectiveness and employee development with targeted assessments.",
      features: [
        "Training program evaluation",
        "Employee skill assessment",
        "Certification testing",
        "Progress tracking and reporting",
      ],
      color: "orange",
    },
    {
      icon: "fas fa-language",
      title: "Language Schools",
      description:
        "Assess language proficiency and track learning progress with specialized testing tools.",
      features: [
        "Language proficiency tests",
        "Speaking and writing assessments",
        "Progress monitoring",
        "Certificate generation",
      ],
      color: "red",
    },
    {
      icon: "fas fa-certificate",
      title: "Certification Bodies",
      description:
        "Deliver secure, reliable certification exams with advanced proctoring and security features.",
      features: [
        "High-stakes exam delivery",
        "Advanced security protocols",
        "Remote proctoring",
        "Certificate management",
      ],
      color: "indigo",
    },
  ];

  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

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
            Designed for Every Assessment Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a teacher in a classroom or a corporate trainer,
            Testportal adapts to your unique requirements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Header with gradient */}
              <div
                className={`bg-gradient-to-r ${
                  colorMap[audience.color as keyof typeof colorMap]
                } p-6 text-white`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    <i className={audience.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold">{audience.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {audience.description}
                </p>

                <ul className="space-y-3">
                  {audience.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <i className="fas fa-check text-green-500 mt-1 text-sm"></i>
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-2 px-4 bg-gray-100 hover:bg-[#005cad] hover:text-white text-gray-700 rounded-lg font-medium transition-colors duration-300"
                >
                  Learn More
                  <i className="fas fa-arrow-right ml-2"></i>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoAudiences;
