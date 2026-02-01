"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import TeamMemberCard from "@/components/common/TeamMemberCard";
import { useState } from "react";

// Team data
const leadershipTeam = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & CEO",
    bio: "With over 20 years of experience in conflict resolution and peace building, Dr. Johnson has led mediation efforts in over 50 communities worldwide. She holds a PhD in Peace Studies from Harvard University.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Community Mediation",
      "Peace Building",
      "Conflict Resolution",
      "Leadership",
    ],
    email: "sarah@harmonybridge.org",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    name: "Michael Rodriguez",
    role: "Chief Operations Officer",
    bio: "Michael oversees all operational aspects of Harmony Bridge, ensuring our mediation services run smoothly and efficiently. He brings 15 years of NGO management experience.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
    expertise: [
      "Operations",
      "Project Management",
      "Team Leadership",
      "Strategic Planning",
    ],
    email: "michael@harmonybridge.org",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
  },
  {
    name: "Dr. Amina Hassan",
    role: "Director of Mediation Services",
    bio: "Dr. Hassan specializes in cross-cultural mediation and has developed innovative approaches to resolving complex community conflicts. She holds a Doctorate in Conflict Resolution.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Cross-cultural Mediation",
      "Training",
      "Research",
      "Community Engagement",
    ],
    email: "amina@harmonybridge.org",
    linkedin: "https://linkedin.com/in/aminahassan",
  },
];

const mediationTeam = [
  {
    name: "James Wilson",
    role: "Senior Mediator",
    bio: "James specializes in workplace and organizational conflicts, helping companies resolve internal disputes and improve team dynamics.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Workplace Mediation",
      "Organizational Conflict",
      "Team Building",
      "Communication",
    ],
    email: "james@harmonybridge.org",
    linkedin: "https://linkedin.com/in/jameswilson",
  },
  {
    name: "Maria Chen",
    role: "Family Mediation Specialist",
    bio: "Maria has dedicated her career to helping families navigate difficult conversations and find peaceful resolutions to familial conflicts.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Family Mediation",
      "Child Advocacy",
      "Elder Care",
      "Inheritance Disputes",
    ],
    email: "maria@harmonybridge.org",
    linkedin: "https://linkedin.com/in/mariachen",
  },
  {
    name: "David Okafor",
    role: "Community Mediator",
    bio: "David works directly with communities to resolve disputes and build sustainable peace agreements. He has extensive experience in rural community conflicts.",
    image:
      "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Community Conflict",
      "Land Disputes",
      "Intercultural Dialogue",
      "Peace Education",
    ],
    email: "david@harmonybridge.org",
    linkedin: "https://linkedin.com/in/davidokafor",
  },
];

const volunteers = [
  {
    name: "Sophie Williams",
    role: "Youth Program Coordinator",
    bio: "Sophie volunteers her time to run our youth peace workshops, empowering the next generation with conflict resolution skills.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Youth Engagement",
      "Workshop Facilitation",
      "Mentoring",
      "Event Planning",
    ],
    isVolunteer: true,
  },
  {
    name: "Robert Kim",
    role: "Legal Advisor Volunteer",
    bio: "Robert provides pro bono legal advice to support our mediation processes and ensure all agreements are legally sound.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Legal Consultation",
      "Contract Review",
      "Compliance",
      "Documentation",
    ],
    isVolunteer: true,
  },
  {
    name: "Fatima Al-Mansoori",
    role: "Community Outreach Volunteer",
    bio: "Fatima helps bridge cultural gaps and ensures our services are accessible to diverse communities through her multilingual skills.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    expertise: [
      "Multilingual Support",
      "Community Outreach",
      "Cultural Sensitivity",
      "Translation",
    ],
    isVolunteer: true,
  },
];

const volunteerRoles = [
  "Community Mediator",
  "Workshop Facilitator",
  "Administrative Support",
  "Legal Advisor",
  "Translator/Interpreter",
  "Event Coordinator",
  "Fundraising Assistant",
  "Research Assistant",
  "Social Media Coordinator",
  "Youth Mentor",
];

