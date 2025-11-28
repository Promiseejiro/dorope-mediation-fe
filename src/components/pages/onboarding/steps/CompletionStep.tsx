import AnimatedSuccessCheck from "@/components/ui/SuccessSvg";
const CompletionStep: React.FC = () => {
  return (
    <div className="text-center fade-in">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AnimatedSuccessCheck />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Complete!</h1>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
        Your EduAssess account is now personalized based on your preferences.
        You're ready to start creating and taking assessments.
      </p>
      <div className="bg-blue-50 rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-primary mb-2">What's next?</h3>
        <ul className="text-primary text-left space-y-2">
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-1 mr-2 text-primary"></i>
            <span>Explore your personalized dashboard</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-1 mr-2 text-primary"></i>
            <span>Create your first assessment</span>
          </li>
          <li className="flex items-start">
            <i className="fas fa-check-circle mt-1 mr-2 text-primary"></i>
            <span>Invite team members or students</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CompletionStep;
