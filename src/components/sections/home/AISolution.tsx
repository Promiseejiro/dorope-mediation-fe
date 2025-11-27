"use client";
import { useState } from "react";

const BetterTestingSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"features" | "eco">("features");

  const features = [
    {
      icon: "fas fa-robot",
      title: "AI-Powered Question Generator",
      description:
        "Automatically generate relevant questions using advanced AI technology",
    },
    {
      icon: "fas fa-comments",
      title: "Feedback",
      description:
        "Provide instant, constructive feedback to improve learning outcomes",
    },
    {
      icon: "fas fa-check-circle",
      title: "Automatic Grading",
      description: "Save time with automated grading and scoring systems",
    },
    {
      icon: "fas fa-chart-line",
      title: "Comprehensive Insights and Analytics",
      description:
        "Gain deep insights with detailed analytics and performance tracking",
    },
    {
      icon: "fas fa-laptop",
      title: "Remote Assessments",
      description: "Conduct secure assessments from anywhere in the world",
    },
    {
      icon: "fas fa-archive",
      title: "Easy to Archive",
      description: "Store and organize all assessment data efficiently",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            There is a better way to test
          </h1>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-8">
            <div className="relative flex bg-gray-100 rounded-xl px-2 py-1 border border-gray-300">
              <div
                className={`absolute top-1 bottom-1 rounded-lg bg-white border border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
                  activeTab === "features"
                    ? "left-1 w-[calc(50%-0.25rem)]"
                    : "left-[calc(50%+0.25rem)] w-[calc(50%-0.25rem)]"
                }`}
              />

              <button
                onClick={() => setActiveTab("features")}
                className={`relative z-10 px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 min-w-[140px] justify-center cursor-pointer ${
                  activeTab === "features"
                    ? "text-[#005cad] font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-star text-lg"></i>
                Features
              </button>

              <button
                onClick={() => setActiveTab("eco")}
                className={`relative z-10 px-8 py-3 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300 min-w-[140px] justify-center  cursor-pointer ${
                  activeTab === "eco"
                    ? "text-[#005cad] font-semibold"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className="fas fa-leaf text-lg"></i>
                Eco-Friendly
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === "features" ? (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-[#005cad] transition-all duration-300 group hover:shadow-lg"
                >
                  <div className="text-3xl text-[#005cad] mb-4">
                    <i className={feature.icon}></i>
                  </div>

                  <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-[#005cad] transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Problem Section */}
              <div className="bg-red-50 p-8 rounded-lg border border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl text-red-600">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-red-800">Problem</h3>
                </div>

                <div className="space-y-4 text-red-700">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tree text-red-600"></i>
                    <span>
                      Paper production uses trees, large amounts of water, and
                      hazardous chemicals
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-industry text-red-600"></i>
                    <span>
                      Traditional tests contribute to deforestation and
                      environmental pollution
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-trash text-red-600"></i>
                    <span>
                      Waste generation from paper-based testing materials
                    </span>
                  </div>
                </div>
              </div>

              {/* Solution Section */}
              <div className="bg-green-50 p-8 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl text-green-600">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800">
                    Solution
                  </h3>
                </div>

                <p className="text-green-700 mb-6 leading-relaxed">
                  Our online skills and knowledge assessments are entirely
                  digital, aiding in the preservation of the beauty of our
                  world. Choosing remote evaluations allows you to drastically
                  reduce paper usage.
                </p>

                <div className="space-y-3 text-green-700">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-cloud text-green-600"></i>
                    <span>100% digital assessment platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-recycle text-green-600"></i>
                    <span>Zero paper waste generation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-globe-americas text-green-600"></i>
                    <span>Contribute to forest conservation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco-Friendly Impact Section */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-[#005cad] text-white px-8 py-4 rounded-lg">
                <i className="fas fa-leaf text-2xl"></i>
                <div className="text-left">
                  <h4 className="text-xl font-bold">Eco-friendly</h4>
                  <p className="text-blue-100">
                    By applying EduAccess solutions you help us cut down on the
                    cutting down of trees
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <i className="fas fa-tree text-3xl text-[#005cad] mb-3"></i>
                  <div className="text-2xl font-bold text-[#005cad]">1000+</div>
                  <div className="text-gray-600">Trees Saved Annually</div>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <i className="fas fa-tint text-3xl text-[#005cad] mb-3"></i>
                  <div className="text-2xl font-bold text-[#005cad]">50K+</div>
                  <div className="text-gray-600">Liters of Water Conserved</div>
                </div>

                <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
                  <i className="fas fa-cloud text-3xl text-[#005cad] mb-3"></i>
                  <div className="text-2xl font-bold text-[#005cad]">10K+</div>
                  <div className="text-gray-600">Digital Assessments</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to experience the better way to test?
          </p>
          <button className="bg-[#005cad] hover:bg-[#1e40af] text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-300">
            Get Started Free
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BetterTestingSection;
