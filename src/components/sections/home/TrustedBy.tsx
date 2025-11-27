import LogoGrid from "@/components/ui/LogoGrid";

// components/sections/TrustedBy.tsx
const TrustedBy: React.FC = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            We helped these great brands write their success stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We helped these great brands write their success stories. Join them
            now. Choose professional online assessment tool.{" "}
          </p>
        </div>
        <div className="w-[90vw] overflow-hidden mx-auto">
          <LogoGrid />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
