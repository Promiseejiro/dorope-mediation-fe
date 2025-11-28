// components/onboarding/OnboardingContainer.tsx
import React from "react";
import Button from "@/components/ui/Button";
import { OnboardingStep } from "../../../../types/onboarding";

interface OnboardingContainerProps {
  children: React.ReactNode;
  currentStep: OnboardingStep;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canProceed,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden min-h-[600px] flex flex-col">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex-1 flex flex-col p-8">
          {/* Step Content */}
          <div className="flex-1 flex flex-col justify-center">{children}</div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              size="lg"
              onClick={onPrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <i className="fas fa-arrow-left mr-2"></i> Previous
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={onNext}
              disabled={!canProceed}
              className="flex items-center"
            >
              {currentStep === totalSteps ? (
                <>
                  Get Started <i className="fas fa-rocket ml-2"></i>
                </>
              ) : (
                <>
                  Next <i className="fas fa-arrow-right ml-2"></i>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingContainer;
