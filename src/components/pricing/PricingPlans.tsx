// components/pricing/PricingPlans.tsx
"use client";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";

const PricingPlans: React.FC = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual educators and small teams",
      monthlyPrice: 19,
      annualPrice: 15,
      features: [
        "Up to 100 assessments per month",
        "Basic question types",
        "Manual grading",
        "Email support",
        "1 GB storage",
        "Basic analytics",
      ],
      cta: "Start Free Trial",
      popular: false,
      color: "gray",
    },
    {
      name: "Professional",
      description: "Ideal for schools and growing organizations",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "Unlimited assessments",
        "All question types",
        "Automatic grading",
        "Priority support",
        "10 GB storage",
        "Advanced analytics",
        "AI-powered questions",
        "Custom branding",
      ],
      cta: "Get Started",
      popular: true,
      color: "primary",
    },
    {
      name: "Enterprise",
      description: "For large institutions and corporations",
      monthlyPrice: 99,
      annualPrice: 79,
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations",
        "Unlimited storage",
        "Advanced security",
        "White-label solution",
        "API access",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "blue",
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
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;
