import React, {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import {useUserStore} from "@/store/UserStore";
import {useUtilsStore} from "@/store/UtilsStore";
import {createPassword, resendOtp, verifyEmailLink, verifyOtp} from "@/api/auth";
import {getError} from "@/utils/lib";
import Loader from "@/components/Loader";
import VerifyOtp from "@/components/VerifyOtp";
import CreatePassword from "@/components/CreatePassword";
import AuthContentWrapper from "@/components/auth/AuthContentWrapper";

const VerifyUserContent: React.FC = () => {
    const [title, setTitle] = useState<string>('Enter OTP');
    const [description, setDescription] = useState<string>('We have sent you a One Time Password to your email address.');
    const [error, setError] = useState<string>('');

    const [otpVerified, setOtpVerified] = useState<boolean | null>(false);
    const [verificationComplete, setVerificationComplete] = useState(false);
    const router = useRouter();
    const {
        user,
        setUser,
        setMerchant,
        setIsAuthenticated
    } = useUserStore();

    useEffect(() => {
        if (!verificationComplete && !['', null, undefined].includes(token)) {
            handleEmailLinkVerification()
        }
    }, [])

    const {loading, setLoading} = useUtilsStore()
    const token = useSearchParams().get('token')

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
                        externalId: data.id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        authToken: data.token,
                        roles: data.roles
                    })
                    if (setMerchant) setMerchant(data.merchant)
                } else
                    return setError(getError(feedback))
            })
            .catch((error) => {
                if (setLoading) setLoading(false);
                setError(error.message)
            })
    };

    const handlePasswordCreate = (password: string, confirmPassword: string) => {
        if (setLoading) setLoading(true);
        createPassword(password, confirmPassword, user?.authToken)
            .then(async (response) => {
                const feedback = await response.json()
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
                        customWrapperClasses="pt-64"
                        customAnimationClasses="w-10 h-10 text-purple-200 dark:text-gray-600 fill-purple-900"/>
            )}

            <AuthContentWrapper title={title} description={description} error={error}>
                {!otpVerified && <VerifyOtp handleSubmit={handleVerifyOtp} handleResend={handleResendOtp} otpLength={6} loading/>}
                {otpVerified && <CreatePassword handleError={handleError} handleSubmit={handlePasswordCreate}/>}
            </AuthContentWrapper>
        </>
    );
}

export default VerifyUserContent;
