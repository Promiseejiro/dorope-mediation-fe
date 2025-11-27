// components/who/WhoTestimonials.tsx
"use client";
import { motion } from "framer-motion";

const WhoTestimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "University Professor",
      organization: "Stanford University",
      content:
        "Testportal has revolutionized how we conduct research assessments. The analytics help us identify learning patterns we never could see before.",
      avatar: "👩‍🏫",
    },
    {
      name: "Michael Rodriguez",
      role: "HR Director",
      organization: "TechCorp Global",
      content:
        "We've reduced our hiring process time by 60% while improving candidate quality. The skills assessments are incredibly accurate.",
      avatar: "👨‍💼",
    },
    {
      name: "Emily Watson",
      role: "High School Teacher",
      organization: "Lincoln High School",
      content:
        "My students love the interactive quizzes, and I love how much time I save on grading. It's a win-win for everyone in the classroom.",
      avatar: "👩‍🎓",
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
            Loved by Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from real users across different industries about their
            experience with Testportal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-600 text-center mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

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

export default WhoTestimonials;
