import { axiosInstance } from "@/lib/axios"
import { ForgotPasswordFormData, RegisterValues, ResetPasswordFormData, VerifyFormData, VerifyResetPasswordFormData } from "../types/auth"

export const registerUser = async (data: RegisterValues) => {
    const res = await axiosInstance.post("/auth/register", {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
    })
    return res.data
}

export const verifyUser = async (data: VerifyFormData) => {
    const res = await axiosInstance.post("/auth/verify", {
        email: data.email,
        code: data.otp,
    })
    return res.data
}

export const resendOtp = async (email: string) => {
    const res = await axiosInstance.post("/auth/resend-otp", {
        email: email,
    })
    return res.data
}

export const forgetPassword = async (data: ForgotPasswordFormData) => {
    const res = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
    })
    return res.data
}

export const verifyResetPassword = async (data: VerifyResetPasswordFormData) => {
    const res = await axiosInstance.post("/auth/verify-reset-code", {
        email: data.email,
        code: data.otp
    })
    return res.data
}


export const ResendResetPassword = async (email: string
) => {
    const res = await axiosInstance.post("/auth/resend-reset-password-otp", {
        email: email,
    })
    return res.data
}

export const ResetPassword = async (data: ResetPasswordFormData
) => {
    const res = await axiosInstance.post("/auth/resend-reset-password-otp", {
        email: data.email,
        newPassword: data.newPassword
    })
    return res.data
}

