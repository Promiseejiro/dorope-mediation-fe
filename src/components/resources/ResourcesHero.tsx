// components/resources/ResourcesHero.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ResourcesHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="py-20 bg-linear-to-br from-blue-50 to-white mt-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Everything you need to master digital assessments. Explore guides,
            templates, webinars, and best practices from industry experts.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search resources, guides, templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pl-12 rounded-lg border border-gray-300 focus:border-[#005cad] focus:ring-2 focus:ring-[#005cad] focus:ring-opacity-20 transition-all duration-300"
              />
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#005cad] hover:bg-[#1e40af] text-white px-6 py-2 rounded-md transition-colors duration-300">
                Search
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {[
              { number: "500+", label: "Articles" },
              { number: "50+", label: "Templates" },
              { number: "100+", label: "Webinars" },
              { number: "10K+", label: "Downloads" },
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
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesHero;
