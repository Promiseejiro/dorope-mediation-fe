// components/resources/ResourcesTools.tsx
"use client";
import { motion } from "framer-motion";

const ResourcesTools: React.FC = () => {
  const tools = [
    {
      title: "Assessment Template Library",
      description:
        "Ready-to-use templates for various assessment types and industries",
      icon: "fas fa-file-download",
      items: "50+ Templates",
      format: "PDF/DOCX",
    },
    {
      title: "Question Bank Manager",
      description:
        "Organize and manage your question repository with our template",
      icon: "fas fa-database",
      items: "Question Categories",
      format: "Excel/CSV",
    },
    {
      title: "Rubric Creator",
      description:
        "Create consistent grading rubrics for different assessment types",
      icon: "fas fa-list-ol",
      items: "15 Rubric Types",
      format: "Editable PDF",
    },
    {
      title: "Learning Outcome Mapper",
      description: "Align assessments with learning objectives and outcomes",
      icon: "fas fa-bullseye",
      items: "Mapping Templates",
      format: "Spreadsheet",
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
            Free Tools & Templates
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download our collection of free tools and templates to streamline
            your assessment workflow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-2xl text-[#005cad]">
                  <i className={tool.icon}></i>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <div>{tool.items}</div>
                      <div>{tool.format}</div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#005cad] hover:bg-[#1e40af] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                    >
                      Download
                      <i className="fas fa-download ml-2"></i>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesTools;
