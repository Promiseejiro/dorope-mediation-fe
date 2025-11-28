// components/onboarding/steps/PurposeStep.tsx
interface PurposeStepProps {
  selectedPurpose:
    | "recruitment"
    | "training"
    | "events"
    | "education"
    | "other"
    | null;
  onSelect: (
    purpose: "recruitment" | "training" | "events" | "education" | "other"
  ) => void;
}

const PurposeStep: React.FC<PurposeStepProps> = ({
  selectedPurpose,
  onSelect,
}) => {
  const purposes = [
    {
      id: "recruitment",
      title: "Recruitment",
      description: "Hiring and candidate assessment",
      icon: "fas fa-briefcase",
      color: "blue",
    },
    {
      id: "training",
      title: "Training / Certification",
      description: "Employee training and skill certification",
      icon: "fas fa-certificate",
      color: "green",
    },
    {
      id: "events",
      title: "Events / Competition",
      description: "Contests, competitions and events",
      icon: "fas fa-trophy",
      color: "purple",
    },
    {
      id: "education",
      title: "K-12 / Higher Education",
      description: "Schools, colleges and universities",
      icon: "fas fa-graduation-cap",
      color: "yellow",
    },
    {
      id: "other",
      title: "Other",
      description: "Different use case",
      icon: "fas fa-ellipsis-h",
      color: "red",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-primary",
      green: "bg-green-100 text-green-500",
      purple: "bg-purple-100 text-purple-500",
      yellow: "bg-yellow-100 text-yellow-500",
      red: "bg-red-100 text-red-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your perfect experience starts now!
        </h2>
        <p className="text-gray-600">
          Answer only a few questions and we'll adapt the platform to your needs
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          What will you use EduAssess for?
        </h3>

        <div className="space-y-4">
          {purposes.map((purpose) => (
            <div
              key={purpose.id}
              onClick={() => onSelect(purpose.id as any)}
              className={`
                option-card border-2 rounded-lg p-4 cursor-pointer flex items-center transition-all duration-300
                ${
                  selectedPurpose === purpose.id
                    ? "border-primary bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }
                hover:transform hover:-translate-y-0.5 hover:shadow-md
              `}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${getColorClasses(
                  purpose.color
                )}`}
              >
                <i className={purpose.icon}></i>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">{purpose.title}</h4>
                <p className="text-sm text-gray-600">{purpose.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurposeStep;
