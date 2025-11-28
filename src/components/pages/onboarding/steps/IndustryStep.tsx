// components/onboarding/steps/IndustryStep.tsx
interface IndustryStepProps {
  selectedIndustry: string | null;
  onSelect: (industry: string) => void;
}

const IndustryStep: React.FC<IndustryStepProps> = ({
  selectedIndustry,
  onSelect,
}) => {
  const industries = [
    "Manufacturing",
    "IT",
    "Finance / Insurance",
    "Public administration",
    "Legal services",
    "Training services",
    "Employment services",
    "Other",
  ];

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select your organization industry
        </h2>
        <p className="text-gray-600">
          This helps us customize content for your field
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {industries.map((industry) => (
          <div
            key={industry}
            onClick={() => onSelect(industry)}
            className={`
              option-card border-2 rounded-lg p-4 cursor-pointer transition-all duration-300
              ${
                selectedIndustry === industry
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
              hover:transform hover:-translate-y-0.5 hover:shadow-md
            `}
          >
            <h4 className="font-medium text-gray-800">{industry}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryStep;
