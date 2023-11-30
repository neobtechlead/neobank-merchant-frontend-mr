export interface IVerifyOtpProps {
    handleSubmit: (otp: string) => void;
    handleResend?: () => void;
}