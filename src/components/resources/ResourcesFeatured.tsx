// components/resources/ResourcesFeatured.tsx
"use client";
import { motion } from "framer-motion";

const ResourcesFeatured: React.FC = () => {
  const featuredResources = [
    {
      title: "The Ultimate Guide to Digital Assessment Strategy",
      description:
        "Learn how to create a comprehensive digital assessment strategy that aligns with your organizational goals and improves outcomes.",
      type: "Guide",
      readTime: "15 min read",
      level: "Beginner",
      image: "📊",
      popular: true,
    },
    {
      title: "AI-Powered Question Generation: Best Practices",
      description:
        "Discover how to leverage AI for creating engaging and effective assessment questions automatically.",
      type: "Tutorial",
      readTime: "12 min read",
      level: "Intermediate",
      image: "🤖",
      popular: true,
    },
    {
      title: "Assessment Analytics: Turning Data into Insights",
      description:
        "Master the art of interpreting assessment data to drive meaningful improvements in teaching and learning.",
      type: "Guide",
      readTime: "20 min read",
      level: "Advanced",
      image: "📈",
      popular: false,
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
          <div className="inline-flex items-center gap-2 bg-[#005cad] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <i className="fas fa-star"></i>
            <span>Featured Resources</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Must-Read Content
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with these essential resources to get the most out of
            Testportal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {resource.popular && (
                <div className="bg-[#005cad] text-white px-4 py-1 text-sm font-medium text-center">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <div className="text-4xl mb-4 text-center">
                  {resource.image}
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-100 text-[#005cad] px-3 py-1 rounded-full text-sm font-medium">
                    {resource.type}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {resource.readTime}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {resource.level}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                  {resource.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#005cad] hover:bg-[#1e40af] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
                  >
                    Read Now
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.button>

                  <button className="text-gray-400 hover:text-[#005cad] transition-colors duration-300">
                    <i className="far fa-bookmark"></i>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesFeatured;
