// components/onboarding/steps/AssessmentTypeStep.tsx
interface AssessmentTypeStepProps {
  selectedType: "personality" | "knowledge" | "aptitude" | null;
  onSelect: (type: "personality" | "knowledge" | "aptitude") => void;
}

const AssessmentTypeStep: React.FC<AssessmentTypeStepProps> = ({
  selectedType,
  onSelect,
}) => {
  const assessmentTypes = [
    {
      id: "personality",
      title: "Personality",
      description: "Behavioral traits and work style preferences",
      icon: "fas fa-user-friends",
      color: "pink",
    },
    {
      id: "knowledge",
      title: "Knowledge / Skills",
      description: "Technical abilities and task performance",
      icon: "fas fa-brain",
      color: "indigo",
    },
    {
      id: "aptitude",
      title: "Aptitude",
      description: "Cognitive abilities and learning potential",
      icon: "fas fa-lightbulb",
      color: "teal",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      pink: "bg-pink-100 text-pink-500",
      indigo: "bg-indigo-100 text-indigo-500",
      teal: "bg-teal-100 text-teal-500",
    };
    return colors[color as keyof typeof colors] || colors.pink;
  };

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What will your assessments verify?
        </h2>
        <p className="text-gray-600">
          Select the types of assessments you're interested in
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {assessmentTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelect(type.id as any)}
            className={`
              option-card border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300
              ${
                selectedType === type.id
                  ? "border-primary bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }
              hover:transform hover:-translate-y-1 hover:shadow-lg
            `}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${getColorClasses(
                type.color
              )}`}
            >
              <i className={`${type.icon} text-2xl`}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {type.title}
            </h3>
            <p className="text-gray-600 text-sm">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentTypeStep;
