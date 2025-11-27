// components/use-cases/UseCasesCTA.tsx
"use client";
import { motion } from "framer-motion";

const UseCasesCTA: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Transform Your Assessment Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Whether you're conducting classroom quizzes or enterprise
            certifications, Testportal has the tools and features you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Start Free Trial
              <i className="fas fa-rocket ml-2"></i>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Schedule Demo
              <i className="fas fa-calendar ml-2"></i>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-gray-300 hover:border-[#005cad] text-gray-700 hover:text-[#005cad] px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Contact Sales
              <i className="fas fa-envelope ml-2"></i>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-clock text-blue-500"></i>
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-user-check text-green-500"></i>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-headset text-purple-500"></i>
              <span>Setup assistance included</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesCTA;
