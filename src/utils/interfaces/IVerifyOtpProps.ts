export interface IVerifyOtpProps {
    handleSubmit: (otp: string) => void
    handleResend?: () => void
    otpLength: number
    loading: boolean
}