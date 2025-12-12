export interface OnboardingData {
    userType: 'student' | 'teacher' | 'organization' | null;
    purpose: 'recruitment' | 'training' | 'events' | 'education' | 'other' | null;
    assessmentType: 'personality' | 'knowledge' | 'aptitude' | null;
    industry: string | null;
    organizationInfo?: {
        name: string;
        // size: string;
        website?: string;
        description?: string;
    };
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5 | 6 | 7; 