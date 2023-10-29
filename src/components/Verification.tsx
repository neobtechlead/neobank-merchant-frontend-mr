'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import PasswordChange from "@/components/PasswordChange";
import VerifyOtp from "@/components/VerifyOtp";
import Alert from "@/components/Alert";
import {verifyOtp, verifyEmailLink, changePassword} from "@/api/auth";
import passwordChange from "@/components/PasswordChange";

const Verification: React.FC = ({token}) => {
    const [title, setTitle] = useState<string | null>('Enter OTP');
    const [description, setDescription] = useState<string | null>('We have sent you a One Time Password to your email address.');
    const [error, setError] = useState<string | null>(null);
    const [userOtp, setUserOtp] = useState<string | null>('123456');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const [accessKey, setAccessKey] = useState<string>('');
    const router = useRouter();
    const handleResend = () => {
        setError('')
    };
    const [verificationComplete, setVerificationComplete] = useState(false);


    useEffect(() => {
        if (!verificationComplete) handleEmailLinkVerification()
    }, [])

    const handleEmailLinkVerification = () => {
        const emailVerifiedLink = verifyEmailLink(token)
        console.log(emailVerifiedLink)
        setVerificationComplete(true)
        setAccessKey('accessKey')
    }

    const handleVerifyOtp = (otp) => {
        const otpResponse = verifyOtp(accessKey, otp)
        console.log(otpResponse)

        if (otpResponse) {
            setError('')
            setOtpVerified(true)
            setTitle('Update Password')
            setDescription('Change your password from the default password to your custom password.')
            // set global JWTToken for the user with the otpResponse
            return
        }

        setError('Invalid OTP')
    };

    const handlePasswordChange = (password, confirmPassword) => {
        const passwordChangeResponse = changePassword(password, confirmPassword)
        console.log(passwordChangeResponse)
        if (password.length > 5) return router.push('/overview');
    };

    const handleError = (error) => {
        setError(error)
    };

    return (
        <div className="relative flex min-h-full flex-col justify-center overflow-hidden bg-transparent">
            <div
                className="relative bg-white px-6 py-[50px] md:shadow-md shadow-indigo-600/10 mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-sm flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>{title}</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p className="max-w-md">{description}</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="">
                            {error && <Alert backgroundColor="bg-red-100" iconSrc="/assets/icons/x-circle.svg"
                                             customClasses="rounded-md mb-[60px]"
                            >
                                <p className="flex items-center text-sm text-red-500">{error}</p>
                            </Alert>}
                        </div>

                        {!otpVerified && <VerifyOtp apiError={error} handleSubmit={handleVerifyOtp}/>}

                        {otpVerified && <PasswordChange apiError={error} handleError={handleError}
                                                        handleSubmit={handlePasswordChange}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
