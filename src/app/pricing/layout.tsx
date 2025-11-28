import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileHeader from "@/components/layout/MobileHeader";

// app/auth/layout.tsx
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MobileHeader />
      {children}
      <Footer />
    </div>
  );
}
