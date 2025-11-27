// components/who/WhoBenefits.tsx
"use client";
import { motion } from "framer-motion";

const WhoBenefits: React.FC = () => {
  const benefits = [
    {
      icon: "fas fa-clock",
      title: "Save Time",
      description:
        "Automate grading and feedback, reducing administrative work by up to 80%",
      metric: "80% faster",
    },
    {
      icon: "fas fa-chart-bar",
      title: "Better Insights",
      description:
        "Get detailed analytics on performance and identify areas for improvement",
      metric: "Deep analytics",
    },
    {
      icon: "fas fa-expand",
      title: "Scale Easily",
      description:
        "From small classrooms to enterprise organizations, scale without limits",
      metric: "Unlimited scaling",
    },
    {
      icon: "fas fa-lock",
      title: "Enhanced Security",
      description:
        "Bank-level security with advanced proctoring and cheating prevention",
      metric: "Enterprise security",
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Anywhere Access",
      description:
        "Conduct assessments remotely on any device with internet connection",
      metric: "100% remote",
    },
    {
      icon: "fas fa-robot",
      title: "AI-Powered",
      description:
        "Leverage AI for question generation, grading, and personalized feedback",
      metric: "Smart technology",
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
            Benefits for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No matter your role or organization size, Testportal delivers
            tangible benefits that transform your assessment process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl text-[#005cad] mb-4">
                <i className={benefit.icon}></i>
              </div>

              <div className="bg-[#005cad] text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                {benefit.metric}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {benefit.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[#005cad] to-[#1e40af] rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Experience the Benefits?
            </h3>
            <p className="text-blue-100 mb-6 text-lg">
              Join thousands of organizations already transforming their
              assessment processes with Testportal.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#005cad] hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Start Your Free Trial
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoBenefits;
