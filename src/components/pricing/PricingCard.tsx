// components/pricing/PricingCard.tsx
"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface PricingCardProps {
  plan: {
    name: string;
    description: string;
    monthlyPrice: number;
    annualPrice: number;
    features: string[];
    cta: string;
    popular: boolean;
    color: string;
  };
  index: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index }) => {
  const [billingCycle] = useState<"monthly" | "annual">("annual");
  const price =
    billingCycle === "annual" ? plan.annualPrice : plan.monthlyPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`relative bg-white rounded-xl shadow-sm border-2 ${
        plan.popular
          ? "border-[#005cad] shadow-lg scale-105"
          : "border-gray-200 hover:border-[#005cad]"
      } transition-all duration-300`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#005cad] text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
          <p className="text-gray-600">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-gray-800">${price}</span>
            <span className="text-gray-500">/month</span>
          </div>
          {billingCycle === "annual" && (
            <p className="text-green-600 text-sm mt-1">Billed annually</p>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, featureIndex) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <i className="fas fa-check text-green-500"></i>
              <span className="text-gray-600">{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${
            plan.popular
              ? "bg-[#005cad] hover:bg-[#1e40af] text-white"
              : "bg-gray-100 hover:bg-[#005cad] hover:text-white text-gray-800"
          }`}
        >
          {plan.cta}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
