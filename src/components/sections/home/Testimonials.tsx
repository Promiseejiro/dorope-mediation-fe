"use client";
import { useState, useRef, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Head of Education",
      company: "Tech University",
      content:
        "Testportal has revolutionized how we conduct assessments. The AI-powered question generation saves us countless hours, and the analytics provide invaluable insights into student performance.",
      rating: 5,
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "HR Director",
      company: "Global Solutions Inc.",
      content:
        "The recruitment process has never been smoother. We've reduced screening time by 70% while improving candidate quality. The remote assessment feature is a game-changer.",
      rating: 5,
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      role: "Professor",
      company: "State College",
      content:
        "As an educator, I appreciate how Testportal makes formative assessment seamless. The automatic grading and instant feedback help students learn more effectively.",
      rating: 4,
      avatar: "👩‍🏫",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Training Manager",
      company: "SalesForce Pro",
      content:
        "Our sales team's performance has improved dramatically since implementing Testportal. The targeted training assessments help us identify skill gaps accurately.",
      rating: 5,
      avatar: "🧑‍💼",
    },
    {
      id: 5,
      name: "Lisa Wang",
      role: "IT Director",
      company: "Innovate Corp",
      content:
        "The platform's reliability and security features give us confidence in conducting high-stakes certifications. Excellent customer support too!",
      rating: 5,
      avatar: "👩‍💻",
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Academic Dean",
      company: "Digital Learning Institute",
      content:
        "From quizzes to final exams, Testportal handles all our assessment needs. The archive feature makes record-keeping effortless.",
      rating: 4,
      avatar: "👨‍🎓",
    },
  ];

  // Auto-scroll functionality with proper cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      scrollToTestimonial(nextIndex);
    }, 3000); // Changed to 3 seconds for better UX

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, testimonials.length]); // Add dependencies

  const scrollToTestimonial = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const card = container.children[index] as HTMLElement;
      const scrollLeft =
        card.offsetLeft -
        container.offsetLeft -
        (container.offsetWidth - card.offsetWidth) / 2;

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    scrollToTestimonial(nextIndex);
  };

  const prevTestimonial = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToTestimonial(prevIndex);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.children[0]?.clientWidth || 400;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section className="py-16 bg-gray-50 px-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how Testportal is transforming assessment experiences
            across industries
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-96 snap-start"
              >
                <div
                  className={`bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-[#005cad] shadow-md"
                      : "opacity-90 hover:opacity-100"
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < testimonial.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-gray-600 text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {testimonial.role} at {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#005cad] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons - Moved to top */}
        <div className="flex justify-center items-center gap-4 my-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-[#005cad] hover:bg-[#005cad] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
            aria-label="Previous testimonial"
          >
            <i className="fas fa-chevron-left"></i>
          </button>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-[#005cad] hover:bg-[#005cad] hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm"
            aria-label="Next testimonial"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#005cad] mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#005cad] mb-2">10K+</div>
            <div className="text-gray-600">Happy Organizations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#005cad] mb-2">98%</div>
            <div className="text-gray-600">Would Recommend</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
