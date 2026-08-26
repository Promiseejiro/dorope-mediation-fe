"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import { useState } from "react";
import toast from "react-hot-toast";

const events = [
  {
    title:
      "Event: Career Day and Peace sensitization at Gladele British Academy, Abuja",
    date: "2025",
    description: `The Career Day and Peace Sensitization event at Gladele British Academy is designed to inspire and guide students toward a purposeful future while promoting a culture of peace and mutual understanding.

This impactful mediation-focused program brings together professionals from diverse fields to share real-life career experiences, helping students explore opportunities, set goals, and make informed decisions about their future paths.

In addition, the peace sensitization segment emphasizes conflict resolution, effective communication, and the importance of peaceful coexistence in society. Through interactive discussions and practical insights, students are equipped with the skills needed to manage disagreements constructively and become ambassadors of peace in their communities.

Overall, the event aims to shape well-rounded individuals who are not only career-driven but also socially responsible and committed to fostering harmony.`,
    images: [
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1777139185/IMG-20260211-WA0003_ec5jdr.jpg",
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1777139185/IMG-20260211-WA0001_fuwncr.jpg",
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1777139185/IMG-20260211-WA0002_wue2ag.jpg",
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1777139184/IMG-20260211-WA0000_wv7nrq.jpg",
    ],
    captions: [
      "Community leaders signing the peace agreement after successful mediation.",
      "Students actively participating in the peace sensitization workshop.",
      "Career guidance session with professionals from various fields.",
      "Group photo of all participants and organizers at the event.",
    ],
  },
  {
    title: "Community Sensitization",
    date: "2026",
    description: `The Community Sensitization program is designed to educate and empower community members on the importance of peaceful coexistence, effective communication, and constructive conflict resolution.

The program provides an opportunity for members of the community to openly discuss issues affecting them and gain a better understanding of how disputes can be managed peacefully and fairly.

Through interactive discussions and practical guidance, participants are encouraged to embrace dialogue, respect different perspectives, and seek peaceful solutions to conflicts within their homes and communities.

Overall, the sensitization aims to promote awareness, strengthen relationships within the community, and encourage a culture of peace, understanding, and cooperation.`,
    images: [
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1787735631/WhatsApp_Image_2026-08-25_at_10.51.21_PM_sfzbxj.jpg",
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1787735631/WhatsApp_Image_2026-08-25_at_10.49.19_PM_zmn0ya.jpg",
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1787735631/WhatsApp_Image_2026-08-25_at_10.51.21_PM_1_xvtbvh.jpg",
    ],
    captions: [
      "Community members participating in the sensitization program.",
      "Participants engaging in discussions on peaceful coexistence and conflict resolution.",
      "Community members and organizers during the sensitization program.",
    ],
  },
];

const testimonials = [
  {
    text: "I was a satisfied tenant, and Dorope Mediation helped prevent landlord intimidation and resolve my dispute amicably.",
    name: "Mr. Daniel",
    role: "Community Leader, Riverside District",
  },
  {
    text: "Dorope Mediation has helped me on several occasions to mediate and resolve disputes with my tenants, arriving at amicable resolutions.",
    name: "Mr. Adebanjo",
    role: "Business Owner, TechSolutions Inc.",
  },
  {
    text: "Dorope Mediation helped me resolve a dispute with my neighbor.",
    name: "Mrs. Daramola",
    role: "Family Mediation Client",
  },
];

const services = [
  {
    title: "Community Mediation",
    description:
      "Facilitating dialogue and resolution in community conflicts to restore harmony and foster cooperation among neighbors and community groups.",
  },
  {
    title: "Workplace Conciliation",
    description:
      "Resolving workplace disputes through confidential mediation to improve working relationships and organizational productivity.",
  },
  {
    title: "Family Mediation",
    description:
      "Helping families navigate difficult conversations and find mutually acceptable solutions to familial conflicts.",
  },
];

