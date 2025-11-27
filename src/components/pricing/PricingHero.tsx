// components/pricing/PricingHero.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const PricingHero: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "annual"
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 mt-16">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your assessment needs. No hidden fees,
            no surprises.
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4 mb-12">
            <span
              className={`font-medium ${
                billingCycle === "monthly" ? "text-[#005cad]" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "annual" : "monthly"
                )
              }
              className="relative w-14 h-7 bg-gray-300 rounded-full transition-colors duration-300"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === "annual" ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`font-medium ${
                billingCycle === "annual" ? "text-[#005cad]" : "text-gray-500"
              }`}
            >
              Annual <span className="text-green-600 text-sm">(Save 20%)</span>
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { number: "10K+", label: "Active Organizations" },
              { number: "1.4B+", label: "Questions Answered" },
              { number: "99.9%", label: "Uptime Reliability" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-2xl font-bold text-[#005cad]">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
