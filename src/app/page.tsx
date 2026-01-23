"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import { useState } from "react";

// Event data
const events = [
  {
    title: "Community Reconciliation Forum",
    date: "March 15, 2023",
    description:
      "A successful mediation between two neighboring communities that had been in conflict over land resources for over a decade.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1674&q=80",
    caption:
      "Community leaders signing the peace agreement after successful mediation.",
    icon: "fas fa-hands-helping",
  },
  {
    title: "Youth Peace Workshop",
    date: "June 22, 2023",
    description:
      "Empowering young leaders with conflict resolution skills to become ambassadors of peace in their schools and communities.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    caption:
      "Youth participants engaged in a conflict resolution role-playing exercise.",
    icon: "fas fa-users",
  },
  {
    title: "Business Mediation Summit",
    date: "August 10, 2023",
    description:
      "Resolving partnership disputes between local businesses and fostering collaborative economic development.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80",
    caption:
      "Business leaders shaking hands after successful mediation of partnership disputes.",
    icon: "fas fa-handshake",
  },
];

const testimonials = [
  {
    text: "Harmony Bridge helped our community resolve a 5-year land dispute that was tearing us apart. Their mediators were patient, understanding, and helped us find a solution that worked for everyone. Today, we're not just neighbors - we're partners in community development.",
    name: "James Okafor",
    role: "Community Leader, Riverside District",
    icon: "fas fa-user",
  },
  {
    text: "After nearly taking our partnership dispute to court, we decided to try mediation with Harmony Bridge. In just three sessions, we resolved issues that had been brewing for years. We saved thousands in legal fees and preserved our business relationship.",
    name: "Sarah Johnson",
    role: "Business Owner, TechSolutions Inc.",
    icon: "fas fa-user-tie",
  },
  {
    text: "The family mediation services helped us navigate a difficult inheritance dispute. Instead of tearing our family apart in court, we found a solution that honored our parents' wishes and kept our family relationships intact. I can't recommend Harmony Bridge enough.",
    name: "Michael Chen",
    role: "Family Mediation Client",
    icon: "fas fa-user-friends",
  },
];

const services = [
  {
    title: "Community Mediation",
    description:
      "Facilitating dialogue and resolution in community conflicts to restore harmony and foster cooperation among neighbors and community groups.",
    icon: "fas fa-hands-helping",
  },
  {
    title: "Workplace Conciliation",
    description:
      "Resolving workplace disputes through confidential mediation to improve working relationships and organizational productivity.",
    icon: "fas fa-balance-scale",
  },
  {
    title: "Family Mediation",
    description:
      "Helping families navigate difficult conversations and find mutually acceptable solutions to familial conflicts.",
    icon: "fas fa-home",
  },
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const navigateModal = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex(
        (prev) => (prev - 1 + events.length) % events.length,
      );
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % events.length);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your message! We will contact you soon to discuss mediation options.",
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-gradient-to-r from-primary-light/20 to-white"
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
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
              <Button href="#contact" size="lg">
                Request Mediation
              </Button>
              <Button href="#events" variant="outline" size="lg">
                View Peace Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
              At Harmony Bridge, we organize and participate in numerous peace
              building events throughout the year. These events bring together
              communities, facilitate dialogue, and create lasting solutions to
              conflicts. Click on any event to view details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="bg-primary-light h-56 flex items-center justify-center">
                  <i className={`${event.icon} text-6xl text-primary`}></i>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-accent font-semibold">
                    <i className="far fa-calendar-alt mr-2"></i>
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary-light rounded-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-foreground text-center mb-8">
              Peace We Have Achieved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: "127", label: "Conflicts Resolved" },
                { number: "42", label: "Communities Helped" },
                { number: "89%", label: "Satisfaction Rate" },
                { number: "15", label: "Peace Workshops" },
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
        <div className="container mx-auto px-4">
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
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-primary">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <i className="fas fa-peace text-primary mr-3"></i>
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
                    <i className="fas fa-check-circle text-accent mr-3 mt-1"></i>
                    <span className="text-gray-700">
                      <strong>{item.split(":")[0]}:</strong>
                      {item.split(":")[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Court Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-destructive">
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <i className="fas fa-gavel text-destructive mr-3"></i>
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
                    <i className="fas fa-times-circle text-destructive mr-3 mt-1"></i>
                    <span className="text-gray-700">
                      <strong>{item.split(":")[0]}:</strong>
                      {item.split(":")[1]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-primary-light rounded-xl p-8 border-l-4 border-primary">
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
        <div className="container mx-auto px-4">
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
                className="bg-white rounded-xl shadow-lg p-6 relative border border-gray-100"
              >
                <div className="text-6xl text-primary-light absolute -top-4 left-4">
                  &quot;
                </div>
                <p className="text-gray-700 italic mb-6 mt-4">
                  {testimonial.text}
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mr-4">
                    <i
                      className={`${testimonial.icon} text-xl text-primary`}
                    ></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-accent text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-primary-light/30">
        <div className="container mx-auto px-4">
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
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary-light p-8 text-center">
                  <i className={`${service.icon} text-5xl text-primary`}></i>
                </div>
                <div className="p-6">
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
        <div className="container mx-auto px-4">
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
                <div className="flex items-start">
                  <i className="fas fa-map-marker-alt text-primary text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Our Office
                    </h4>
                    <p className="text-gray-700">
                      123 Peace Avenue, Harmony City, HC 10101
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="fas fa-phone text-primary text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Phone Number
                    </h4>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="fas fa-envelope text-primary text-xl mr-4 mt-1"></i>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Email Address
                    </h4>
                    <p className="text-gray-700">info@harmonybridge.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <form onSubmit={handleSubmit}>
                <Input
                  id="name"
                  name="name"
                  label="Your Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  label="Your Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="subject"
                  name="subject"
                  label="Subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <Input
                  id="message"
                  name="message"
                  type="textarea"
                  label="Your Message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                />
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                Harmony<span className="text-primary-light">Bridge</span>
              </div>
              <p className="text-gray-300 mb-6">
                Building bridges of understanding through professional mediation
                and conciliation services for peaceful conflict resolution.
              </p>
              <div className="flex gap-4">
                {["facebook", "twitter", "linkedin", "instagram"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-white hover:text-primary-light text-xl transition-colors"
                    >
                      <i className={`fab fa-${social}`}></i>
                    </a>
                  ),
                )}
              </div>
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
                <p className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-3"></i>
                  123 Peace Avenue, Harmony City
                </p>
                <p className="flex items-center">
                  <i className="fas fa-phone mr-3"></i>
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  info@harmonybridge.org
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; 2023 Harmony Bridge | Mediation & Conciliation for Peace
              Building. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300"
            >
              &times;
            </button>
            <button
              onClick={() => navigateModal("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              onClick={() => navigateModal("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <img
              src={events[currentImageIndex].image}
              alt={events[currentImageIndex].title}
              className="rounded-lg w-full h-auto max-h-[70vh] object-cover"
            />
            <div className="text-white text-center mt-4 text-lg">
              <p className="font-bold">{events[currentImageIndex].title}</p>
              <p className="text-gray-300">
                {events[currentImageIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