export default function Home() {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (eventIdx: number, imgIdx: number = 0) => {
    setCurrentEventIndex(eventIdx);
    setCurrentImageIndex(imgIdx);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateModal = (direction: "prev" | "next") => {
    const currentEvent = events[currentEventIndex];
    const totalImages = currentEvent.images.length;

    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const navigateEvent = (direction: "prev" | "next") => {
    const newEventIndex =
      direction === "prev"
        ? (currentEventIndex - 1 + events.length) % events.length
        : (currentEventIndex + 1) % events.length;
    setCurrentEventIndex(newEventIndex);
    setCurrentImageIndex(0);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      subject: Yup.string().required("Subject is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(
          "https://dorope-be-3.onrender.com/contact",
          values,
        );
        toast.success(res.data.message || "Message sent successfully!");
        resetForm();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-primary-light/20 to-white"
      >
        <div className="max-w-[1200px] mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Building Peace Through Mediation & Conciliation
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              We are dedicated to resolving conflicts and fostering harmonious
              relationships through professional mediation services. Our expert
              team helps individuals, communities, and organizations find
              peaceful solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact" size="md">
                Request Mediation
              </Button>
              <Button href="#events" variant="outline" size="md">
                View Peace Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Peace Building Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the successful peace building events and conflicts we
              have helped resolve
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-700">
              At Dorope Mediation, we organize and participate in numerous peace
              building events throughout the year. These events bring together
              communities, facilitate dialogue, and create lasting solutions to
              conflicts. Click on any event image to view gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event, eventIdx) => (
              <div
                key={eventIdx}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                {/* Image Gallery Preview */}
                <div className="relative">
                  <div
                    className="bg-primary-light h-56 flex items-center justify-center cursor-pointer relative group"
                    onClick={() => openModal(eventIdx, 0)}
                  >
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    {event.images.length > 1 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full px-4 py-2 text-gray-800 font-semibold text-sm">
                          <span>{event.images.length} photos</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Thumbnail strip */}
                  {event.images.length > 1 && (
                    <div className="absolute bottom-2 left-2 right-2 flex gap-1 justify-center">
                      {event.images.slice(0, 4).map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                            idx === 0 ? "bg-white w-4" : "bg-white/60"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(eventIdx, idx);
                          }}
                        ></div>
                      ))}
                      {event.images.length > 4 && (
                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  <div className="text-accent font-semibold mb-3">
                    {event.date}
                  </div>
                  <div className="text-gray-500 text-sm">
                    <span>{event.images.length} event photos</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-light border border-primary/20 rounded-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-foreground text-center mb-8">
              Peace We Have Achieved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "5", label: "Conflicts Resolved" },
                { number: "2", label: "Communities Helped" },
                { number: "85%", label: "Satisfaction Rate" },
                { number: "1", label: "Peace Workshops" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Mediation Section */}
      <section id="comparison" className="py-20 bg-primary-light/30">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Mediation Over Court?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the advantages of mediation and conciliation compared to
              traditional court proceedings
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Mediation Card */}
            <div className="bg-white rounded-xl p-8 border border-gray-200  ">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                Mediation & Conciliation
              </h3>
              <p className="text-gray-700 mb-6">
                Mediation is a voluntary, confidential process where a neutral
                third party helps disputing parties reach a mutually acceptable
                agreement.
              </p>
              <ul className="space-y-4">
                {[
                  "Faster Resolution: Most mediations are completed in days or weeks, not months or years",
                  "Cost Effective: Significantly lower costs compared to court proceedings",
                  "Confidential: Proceedings are private and not part of public record",
                  "Preserves Relationships: Focuses on collaboration, not confrontation",
                  "Creative Solutions: Allows for flexible, customized outcomes that courts can't provide",
                  "Voluntary Process: Parties control the outcome, not a judge",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary font-bold mr-3">•</span>
                    <span className="text-gray-700">
                      <strong>{item.split(":")[0]}:</strong>
                      {item.split(":")[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Court Card */}
            <div className="bg-white rounded-xl p-8 border border-gray-200  ">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                Traditional Court System
              </h3>
              <p className="text-gray-700 mb-6">
                Court litigation is an adversarial process where a judge makes a
                binding decision based on legal arguments and evidence.
              </p>
              <ul className="space-y-4">
                {[
                  "Time Consuming: Cases can take years to resolve through the court system",
                  "High Costs: Legal fees, court costs, and expert witnesses add up quickly",
                  "Public Record: Court proceedings and decisions are generally public",
                  "Damages Relationships: Adversarial nature often destroys relationships",
                  "Limited Solutions: Judges are constrained by legal precedents and statutes",
                  "Loss of Control: Outcome is determined by a third party (judge)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-destructive font-bold mr-3">•</span>
                    <span className="text-gray-700">
                      <strong>{item.split(":")[0]}:</strong>
                      {item.split(":")[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary-light rounded-xl p-8 border border-primary/20 ">
            <h4 className="text-2xl font-bold text-foreground mb-4">
              The Power of Peaceful Resolution
            </h4>
            <p className="text-gray-700 text-lg">
              Mediation doesn't just resolve the immediate conflict - it builds
              communication skills, fosters understanding, and creates a
              foundation for healthier relationships moving forward. While
              courts determine who is "right" or "wrong," mediation helps
              parties find solutions that work for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Success Stories & Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from those who have found peaceful resolutions through our
              mediation services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 relative border border-gray-200 flex flex-col justify-between"
              >
                <p className="text-gray-700 italic mb-6">
                  "{testimonial.text}"
                </p>
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-accent text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primary-light/30">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Mediation Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We offer a range of conflict resolution services tailored to meet
              diverse needs and situations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <div className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Reach out to us for mediation services or to learn more about our
              peace building initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-gray-700 mb-8">
                We're here to help you find peaceful solutions to conflicts.
                Contact us to schedule a consultation or learn more about our
                services.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-foreground mb-1">Our Office</h4>
                  <p className="text-gray-700">
                    57, King D Plaza, Gbessa-Sauka, Opposite Immigration
                    Headquarters, Airport Road Abuja
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-1">
                    Phone Number
                  </h4>
                  <p className="text-gray-700">
                    +234 901 583 797 9, +234 816 945 493 3
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-foreground mb-1">
                    Email Address
                  </h4>
                  <p className="text-gray-700">doropemediationng@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
              <form onSubmit={formik.handleSubmit}>
                <Input
                  id="name"
                  name="name"
                  label="Your Name"
                  placeholder="Enter your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-sm">{formik.errors.name}</p>
                )}

                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
                )}

                <Input
                  id="subject"
                  name="subject"
                  label="Subject"
                  placeholder="Enter subject"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.subject}
                  </p>
                )}

                <Input
                  id="message"
                  name="message"
                  type="textarea"
                  label="Your Message"
                  placeholder="Enter your message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.message}
                  </p>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  loading={formik.isSubmitting}
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Dorope<span className="text-primary-light">Mediation</span>
              </div>
              <p className="text-gray-300 mb-6">
                Building bridges of understanding through professional mediation
                and conciliation services for peaceful conflict resolution.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  "Home",
                  "Peace Events",
                  "Why Mediation",
                  "Testimonials",
                  "Our Services",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() =>
                        document
                          .querySelector(
                            `#${item.toLowerCase().replace(/\s+/g, "")}`,
                          )
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <p>
                  57, King D Plaza, Gbessa-Sauka, Opposite Immigration
                  Headquarters, Airport Road Abuja
                </p>
                <p>+234 901 583 797 9, +234 816 945 493 3</p>
                <p>doropemediationng@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; 2025 Dorope Mediation | Mediation & Conciliation for Peace
              Building. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Gallery Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 z-10"
            >
              &times;
            </button>

            {/* Event navigation buttons */}
            <button
              onClick={() => navigateEvent("prev")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-all z-10 ml-2"
            >
              ‹
            </button>

            <button
              onClick={() => navigateEvent("next")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-all z-10 mr-2"
            >
              ›
            </button>

            {/* Image navigation buttons */}
            <button
              onClick={() => navigateModal("prev")}
              className="absolute left-16 top-1/2 -translate-y-1/2 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              ‹
            </button>

            <button
              onClick={() => navigateModal("next")}
              className="absolute right-16 top-1/2 -translate-y-1/2 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              ›
            </button>

            {/* Main Image */}
            <img
              src={events[currentEventIndex].images[currentImageIndex]}
              alt={`${events[currentEventIndex].title} - Image ${currentImageIndex + 1}`}
              className="rounded-lg w-full h-auto max-h-[70vh] object-contain"
            />

            {/* Image counter */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} /{" "}
              {events[currentEventIndex].images.length}
            </div>

            {/* Thumbnail strip */}
            {events[currentEventIndex].images.length > 1 && (
              <div className="absolute -bottom-20 left-0 right-0 flex justify-center gap-2 mt-4">
                {events[currentEventIndex].images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-primary scale-110"
                        : "border-white/50 hover:border-white"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="text-white text-center mt-4 text-lg">
              <p className="font-bold">{events[currentEventIndex].title}</p>
              <p className="text-gray-300">
                {events[currentEventIndex].captions?.[currentImageIndex] ||
                  events[currentEventIndex].captions?.[0] ||
                  "Event moments"}
              </p>
              <p className="text-accent text-sm mt-1">
                {events[currentEventIndex].date}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
