// components/pages/education/EducationPageTemplate.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface EducationPageTemplateProps {
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
    pricing?: any;
  };
}

const EducationPageTemplate: React.FC<EducationPageTemplateProps> = ({
  data,
}) => {
  const colorMap = {
    blue: "from-[var(--primary)] to-[var(--secondary)]",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-[var(--accent)] to-orange-600",
    indigo: "from-indigo-500 to-indigo-600",
    teal: "from-teal-500 to-teal-600",
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-20">
      {/* Hero Section - Education Style */}
      <section className="relative py-20 bg-gradient-to-br from-[var(--primary)] via-[var(--secondary)] to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
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
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full text-sm mb-6 backdrop-blur-sm">
                <i className="fas fa-graduation-cap"></i>
                <span>Education Solutions</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {data.hero.title}
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {data.hero.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href={data.hero.cta.primary.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[var(--primary)] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {data.hero.cta.primary.text}
                    <i className="fas fa-rocket ml-2"></i>
                  </motion.button>
                </Link>

                <Link href={data.hero.cta.secondary.href}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    {data.hero.cta.secondary.text}
                    <i className="fas fa-play-circle ml-2"></i>
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
                    <div className="text-blue-200 text-sm">{metric.label}</div>
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
              <div className="bg-gradient-to-br from-white/10 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="text-8xl text-center mb-4">
                  {data.hero.image}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["📊", "🎯", "🚀", "⭐"].map((emoji, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ y: -5, rotate: -2 }}
                      className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm border border-white/10"
                    >
                      <div className="text-2xl mb-2">{emoji}</div>
                      <div className="text-sm text-blue-200">
                        Feature {index + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-[var(--gray)]/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Teaching Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to make teaching more effective and
              less stressful
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
                className="bg-white rounded-2xl shadow-lg border border-[var(--gray)] overflow-hidden hover:shadow-xl transition-all duration-300"
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
                      <p className="text-white/80">
                        Tools and features for {solution.category.toLowerCase()}
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
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-[var(--gray)] hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="bg-white/80 rounded-lg p-3 inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-star text-[var(--accent)]"></i>
                      </div>

                      <h4 className="text-lg font-bold text-[var(--foreground)] mb-3">
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
                              <span>{feature}</span>
                            </div>
                          )
                        )}
                      </div>

                      <div className="bg-blue-50 text-[var(--primary)] px-3 py-2 rounded-lg text-sm font-semibold text-center border border-blue-200">
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
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Teacher-Focused Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed by educators to save time, increase engagement, and
              improve outcomes
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-[var(--gray)] hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <i className={feature.icon}></i>
                </div>

                <h3 className="text-lg font-bold text-[var(--foreground)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                <div className="bg-blue-50 text-[var(--primary)] px-3 py-1 rounded-full text-xs font-semibold inline-block border border-blue-200">
                  {feature.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Teacher Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how educators are transforming their classrooms and reclaiming
              their time
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-[var(--gray)] overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-3">
                      {caseStudy.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--foreground)]">
                        {caseStudy.company}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.industry}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <i className="fas fa-exclamation-triangle text-[var(--accent)]"></i>
                        Challenge
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <i className="fas fa-lightbulb text-[var(--accent)]"></i>
                        Solution
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {caseStudy.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <i className="fas fa-chart-line text-green-500"></i>
                        Results
                      </h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map(
                          (result: string, resultIndex: number) => (
                            <li
                              key={resultIndex}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <i className="fas fa-check-circle text-green-500 text-xs"></i>
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

      {/* Integration Partners */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-[var(--gray)]"
              >
                <div className="text-2xl text-[var(--primary)] mb-2">
                  <i className={partner.icon}></i>
                </div>
                <div className="font-semibold text-[var(--foreground)] text-sm mb-1">
                  {partner.name}
                </div>
                <div className="text-gray-500 text-xs">{partner.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
              Loved by Educators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from teachers who have transformed their classrooms and
              workload
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
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-lg border border-[var(--gray)] p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-[var(--primary)] text-sm font-medium">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-600 mb-4 leading-relaxed italic">
                  "{testimonial.content}"
                </blockquote>

                <div className="bg-blue-50 text-[var(--primary)] px-3 py-2 rounded-lg text-sm font-semibold text-center border border-blue-200">
                  {testimonial.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Optional) */}
      {/* {data.pricing && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                {data.pricing.title}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {data.pricing.plans.map((plan: any, index: number) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 ${
                    plan.popular
                      ? "border-[var(--primary)] shadow-xl scale-105"
                      : "border-[var(--gray)] shadow-lg"
                  } transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="bg-[var(--primary)] text-white px-4 py-1 rounded-full text-sm font-semibold text-center mb-4">
                      Most Popular
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-[var(--foreground)]">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map(
                      (feature: string, featureIndex: number) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <i className="fas fa-check text-green-500"></i>
                          {feature}
                        </li>
                      )
                    )}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-[var(--primary)] text-white hover:bg-[var(--secondary)]"
                        : "bg-[var(--gray)] text-[var(--foreground)] hover:bg-gray-300"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* CTA Section */}
      <section
        className={`py-16 mb-16 ${
          data.cta.background === "gradient"
            ? "bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]"
            : "bg-[var(--foreground)]"
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
                        ? "bg-white text-[var(--primary)] hover:bg-gray-100 shadow-lg hover:shadow-xl"
                        : action.variant === "secondary"
                        ? "border border-white text-white hover:bg-white hover:text-[var(--primary)] backdrop-blur-sm"
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

export default EducationPageTemplate;
