import UseCasesCTA from "@/components/use-cases/UseCasesCTA";
import UseCasesFeatures from "@/components/use-cases/UseCasesFeatures";
import UseCasesGrid from "@/components/use-cases/UseCasesGrid";
import UseCasesHero from "@/components/use-cases/UseCasesHero";
import UseCasesIndustries from "@/components/use-cases/UseCasesIndustries";
import UseCasesTestimonials from "@/components/use-cases/UseCasesTestimonials";

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-white">
      <UseCasesHero />
      <UseCasesGrid />
      <UseCasesFeatures />
      <UseCasesIndustries />
      <UseCasesTestimonials />
      <UseCasesCTA />
    </div>
  );
}
