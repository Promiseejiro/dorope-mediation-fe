"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/input";
import TeamMemberCard from "@/components/common/TeamMemberCard";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";


const leadershipTeam = [
  {
    name: "Mr. Oluwaseun Ojo",
    role: "Founder & CEO",
    bio: "Description here .",
    image:
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1776234130/_DSC0008_041846_acbfxx.jpg",
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
    name: "Barr. Oluwatosin Aribo [LL.B, B.L, LL.M]",
    role: "Founder & CEO",
    bio: "Description here .",
    image:
      "https://res.cloudinary.com/dxqg5hify/image/upload/v1776234079/IMG-20260211-WA0000_qykovp.jpg",
    expertise: [
      "Operations",
      "Project Management",
      "Team Leadership",
      "Strategic Planning",
    ],
    email: "michael@harmonybridge.org",
    linkedin: "https://linkedin.com/in/michaelrodriguez",
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

// API URL - update with your actual API endpoint

export default function TeamPage() {
  const [selectedRole, setSelectedRole] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Formik validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,6}$/, 
        "Please enter a valid phone number"),
    occupation: Yup.string()
      .required("Occupation is required")
      .min(2, "Please enter a valid occupation"),
    experience: Yup.string()
      .required("Experience is required")
      .min(10, "Please provide at least 10 characters describing your experience"),
    skills: Yup.string()
      .required("Skills are required")
      .min(10, "Please provide at least 10 characters describing your skills"),
    roleInterest: Yup.string()
      .required("Please select or enter a role of interest"),
    availability: Yup.string()
      .required("Availability is required")
      .min(5, "Please provide your availability details"),
    motivation: Yup.string()
      .required("Motivation is required")
      .min(20, "Please provide at least 20 characters explaining your motivation"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      setSubmitError(null);
      
      try {
        // const response = await axios.post(`http://localhost:3000/volunteer`, values);
        const response = await axios.post(`https://dorope-be-2.onrender.com/volunteer`, values);
        
        if (response.data.message) {
          alert(response.data.message || "Thank you for your interest in volunteering! We will review your application and contact you soon.");
          resetForm();
          setSelectedRole("");
        }
      } catch (error: any) {
        console.error("Volunteer application error:", error);
        const errorMessage = error.response?.data?.message || "Something went wrong. Please try again later.";
        setSubmitError(errorMessage);
        alert(errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    formik.setFieldValue("roleInterest", role);
  };

  const handleClearForm = () => {
    formik.resetForm();
    setSelectedRole("");
    setSubmitError(null);
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
                      type="button"
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

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {submitError}
                </div>
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Input
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      id="phone"
                      name="phone"
                      label="Phone Number"
                      placeholder="Enter your phone number"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <Input
                    id="occupation"
                    name="occupation"
                    label="Current Occupation"
                    placeholder="What do you currently do?"
                    value={formik.values.occupation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.occupation && formik.errors.occupation && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.occupation}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    id="experience"
                    name="experience"
                    label="Relevant Experience"
                    placeholder="Describe any relevant experience in mediation, community work, or volunteering"
                    type="textarea"
                    value={formik.values.experience}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                  />
                  {formik.touched.experience && formik.errors.experience && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.experience}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    id="skills"
                    name="skills"
                    label="Skills & Qualifications"
                    placeholder="List your skills and any relevant qualifications"
                    type="textarea"
                    value={formik.values.skills}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                  />
                  {formik.touched.skills && formik.errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.skills}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    id="roleInterest"
                    name="roleInterest"
                    label="Role of Interest"
                    placeholder="Which volunteer role are you interested in?"
                    value={selectedRole || formik.values.roleInterest}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    disabled={!!selectedRole}
                  />
                  {formik.touched.roleInterest && formik.errors.roleInterest && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.roleInterest}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    id="availability"
                    name="availability"
                    label="Availability"
                    placeholder="e.g., Weekends, Evenings, 10-15 hours/week"
                    value={formik.values.availability}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.availability && formik.errors.availability && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.availability}</p>
                  )}
                </div>

                <div className="mb-6">
                  <Input
                    id="motivation"
                    name="motivation"
                    label="Why do you want to volunteer with us?"
                    placeholder="Tell us about your motivation to join our peace building mission"
                    type="textarea"
                    value={formik.values.motivation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={4}
                    required
                  />
                  {formik.touched.motivation && formik.errors.motivation && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.motivation}</p>
                  )}
                </div>

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
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Submitting...
                        </>
                      ) : (
                        "Submit Volunteer Application"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearForm}
                      className="w-full sm:w-auto"
                      disabled={formik.isSubmitting}
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