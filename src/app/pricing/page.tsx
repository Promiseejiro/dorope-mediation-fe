import PricingCTA from "@/components/pricing/PricingCTA";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingFeatures from "@/components/pricing/PricingFeatures";
import PricingHero from "@/components/pricing/PricingHero";
import PricingPlans from "@/components/pricing/PricingPlans";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PricingHero />
      <PricingPlans />
      <PricingFeatures />
      <PricingFAQ />
      <PricingCTA />
    </div>
  );
}
