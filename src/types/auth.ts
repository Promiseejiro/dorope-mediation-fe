export interface RegisterValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // confirmPassword: string;
    agreeTerms: boolean;
}

export interface VerifyFormData {
    otp: string;
    email: string;
}

export interface ForgotPasswordFormData {
    email: string;
}

export interface VerifyResetPasswordFormData {
    otp: string;
    email: string;
}

export interface ResetPasswordFormData {
    email: string;
    newPassword: string;
    confirmPassword: string;
}
