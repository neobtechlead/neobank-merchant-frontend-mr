import React, { useRef, useState} from 'react';
import Link from "next/link";
import Button from "@/components/forms/Button";
import {IVerifyOtpProps} from "@/utils/interfaces/IVerifyOtpProps";

const VerifyOtp: React.FC<IVerifyOtpProps> = ({handleSubmit, handleResend}) => {
    const [error, setError] = useState<string | null>(null);
    const otpLength = 6;
    const [otp, setOtp] = useState<string[]>(Array(otpLength).fill(''));
    const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(otpLength).fill(null));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (error) setError('')

        if (!isNaN(Number(value)) && value.length <= 1) {
            otp[index] = value;
            setOtp([...otp]);

            if (index < otpLength - 1) inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (error) setError('')

        if (event.key === 'ArrowRight' && index < otpLength - 1) {
            if (otp[index] !== '') {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (event.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            const prevInput = inputRefs.current[index - 1];

            if (prevInput) {
                const length = prevInput.value.length;
                prevInput.setSelectionRange(length, length);
            }
        } else if (event.key === 'Backspace' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            otp[index] = '';
            otp[index - 1] = '';
            setOtp([...otp]);
        }
    };

    const handleResendOtp = () => {
        setError('')
        setOtp(Array(otpLength).fill(''));
        if (handleResend) handleResend()
    };

    const handleVerify: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const otpCode = otp.join('');
        console.log(otpCode)
        return handleSubmit(otpCode)
    };

    const isFilled = () => otp.every(value => value !== '')

    return (
        <>
            <form onSubmit={handleVerify}>
                <div className="flex flex-col">
                    <div
                        className="flex flex-row items-center justify-between mx-auto w-full max-w-md gap-2">
                        {otp.map((value, index) => (
                            <div className="w-14 h-14" key={index}>
                                <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-purple-700"
                                    type="text"
                                    name={`otp-${index}`}
                                    value={value}
                                    onChange={(e) => handleChange(e, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    maxLength={1}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col mt-[30px]">
                        <div
                            className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mb-[60px]">
                            <p>Didn't receive OTP?</p>
                            <Link
                                className="flex flex-row items-center text-purple-900"
                                href="#"
                                onClick={handleResendOtp}
                            >
                                Resend
                            </Link>
                        </div>

                        <Button buttonType="submit" styleType="primary" disabled={otp.some(value => value === '')}
                                customStyles={`shadow-sm justify-center p-4 md:p-5 rounded-lg ${isFilled() ? 'bg-purple-900 cursor-pointer' : 'bg-purple-200 cursor-not-allowed'}`}>
                            Verify
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default VerifyOtp;