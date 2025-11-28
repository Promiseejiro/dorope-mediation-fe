import Logo from "@/components/common/Logo";

// components/onboarding/steps/WelcomeStep.tsx
const WelcomeStep: React.FC = () => {
  return (
    <div className="text-center fade-in">
      <div className=" flex items-center justify-center mx-auto mb-6">
        <Logo changeOnScroll={false} hideText={true} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Great job!</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Your answers help us give you a unique and personalized experience.
      </p>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-2">
        Now, let's work on your first assessment.
      </p>

      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Explore EduAssess
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto"></div>
      </div>
    </div>
  );
};

export default WelcomeStep;
