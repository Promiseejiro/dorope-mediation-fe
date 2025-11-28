// app/page.tsx
import Hero from "@/components/sections/home/Hero";
import TrustedBy from "@/components/sections/home/TrustedBy";
import AISolution from "@/components/sections/home/AISolution";
import Blog from "@/components/sections/home/Blog";
import CreateTest from "@/components/sections/home/CreateTest";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import UseCasesSection from "@/components/sections/home/UseCasesSection";
import ImpactSection from "@/components/sections/home/ImpactSection";
import TestimonialSection from "@/components/sections/home/Testimonials";
import MobileHeader from "@/components/layout/MobileHeader";

export default function HomePage() {
  return (
    <>
      <Header />
      <MobileHeader />
      <main>
        <Hero />
        <TrustedBy />
        <UseCasesSection />
        <AISolution />
        <TestimonialSection />
        <ImpactSection />
        <Blog />
        <CreateTest />
      </main>
      <Footer />
    </>
  );
}