export default function TeamPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    occupation: "",
    experience: "",
    skills: "",
    roleInterest: "",
    availability: "",
    motivation: "",
  });

  const [selectedRole, setSelectedRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "Thank you for your interest in volunteering! We will review your application and contact you soon.",
    );
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      occupation: "",
      experience: "",
      skills: "",
      roleInterest: "",
      availability: "",
      motivation: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    setFormData({ ...formData, roleInterest: role });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Meet Our Team of Peace Builders
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Dedicated professionals and volunteers working together to resolve
              conflicts and build harmonious communities.
            </p>
            <Button
              href="#volunteer"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              Become a Volunteer
            </Button>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
              <i className="fas fa-crown text-2xl text-primary"></i>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced leaders guide Harmony Bridge's mission with vision
              and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Mediation Team */}
      <section className="py-20 bg-primary-light/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
              <i className="fas fa-handshake text-2xl text-primary"></i>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Mediation Specialists
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of certified mediators bring expertise and compassion to
              every conflict resolution process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediationTeam.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full mb-4">
              <i className="fas fa-heart text-2xl text-primary"></i>
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Amazing Volunteers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated individuals who contribute their time and skills to
              support our peace building mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {volunteers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-8">
              Join our team of dedicated volunteers and make a difference in
              your community.
            </p>
            <Button href="#volunteer" size="lg">
              Join as Volunteer
            </Button>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer" className="volunteer-form-section py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Become a Volunteer
              </h2>
              <p className="text-lg text-gray-700">
                Join our mission to build peaceful communities through mediation
                and conciliation.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Available Volunteer Roles
                </h3>
                <p className="text-gray-600 mb-6">
                  Click on a role to select it for your application:
                </p>
                <div className="flex flex-wrap gap-3">
                  {volunteerRoles.map((role, index) => (
                    <button
                      key={index}
                      onClick={() => handleRoleClick(role)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedRole === role
                          ? "bg-primary text-white border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-300 hover:border-primary hover:bg-primary-light/20"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                {selectedRole && (
                  <p className="mt-4 text-accent font-medium">
                    Selected role:{" "}
                    <span className="font-bold">{selectedRole}</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  id="occupation"
                  name="occupation"
                  label="Current Occupation"
                  placeholder="What do you currently do?"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />

                <Input
                  id="experience"
                  name="experience"
                  label="Relevant Experience"
                  placeholder="Describe any relevant experience in mediation, community work, or volunteering"
                  type="textarea"
                  value={formData.experience}
                  onChange={handleChange}
                  rows={3}
                />

                <Input
                  id="skills"
                  name="skills"
                  label="Skills & Qualifications"
                  placeholder="List your skills and any relevant qualifications"
                  type="textarea"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={3}
                />

                <Input
                  id="roleInterest"
                  name="roleInterest"
                  label="Role of Interest"
                  placeholder="Which volunteer role are you interested in?"
                  value={selectedRole || formData.roleInterest}
                  onChange={handleChange}
                  required
                  disabled={!!selectedRole}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Input
                    id="availability"
                    name="availability"
                    label="Availability"
                    placeholder="e.g., Weekends, Evenings, 10-15 hours/week"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Input
                  id="motivation"
                  name="motivation"
                  label="Why do you want to volunteer with us?"
                  placeholder="Tell us about your motivation to join our peace building mission"
                  type="textarea"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  required
                />

                <div className="mt-8">
                  <div className="flex items-start mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 mr-3"
                    />
                    <label htmlFor="terms" className="text-gray-700 text-sm">
                      I agree to the terms and conditions of volunteering. I
                      understand that this is an unpaid volunteer position and I
                      commit to contributing my time and skills to support
                      Harmony Bridge's mission.
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" className="w-full sm:w-auto">
                      Submit Volunteer Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          occupation: "",
                          experience: "",
                          skills: "",
                          roleInterest: "",
                          availability: "",
                          motivation: "",
                        });
                        setSelectedRole("");
                      }}
                      className="w-full sm:w-auto"
                    >
                      Clear Form
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-12 bg-primary-light rounded-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                What to Expect After Applying
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-envelope-open-text text-white"></i>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">
                    Application Review
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Our team will review your application within 5-7 business
                    days.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-video text-white"></i>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Interview</h4>
                  <p className="text-gray-700 text-sm">
                    Selected candidates will be invited for a virtual interview.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-graduation-cap text-white"></i>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Training</h4>
                  <p className="text-gray-700 text-sm">
                    All volunteers receive comprehensive training in conflict
                    resolution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Volunteering */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Benefits of Volunteering
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our team and gain valuable experience while making a
              difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "fas fa-certificate",
                title: "Professional Training",
                description:
                  "Receive training in mediation and conflict resolution techniques.",
              },
              {
                icon: "fas fa-network-wired",
                title: "Networking",
                description:
                  "Connect with professionals in peace building and mediation.",
              },
              {
                icon: "fas fa-award",
                title: "Certification",
                description:
                  "Earn a certificate of appreciation and recommendation letters.",
              },
              {
                icon: "fas fa-hand-holding-heart",
                title: "Make a Difference",
                description:
                  "Directly contribute to building peaceful communities.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${benefit.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
