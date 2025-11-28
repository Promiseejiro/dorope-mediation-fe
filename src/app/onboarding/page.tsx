// app/onboarding/page.tsx
"use client";

import { useState, useEffect } from "react";
import { OnboardingData, OnboardingStep } from "../../../types/onboarding";
import WelcomeStep from "@/components/pages/onboarding/steps/WelcomeStep";
import UserTypeStep from "@/components/pages/onboarding/steps/UserTypeStep";
import PurposeStep from "@/components/pages/onboarding/steps/PurposeStep";
import IndustryStep from "@/components/pages/onboarding/steps/IndustryStep";
import OrganizationInfoStep from "@/components/pages/onboarding/steps/OrganizationInfoStep";
import CompletionStep from "@/components/pages/onboarding/steps/CompletionStep";
import OnboardingContainer from "@/components/pages/onboarding/OnboardingContainer";
import AssessmentTypeStep from "@/components/pages/onboarding/steps/AssessmentTypeStep";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: null,
    purpose: null,
    assessmentType: null,
    industry: null,
    organizationInfo: {
      name: "",
      size: "",
      website: "",
      description: "",
    },
  });

  const totalSteps = onboardingData.userType === "organization" ? 7 : 6;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    } else {
      // Handle completion - redirect to dashboard
      console.log("Onboarding completed:", onboardingData);
      window.location.href = "/dashboard";
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OnboardingStep);
    }
  };

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...data }));
  };

  // Check if user can proceed to next step
  const canProceed = () => {
    switch (currentStep) {
      case 1: // Welcome - always can proceed
        return true;
      case 2: // User type - must select a type
        return onboardingData.userType !== null;
      case 3: // Purpose - must select a purpose
        return onboardingData.purpose !== null;
      case 4: // Assessment type - must select a type
        return onboardingData.assessmentType !== null;
      case 5: // Industry - must select an industry
        return onboardingData.industry !== null;
      case 6: // Organization info (if applicable)
        if (onboardingData.userType === "organization") {
          // Safe check with optional chaining and nullish coalescing
          return (
            (onboardingData.organizationInfo?.name?.trim().length ?? 0) > 0 &&
            (onboardingData.organizationInfo?.size?.length ?? 0) > 0
          );
        }
        return true; // Skip this step for non-organization users
      case 7: // Completion - always can proceed
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return (
          <UserTypeStep
            selectedType={onboardingData.userType}
            onSelect={(type) => updateOnboardingData({ userType: type })}
          />
        );
      case 3:
        return (
          <PurposeStep
            selectedPurpose={onboardingData.purpose}
            onSelect={(purpose) => updateOnboardingData({ purpose })}
          />
        );
      case 4:
        return (
          <AssessmentTypeStep
            selectedType={onboardingData.assessmentType}
            onSelect={(type) => updateOnboardingData({ assessmentType: type })}
          />
        );
      case 5:
        return (
          <IndustryStep
            selectedIndustry={onboardingData.industry}
            onSelect={(industry) => updateOnboardingData({ industry })}
          />
        );
      case 6:
        // Show organization info step only for organization users
        if (onboardingData.userType === "organization") {
          return (
            <OrganizationInfoStep
              organizationInfo={onboardingData.organizationInfo}
              onUpdate={(info) =>
                updateOnboardingData({ organizationInfo: info })
              }
            />
          );
        } else {
          // Skip to completion for non-organization users
          return <CompletionStep />;
        }
      case 7:
        return <CompletionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <OnboardingContainer
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={nextStep}
      onPrevious={prevStep}
      canProceed={canProceed()}
    >
      {renderStep()}
    </OnboardingContainer>
  );
}
