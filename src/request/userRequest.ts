import { axiosInstance } from "@/lib/axios"
import { OnboardingData } from "@/types/user"

export const completeOnboarding = async (data: OnboardingData) => {
    const res = await axiosInstance.patch("/user/onboarding", {
        whoAreYou: data.userType,
        eduAssess: data.purpose,
        assessmentsType: data.assessmentType,
        orgName: data.organizationInfo?.name,
        description: data.organizationInfo?.description,
        domain: data.organizationInfo?.website,
        industries: data.industry,
    })
    return res.data
}

export const getUserDetails = async () => {
    const res = await axiosInstance.get('/user/me')
    return res.data
}