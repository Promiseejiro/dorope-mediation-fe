// components/pricing/PricingFeatures.tsx
"use client";
import { motion } from "framer-motion";

const PricingFeatures: React.FC = () => {
  const features = [
    {
      icon: "fas fa-robot",
      title: "AI-Powered Questions",
      description:
        "Generate relevant questions automatically with our advanced AI technology",
    },
    {
      icon: "fas fa-chart-line",
      title: "Advanced Analytics",
      description:
        "Get deep insights into performance with comprehensive analytics dashboards",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Enterprise Security",
      description:
        "Bank-level security with encryption and compliance certifications",
    },
    {
      icon: "fas fa-plug",
      title: "Easy Integrations",
      description:
        "Seamlessly integrate with your existing tools and platforms",
    },
    {
      icon: "fas fa-headset",
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team",
    },
    {
      icon: "fas fa-sync",
      title: "Regular Updates",
      description: "Continuous improvements and new features added regularly",
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Everything You Need for Modern Assessments
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All plans include powerful features to transform your assessment
            process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:bg-gray-50 rounded-lg transition-colors duration-300"
            >
              <div className="text-3xl text-[#005cad] mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFeatures;
