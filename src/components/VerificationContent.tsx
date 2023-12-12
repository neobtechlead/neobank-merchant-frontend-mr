'use client'
import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import VerifyOtp from "@/components/VerifyOtp";
import Alert from "@/components/Alert";
import {verifyOtp, verifyEmailLink, createPassword, resendOtp} from "@/api/auth";
import {useUserStore} from "@/store/UserStore";
import CreatePassword from "@/components/CreatePassword";
import {useUtilsStore} from "@/store/UtilsStore";
import Loader from "@/components/Loader";
import {getError} from "@/utils/lib";

const VerificationContent: React.FC = () => {
    const [title, setTitle] = useState<string | null>('Enter OTP');
    const [description, setDescription] = useState<string | null>('We have sent you a One Time Password to your email address.');
    const [error, setError] = useState<string | null>(null);
    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const router = useRouter();
    const [verificationComplete, setVerificationComplete] = useState(false);
    const {
        user,
        setUser,
        setMerchant,
        setIsAuthenticated
    } = useUserStore();

    const {loading, setLoading} = useUtilsStore()
    const token = useSearchParams().get('token')

    useEffect(() => {
        if (!verificationComplete && !['', null, undefined].includes(token)) {
            handleEmailLinkVerification()
        }
    }, [])

    const handleEmailLinkVerification = () => {
        verifyEmailLink(token)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);
                setVerificationComplete(true);

                if (response.ok) {
                    const data = feedback.data
                    if (setUser) setUser({
                        verificationToken: token ?? '',
                        accessKey: data.accessKey,
                    })
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                setVerificationComplete(false);
                setError(error.message)
            })
    }

    const handleVerifyOtp = async (otp: string) => {
        if (setLoading) setLoading(true);
        verifyOtp(user?.accessKey, otp)
            .then(async (response) => {
                const feedback = await response.json()
                if (setLoading) setLoading(false);
                if (response.ok) {
                    setError('')
                    setOtpVerified(true)
                    setTitle('Create a Password')
                    setDescription('Create a password to sign in to your account')

                    const data = feedback.data
                    if (setUser) setUser({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        authToken: data.token,
                    })

                    if (setMerchant) setMerchant({roles: data.roles})
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handlePasswordChange = (password: string, confirmPassword: string) => {
        if (setLoading) setLoading(true);
        createPassword(password, confirmPassword, user?.authToken)
            .then(async (response) => {
                const feedback = await response.json()
                console.log(feedback, feedback)
                if (setLoading) setLoading(false);

                if (response.ok) {
                    if (setIsAuthenticated) setIsAuthenticated(true)
                    setError('')
                    return router.push('/overview')
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handleResendOtp = () => {
        resendOtp(user?.accessKey)
            .then(async (response) => {
                if (response.ok) {
                    setError('')
                    const data = await response.json()
                    if (setUser) return setUser({accessKey: data.accessKey})
                }
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };
    const handleError = (error: string) => setError(error)

    return (
        <>
            {loading && (
                <Loader type="default"
                        customClasses="w-10 h-10 text-purple-200 dark:text-gray-600 fill-purple-900"/>
            )}
            {verificationComplete && (
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
                                        <Alert alertType="error" description={error}
                                               customClasses="rounded-md text-sm mb-10 mt-2"/>}
                                </div>

                                {!otpVerified &&
                                    <VerifyOtp handleSubmit={handleVerifyOtp} handleResend={handleResendOtp}/>}

                                {otpVerified && <CreatePassword handleError={handleError}
                                                                handleSubmit={handlePasswordChange}/>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>);
};

export default VerificationContent;
