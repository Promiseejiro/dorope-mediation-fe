// components/resources/ResourcesBlog.tsx
"use client";
import { motion } from "framer-motion";

const ResourcesBlog: React.FC = () => {
  const blogPosts = [
    {
      title: "5 Common Assessment Mistakes and How to Avoid Them",
      excerpt:
        "Learn about the most common pitfalls in digital assessment design and how to create more effective evaluations.",
      author: "Dr. Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "8 min read",
      category: "Best Practices",
      image: "📝",
    },
    {
      title: "The Future of Remote Proctoring: Trends and Innovations",
      excerpt:
        "Explore the latest advancements in remote proctoring technology and what it means for secure online testing.",
      author: "Michael Chen",
      date: "Mar 12, 2024",
      readTime: "10 min read",
      category: "Technology",
      image: "🎥",
    },
    {
      title:
        "How to Create Engaging Quiz Questions That Actually Test Knowledge",
      excerpt:
        "Discover techniques for designing quiz questions that accurately measure understanding while keeping learners engaged.",
      author: "Emily Rodriguez",
      date: "Mar 8, 2024",
      readTime: "6 min read",
      category: "Instructional Design",
      image: "❓",
    },
    {
      title: "Measuring Learning Outcomes: A Data-Driven Approach",
      excerpt:
        "Learn how to use assessment data to measure and improve learning outcomes across your organization.",
      author: "David Thompson",
      date: "Mar 5, 2024",
      readTime: "12 min read",
      category: "Analytics",
      image: "📊",
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
            Latest from Our Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights in digital
            assessment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{post.image}</div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-[#005cad] px-2 py-1 rounded text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                    <span className="text-gray-500 text-sm">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm font-medium">
                      By {post.author}
                    </span>

                    <motion.button
                      whileHover={{ x: 3 }}
                      className="text-[#005cad] hover:text-[#1e40af] text-sm font-medium transition-colors duration-300"
                    >
                      Read More
                      <i className="fas fa-arrow-right ml-1"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            View All Blog Posts
            <i className="fas fa-newspaper ml-2"></i>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesBlog;
