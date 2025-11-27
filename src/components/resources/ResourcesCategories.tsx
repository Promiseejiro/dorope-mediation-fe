// components/resources/ResourcesCategories.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const ResourcesCategories: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    {
      id: "all",
      name: "All Resources",
      icon: "fas fa-th",
      count: 658,
    },
    {
      id: "guides",
      name: "Guides & Tutorials",
      icon: "fas fa-book",
      count: 156,
    },
    {
      id: "templates",
      name: "Templates",
      icon: "fas fa-file-alt",
      count: 89,
    },
    {
      id: "webinars",
      name: "Webinars",
      icon: "fas fa-video",
      count: 47,
    },
    {
      id: "case-studies",
      name: "Case Studies",
      icon: "fas fa-chart-bar",
      count: 34,
    },
    {
      id: "best-practices",
      name: "Best Practices",
      icon: "fas fa-star",
      count: 78,
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
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exactly what you need with our organized resource categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(category.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                activeCategory === category.id
                  ? "border-[#005cad] bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-[#005cad] hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`text-2xl ${
                    activeCategory === category.id
                      ? "text-[#005cad]"
                      : "text-gray-400"
                  }`}
                >
                  <i className={category.icon}></i>
                </div>
                <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>

              <h3
                className={`text-lg font-semibold mb-2 ${
                  activeCategory === category.id
                    ? "text-[#005cad]"
                    : "text-gray-800"
                }`}
              >
                {category.name}
              </h3>

              <div
                className={`w-12 h-1 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-[#005cad] w-16"
                    : "bg-gray-300"
                }`}
              ></div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesCategories;
