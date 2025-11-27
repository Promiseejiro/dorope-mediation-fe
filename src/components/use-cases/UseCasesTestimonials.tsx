// components/use-cases/UseCasesTestimonials.tsx
"use client";
import { motion } from "framer-motion";

const UseCasesTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Dean of Education",
      organization: "Stanford University",
      content:
        "Testportal has transformed how we conduct research assessments. The ability to create complex, multi-stage evaluations has been invaluable for our academic studies.",
      useCase: "Research Assessment",
      results: "60% faster data collection",
      avatar: "👩‍🏫",
    },
    {
      name: "James Chen",
      role: "Head of Talent Acquisition",
      organization: "TechInnovate Inc.",
      content:
        "We've reduced our technical interview process from 3 weeks to 5 days. The coding assessments accurately predict on-the-job performance.",
      useCase: "Technical Hiring",
      results: "78% reduction in time-to-hire",
      avatar: "👨‍💼",
    },
    {
      name: "Sarah Johnson",
      role: "Training Director",
      organization: "Global Healthcare Partners",
      content:
        "Our compliance training assessments are now fully automated. The system tracks completion and generates audit reports automatically.",
      useCase: "Compliance Training",
      results: "100% audit compliance",
      avatar: "👩‍⚕️",
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Real Results from Real Users
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how organizations are achieving measurable results with
            Testportal
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Use Case Badge */}
              <div className="bg-[#005cad] text-white px-4 py-1 rounded-full text-sm font-medium text-center mb-4">
                {testimonial.useCase}
              </div>

              {/* Content */}
              <blockquote className="text-gray-600 mb-6 leading-relaxed text-center">
                "{testimonial.content}"
              </blockquote>

              {/* Results */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
                <div className="text-green-800 font-semibold">
                  Measurable Impact:
                </div>
                <div className="text-green-700 text-sm">
                  {testimonial.results}
                </div>
              </div>

              {/* Author */}
              <div className="text-center">
                <div className="text-3xl mb-2">{testimonial.avatar}</div>
                <div className="font-semibold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
                <div className="text-[#005cad] text-sm font-medium">
                  {testimonial.organization}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesTestimonials;
