"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProductPageTemplateProps {
  data: {
    title: string;
    description: string;
    hero: any;
    features: any[];
    useCases: any[];
    assessmentTypes: any[];
    testimonials: any[];
    integration: any;
    cta: any;
  };
}

const ProductPageTemplate: React.FC<ProductPageTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white mt-16">
      {/* Hero Section */}
      <section className="py-20 bg-linesr-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              {data.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              {data.hero.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <Link href={data.hero.cta.primary.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
                >
                  {data.hero.cta.primary.text}
                  <i className="fas fa-rocket ml-2"></i>
                </motion.button>
              </Link>

              <Link href={data.hero.cta.secondary.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300"
                >
                  {data.hero.cta.secondary.text}
                  <i className="fas fa-play-circle ml-2"></i>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {data.hero.stats.map((stat: any, index: number) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#005cad]">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Powerful Assessment Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for comprehensive skills evaluation and talent
              development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.features.map((feature: any, index: number) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl text-[#005cad] mb-4">
                  <i className={feature.icon}></i>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-2">
                  {feature.benefits.map(
                    (benefit: string, benefitIndex: number) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <i className="fas fa-check text-green-500 text-xs"></i>
                        {benefit}
                      </li>
                    )
                  )}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Real-World Applications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how organizations across industries are leveraging skills
              assessments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.useCases.map((category: any, categoryIndex: number) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <div className="text-2xl text-[#005cad]">
                    <i className={category.icon}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.category}
                  </h3>
                </div>

                {/* Use Cases */}
                <div className="space-y-6">
                  {category.cases.map((useCase: any, caseIndex: number) => (
                    <motion.div
                      key={useCase.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: caseIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {useCase.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {useCase.description}
                      </p>
                      <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium inline-block">
                        {useCase.metrics}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Types Section */}
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
              Comprehensive Assessment Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of assessment types tailored to your
              specific needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {data.assessmentTypes.map((type: any, index: number) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl text-[#005cad]">
                    <i className={type.icon}></i>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {type.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {type.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Skills Measured:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {type.skills.map(
                          (skill: string, skillIndex: number) => (
                            <span
                              key={skillIndex}
                              className="bg-white border border-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>⏱️ {type.duration}</span>
                      <span>❓ {type.questions}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations are achieving measurable results with our
              skills assessment platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.testimonials.map((testimonial: any, index: number) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                {/* Metric Badge */}
                <div className="bg-[#005cad] text-white px-4 py-1 rounded-full text-sm font-medium text-center mb-4">
                  {testimonial.metric}
                </div>

                {/* Content */}
                <blockquote className="text-gray-600 mb-6 leading-relaxed text-center">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <div className="text-3xl mb-2">{testimonial.avatar}</div>
                  <div className="font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                  <div className="text-[#005cad] text-sm font-medium">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
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
              {data.integration.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {data.integration.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {data.integration.integrations.map(
              (integration: any, index: number) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                >
                  <div className="text-2xl text-[#005cad] mb-3">
                    <i className={integration.icon}></i>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {integration.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {integration.description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-[#005cad] to-[#1e40af] mb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8">{data.cta.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.cta.actions.map((action: any, index: number) => (
                <Link key={action.text} href={action.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-lg font-semibold transition-colors duration-300 ${
                      action.variant === "primary"
                        ? "bg-white text-[#005cad] hover:bg-blue-50"
                        : action.variant === "secondary"
                        ? "border border-white text-white hover:bg-white hover:text-[#005cad]"
                        : "border border-blue-300 text-blue-100 hover:bg-blue-600"
                    }`}
                  >
                    {action.text}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductPageTemplate;
