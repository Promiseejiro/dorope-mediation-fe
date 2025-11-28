// components/onboarding/steps/UserTypeStep.tsx
interface UserTypeStepProps {
  selectedType: "student" | "teacher" | "organization" | null;
  onSelect: (type: "student" | "teacher" | "organization") => void;
}

const UserTypeStep: React.FC<UserTypeStepProps> = ({
  selectedType,
  onSelect,
}) => {
  const userTypes = [
    {
      id: "student",
      title: "Student",
      description: "I want to take assessments and track my progress",
      icon: "fas fa-user-graduate",
      color: "blue",
    },
    {
      id: "teacher",
      title: "Teacher",
      description: "I want to create and manage assessments for my students",
      icon: "fas fa-chalkboard-teacher",
      color: "green",
    },
    {
      id: "organization",
      title: "Organization",
      description: "I want to assess candidates or employees at scale",
      icon: "fas fa-building",
      color: "purple",
      note: "Additional organization details will be requested",
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-100 text-primary",
      green: "bg-green-100 text-green-500",
      purple: "bg-purple-100 text-purple-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Who are you?</h2>
        <p className="text-gray-600">
          Select your role to customize your experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {userTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => onSelect(type.id as any)}
            className={`
              option-card border-2 rounded-xl p-6 text-center cursor-pointer transition-all duration-300 relative
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
            <p className="text-gray-600 text-sm mb-2">{type.description}</p>
            {type.note && (
              <p className="text-xs text-primary font-medium">
                <i className="fas fa-info-circle mr-1"></i>
                {type.note}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTypeStep;
