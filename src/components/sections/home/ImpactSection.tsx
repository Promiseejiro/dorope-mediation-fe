"use client";

const ImpactSection: React.FC = () => {
  const stats = [
    {
      value: "1,398,759,182",
      label: "Total Questions Answered",
      description: "Millions of assessments completed successfully",
    },
    {
      value: "34,968",
      label: "Hours of Grading Saved",
      description: "Automated grading saving valuable time",
    },
    {
      value: "99.2%",
      label: "Platform Uptime",
      description: "Reliable service for continuous testing",
    },
  ];

  const features = [
    {
      icon: "fas fa-bolt",
      title: "Instant Results",
      description: "Get immediate feedback and scoring",
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure Testing",
      description: "Protected assessments with anti-cheating measures",
    },
    {
      icon: "fas fa-chart-pie",
      title: "Detailed Analytics",
      description: "Comprehensive insights into performance",
    },
    {
      icon: "fas fa-users",
      title: "Scalable Platform",
      description: "From small classrooms to enterprise testing",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-br from-blue-50 to-white px-4">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Join the Digital Testing Revolution
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose online assessments with EduAccess and experience efficient,
            scalable, and intelligent testing solutions.
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl font-bold text-[#005cad] mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Detailed Metrics */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Assessment Impact Metrics
            </h3>

            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">
                  Questions answered digitally:
                </span>
                <span className="font-semibold text-[#005cad]">
                  1,398,759,182
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">
                  Average questions per assessment:
                </span>
                <span className="font-semibold text-[#005cad]">25</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600">Assessments completed:</span>
                <span className="font-semibold text-[#005cad]">55,950,367</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Grading hours automated:</span>
                <span className="font-semibold text-[#005cad]">34,968</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="text-2xl text-[#005cad]">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <div className="font-semibold text-[#005cad]">
                    34,968 hours of grading saved
                  </div>
                  <div className="text-sm text-gray-600">
                    Equivalent to 4 years of continuous manual grading
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Why Choose Digital Testing?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                >
                  <div className="text-xl text-[#005cad] mt-1">
                    <i className={feature.icon}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#005cad] text-white p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-2">
                Ready to Transform Your Testing?
              </h4>
              <p className="text-blue-100 mb-4">
                Join thousands of organizations using EduAccess for efficient,
                secure, and scalable assessments.
              </p>
              <button className="bg-white text-[#005cad] hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
                Start Free Trial
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
