// components/resources/ResourcesWebinars.tsx
"use client";
import { motion } from "framer-motion";

const ResourcesWebinars: React.FC = () => {
  const webinars = [
    {
      title: "Mastering Assessment Analytics",
      description:
        "Learn how to interpret and act on assessment data to drive better outcomes",
      date: "March 25, 2024",
      time: "2:00 PM EST",
      duration: "45 minutes",
      speaker: "Dr. Lisa Wang",
      speakerRole: "Assessment Expert",
      spots: "23 spots left",
      image: "📊",
      upcoming: true,
    },
    {
      title: "AI in Assessment: Practical Applications",
      description:
        "Discover real-world applications of AI in creating and grading assessments",
      date: "April 2, 2024",
      time: "11:00 AM EST",
      duration: "60 minutes",
      speaker: "Mark Johnson",
      speakerRole: "AI Specialist",
      spots: "15 spots left",
      image: "🤖",
      upcoming: true,
    },
    {
      title: "Remote Proctoring Best Practices",
      description: "Ensure assessment integrity in remote testing environments",
      date: "February 28, 2024",
      time: "Recorded",
      duration: "50 minutes",
      speaker: "Sarah Miller",
      speakerRole: "Security Lead",
      spots: "Watch Now",
      image: "🎥",
      upcoming: false,
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
            Live & Recorded Webinars
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts through interactive webinars and
            training sessions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {webinars.map((webinar, index) => (
            <motion.div
              key={webinar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="p-6">
                <div className="text-4xl mb-4 text-center">{webinar.image}</div>

                {webinar.upcoming && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium text-center mb-4">
                    Upcoming Live Session
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  {webinar.title}
                </h3>

                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {webinar.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fas fa-calendar text-[#005cad]"></i>
                    <span>
                      {webinar.date} {webinar.upcoming && `• ${webinar.time}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fas fa-clock text-[#005cad]"></i>
                    <span>{webinar.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <i className="fas fa-user text-[#005cad]"></i>
                    <span>
                      {webinar.speaker} - {webinar.speakerRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      webinar.upcoming ? "text-orange-600" : "text-[#005cad]"
                    }`}
                  >
                    {webinar.spots}
                  </span>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                      webinar.upcoming
                        ? "bg-[#005cad] hover:bg-[#1e40af] text-white"
                        : "border border-[#005cad] text-[#005cad] hover:bg-[#005cad] hover:text-white"
                    }`}
                  >
                    {webinar.upcoming ? "Register Now" : "Watch Recording"}
                    <i
                      className={`ml-2 ${
                        webinar.upcoming ? "fas fa-video" : "fas fa-play"
                      }`}
                    ></i>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesWebinars;
