// components/pages/BusinessPageTemplate.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface BusinessPageTemplateProps {
  data: {
    title: string;
    description: string;
    hero: any;
    solutions: any[];
    features: any[];
    caseStudies: any[];
    integration: any;
    testimonials: any[];
    cta: any;
  };
}

const BusinessPageTemplate: React.FC<BusinessPageTemplateProps> = ({
  data,
}) => {
  const colorMap = {
    blue: "from-primary to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section - Business Style */}
      <section className="relative py-20 bg-linear-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-blue-400/30 px-4 py-2 rounded-full text-sm mb-6">
                <i className="fas fa-briefcase"></i>
                <span>Business Solutions</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {data.hero.title}
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {data.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={data.hero.cta.primary.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {data.hero.cta.primary.text}
                    <i className="fas fa-arrow-right ml-2"></i>
                  </motion.button>
                </Link>

                <Link href={data.hero.cta.secondary.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    {data.hero.cta.secondary.text}
                    <i className="fas fa-download ml-2"></i>
                  </motion.button>
                </Link>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                {data.hero.metrics.map((metric: any, index: number) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {metric.value}
                    </div>
                    <div className="text-gray-300 text-sm">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <Image
                src={data.hero.image}
                alt="certification"
                className="w-full h-auto  rounded-xl"
                height={20}
                width={20}
                unoptimized
              />
            </motion.div>
            {/* <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-linear-to-br from-primary/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="text-8xl text-center mb-4">
                  {data.hero.image}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -5 }}
                      className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/10"
                    >
                      <div className="text-2xl mb-2">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="text-sm text-gray-300">Metric {item}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
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
              Comprehensive Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end assessment solutions designed specifically for business
              needs
            </p>
          </motion.div>

          <div className="space-y-8">
            {data.solutions.map((solution, solutionIndex) => (
              <motion.div
                key={solution.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: solutionIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Solution Header */}
                <div
                  className={`bg-gradient-to-r ${
                    colorMap[solution.color as keyof typeof colorMap]
                  } p-6 text-white`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">
                      <i className={solution.icon}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {solution.category}
                      </h3>
                      <p className="text-blue-100 opacity-90">
                        Complete assessment solutions for{" "}
                        {solution.category.toLowerCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Solution Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {solution.items.map((item: any, itemIndex: number) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300"
                    >
                      <h4 className="text-lg font-bold text-gray-800 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        {item.features.map(
                          (feature: string, featureIndex: number) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <i className="fas fa-check text-green-500 text-xs"></i>
                              {feature}
                            </div>
                          )
                        )}
                      </div>

                      <div className="bg-blue-50 text-[#005cad] px-3 py-2 rounded-lg text-sm font-semibold text-center">
                        {item.benefit}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
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
              Business-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-ready features designed for scale, security, and
              performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {data.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-[#005cad] to-[#1e40af] w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <i className={feature.icon}></i>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                  {feature.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
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
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how leading companies are transforming their business with our
              solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">{caseStudy.logo}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {caseStudy.company}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.industry}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">
                        Challenge
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">
                        Solution
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">
                        Results
                      </h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map(
                          (result: string, resultIndex: number) => (
                            <li
                              key={resultIndex}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <i className="fas fa-check text-green-500 text-xs"></i>
                              {result}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-white">
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {data.integration.partners.map((partner: any, index: number) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-md transition-all duration-300 border border-gray-200"
              >
                <div className="text-2xl text-[#005cad] mb-2">
                  <i className={partner.icon}></i>
                </div>
                <div className="font-semibold text-gray-800 text-sm mb-1">
                  {partner.name}
                </div>
                <div className="text-gray-500 text-xs">{partner.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
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
              Trusted by Business Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from executives who have transformed their organizations with
              our platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {data.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
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
                </div>

                <blockquote className="text-gray-600 mb-4 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                  {testimonial.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`py-16 mb-16 ${
          data.cta.background === "gradient"
            ? "bg-linear-to-r from-[#005cad] to-[#1e40af]"
            : "bg-gray-900"
        } text-white`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.cta.title}
            </h2>
            <p className="text-xl opacity-90 mb-8">{data.cta.description}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {data.cta.actions.map((action: any, index: number) => (
                <Link key={action.text} href={action.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      action.variant === "primary"
                        ? "bg-white text-[#005cad] hover:bg-gray-100 shadow-lg hover:shadow-xl"
                        : action.variant === "secondary"
                        ? "border border-white text-white hover:bg-white hover:text-[#005cad] backdrop-blur-sm"
                        : "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
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

export default BusinessPageTemplate;
