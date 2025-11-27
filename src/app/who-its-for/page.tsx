import WhoAudiences from "@/components/who/WhoAudiences";
import WhoBenefits from "@/components/who/WhoBenefits";
import WhoCTA from "@/components/who/WhoCTA";
import WhoHero from "@/components/who/WhoHero";
import WhoTestimonials from "@/components/who/WhoTestimonials";
import WhoUseCases from "@/components/who/WhoUseCases";

export default function WhoItsForPage() {
  return (
    <div className="min-h-screen bg-white">
      <WhoHero />
      <WhoAudiences />
      <WhoUseCases />
      <WhoBenefits />
      <WhoTestimonials />
      <WhoCTA />
    </div>
  );
}
