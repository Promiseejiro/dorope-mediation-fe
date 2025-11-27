// components/resources/ResourcesNewsletter.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ResourcesNewsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 bg-linear-to-r from-[#005cad] to-[#1e40af] mb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest resources, tips, and industry insights delivered to
            your inbox
          </p>

          <div className="bg-white rounded-lg p-2 max-w-md mx-auto shadow-lg">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#005cad] hover:bg-[#1e40af] text-white px-6 py-3 rounded-r-lg font-semibold transition-colors duration-300"
              >
                Subscribe
                <i className="fas fa-paper-plane ml-2"></i>
              </motion.button>
            </div>
          </div>

          <p className="text-blue-200 text-sm mt-4">
            No spam, unsubscribe at any time. Join 10,000+ professionals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-blue-200">
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-shield-alt"></i>
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-bolt"></i>
              <span>Weekly Updates</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <i className="fas fa-gift"></i>
              <span>Exclusive Content</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesNewsletter;
