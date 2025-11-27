// components/pricing/PricingCTA.tsx
"use client";
import { motion } from "framer-motion";

const PricingCTA: React.FC = () => {
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Assessment Process?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of organizations using Testportal for efficient,
            secure, and scalable assessments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              Schedule a Demo
              <i className="fas fa-calendar ml-2"></i>
            </motion.button>
          </div>

          <p className="text-gray-500 mt-6">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingCTA;
