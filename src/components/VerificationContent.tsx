'use client'

import React, {useEffect, useState} from 'react';
import {useRouter} from "next/navigation";
import VerifyOtp from "@/components/VerifyOtp";
import Alert from "@/components/Alert";
import {verifyOtp, verifyEmailLink, changePassword} from "@/api/auth";
import {useUserStore} from "@/store/UserStore";
import CreatePassword from "@/components/CreatePassword";

const VerificationContent: React.FC = () => {
    const [title, setTitle] = useState<string | null>('Enter OTP');
    const [description, setDescription] = useState<string | null>('We have sent you a One Time Password to your email address.');
    const [error, setError] = useState<string | null>(null);
    const [userOtp, setUserOtp] = useState<string | null>('123456');
    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const router = useRouter();
    const handleResend = () => {
        setError('')
    };
    const [verificationComplete, setVerificationComplete] = useState(false);

    const {
        verificationToken,
        accessKey,
        setAccessKey,
    } = useUserStore();

    useEffect(() => {
        if (!verificationComplete) handleEmailLinkVerification()
    }, [])

    const handleEmailLinkVerification = () => {
        console.log(verificationToken)

        const emailVerifiedLink = verifyEmailLink(verificationToken)
        console.log(emailVerifiedLink)
        setVerificationComplete(true)
        setAccessKey('accessKey')
    }

    const handleVerifyOtp = async (otp: string) => {
        const otpResponse = await verifyOtp(accessKey, otp)

        if (otpResponse) {
            setError('')
            setOtpVerified(true)
            setTitle('Create a Password')
            setDescription('Create a password to sign in to your account')
            // set global JWTToken for the user with the otpResponse
            return
        }

        setError('Invalid OTP')
    };

    const handlePasswordChange = (password: string, confirmPassword: string) => {
        const passwordChangeResponse = changePassword(password, confirmPassword)
        if (password.length > 5) return router.push('/overview');
    };

    const handleError = (error: string) => setError(error)

    return (
        <div className="relative flex min-h-full flex-col justify-center overflow-hidden bg-transparent">
            <div
                className="relative bg-white px-6 py-[50px] md:shadow-md shadow-indigo-600/10 mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-sm flex-col space-y-8">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>{title}</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-800">
                            <p className="max-w-md">{description}</p>
                        </div>
                    </div>

                    <div className="">
                        <div className="my-30">
                            {error &&
                                <Alert alertType="error" description={error} customClasses="rounded-md"/>}
                        </div>

                        {!otpVerified && <VerifyOtp handleSubmit={handleVerifyOtp}/>}

                        {otpVerified && <CreatePassword apiError={error} handleError={handleError}
                                                        handleSubmit={handlePasswordChange}/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationContent;
