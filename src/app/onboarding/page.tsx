"use client";

import { useState, useEffect } from "react";
import WelcomeStep from "@/components/pages/onboarding/steps/WelcomeStep";
import UserTypeStep from "@/components/pages/onboarding/steps/UserTypeStep";
import PurposeStep from "@/components/pages/onboarding/steps/PurposeStep";
import IndustryStep from "@/components/pages/onboarding/steps/IndustryStep";
import OrganizationInfoStep from "@/components/pages/onboarding/steps/OrganizationInfoStep";
import CompletionStep from "@/components/pages/onboarding/steps/CompletionStep";
import OnboardingContainer from "@/components/pages/onboarding/OnboardingContainer";
import AssessmentTypeStep from "@/components/pages/onboarding/steps/AssessmentTypeStep";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OnboardingData, OnboardingStep } from "@/types/user";
import { toastCustom } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { completeOnboarding, getUserDetails } from "@/request/userRequest";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: null,
    purpose: null,
    assessmentType: null,
    industry: null,
    organizationInfo: {
      name: "",
      // size: "",
      website: "",
      description: "",
    },
  });

  const totalSteps = onboardingData.userType === "organization" ? 7 : 6;
  const mutation = useMutation({
    mutationFn: (data: OnboardingData) => completeOnboarding(data),
    onSuccess: (data, formdata) => {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    },
    onError: (error: any) => {
      toastCustom(error.response.data.message, "error");
    },
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      mutation.mutate(onboardingData);
    } else {
      window.location.href = "/admin";
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
          // return (
          //   (onboardingData.organizationInfo?.name?.trim().length ?? 0) > 0 &&
          //   // (onboardingData.organizationInfo?.size?.length ?? 0) > 0
          // );
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
          return <CompletionStep />;
        }
      case 7:
        return <CompletionStep />;
      default:
        return <WelcomeStep />;
    }
  };

  const { data, error } = useQuery({
    queryKey: ["fetchuser-details"],
    queryFn: getUserDetails,
  });
  if (data?.registrationComplete) {
    router.push("/select-organization");
  }

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
