// components/who/WhoHero.tsx
"use client";
import { motion } from "framer-motion";

const WhoHero: React.FC = () => {
  return (
    <section className="py-20 bg-linear-to-br from-blue-50 to-white mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Who It's For
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Testportal is designed for{" "}
            <span className="text-[#005cad] font-semibold">
              educators, businesses, and organizations
            </span>
            looking to transform their assessment processes with modern,
            AI-powered technology.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Start Free Trial
              <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
            >
              Watch Demo
              <i className="fas fa-play-circle ml-2"></i>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { number: "10K+", label: "Organizations" },
            { number: "50K+", label: "Educators" },
            { number: "1.4B+", label: "Assessments" },
            { number: "98%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#005cad]">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoHero;
